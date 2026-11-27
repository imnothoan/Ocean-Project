import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  supabase,
  loadReports,
  loadNotifications,
  loadEventMessages,
  loadImpactMetrics,
  type EventRecap,
  type OceanReport,
  type OceanEvent,
  type OceanNotification,
  type EventMessage,
  type ImpactMetric,
} from '../../lib/supabase';
import { fetchFeed, fetchProfile, emptyProfile, type CommunityItem, type Profile } from './data';
import type { VolunteerApplication } from './volunteer';
import type { Registration } from './events';
import type { Pledge } from './donations';
import { result } from './workflow';

export type Attendance = { id: string; event_id: string; created_at: string };
export type ProjectData = {
  avatarUrl: string;
  postCount: number;
  supportedToday: number;
  points: number;
  saved: string[];
  items: CommunityItem[];
  profile: Profile;
  reports: OceanReport[];
  events: OceanEvent[];
  registrations: Registration[];
  checkins: Attendance[];
  notifications: OceanNotification[];
  messages: EventMessage[];
  pledges: Pledge[];
  metrics: ImpactMetric[];
  applications: VolunteerApplication[];
  recaps: EventRecap[];
  learning: { activity: string; completed_at: string }[];
  claims: { id: string; cost: number; claimed_at: string }[];
};
const empty: ProjectData = {
  avatarUrl: '',
  postCount: 0,
  supportedToday: 0,
  points: 0,
  saved: [],
  items: [],
  profile: emptyProfile,
  reports: [],
  events: [],
  registrations: [],
  notifications: [],
  messages: [],
  pledges: [],
  metrics: [],
  checkins: [],
  applications: [],
  recaps: [],
  learning: [],
  claims: [],
};

async function readProject(session: Session | null, eventId: string, chat: boolean) {
  const uid = session?.user.id;
  async function ownAvatar() {
    if (!uid) return '';
    const bucket = supabase.storage.from('profile-photos');
    const files = result(await bucket.list(uid, { search: 'avatar' }));
    const file = files?.find((row) => row.name === 'avatar');
    if (!file) return '';
    const signed = result(await bucket.createSignedUrl(uid + '/avatar', 3600));
    return signed!.signedUrl + '&v=' + encodeURIComponent(file.updated_at || file.id || '');
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const queries = {
    postCount: uid
      ? supabase
          .from('community_posts')
          .select('id', { count: 'exact', head: true })
          .eq('author_id', uid)
          .then((response) => {
            result(response);
            return response.count ?? 0;
          })
      : 0,
    supportedToday: uid
      ? supabase.rpc('supported_posts_since', { day_start: today.toISOString() }).then(result)
      : 0,
    avatarUrl: ownAvatar(),
    items: fetchFeed(session),
    profile: fetchProfile(session),
    events: supabase
      .from('events')
      .select(
        'id,title,description,event_date,location,capacity,owner_id,category,duration_minutes,preparation,safety,cover_path,ended_at',
      )
      .order('event_date')
      .limit(100)
      .then(result),
    metrics: loadImpactMetrics().then(result),
    reports: uid ? loadReports().then(result) : [],
    notifications: uid ? loadNotifications().then(result) : [],
    registrations: uid
      ? supabase
          .from('event_registrations')
          .select('id,event_id,owner_id,status,participant_name,volunteer_role')
          .order('created_at', { ascending: false })
          .limit(200)
          .then(result)
      : [],
    checkins: uid
      ? supabase.from('event_checkins').select('id,event_id,created_at').eq('user_id', uid).then(result)
      : [],
    pledges: uid
      ? supabase
          .from('donations')
          .select('id,amount,campaign,status,created_at')
          .eq('donor_id', uid)
          .order('created_at', { ascending: false })
          .then(result)
      : [],
    messages: uid && chat && eventId ? loadEventMessages(eventId).then(result) : [],
    points: uid
      ? supabase
          .rpc('ocean_points')
          .then(result)
          .then((p) => Number(p) || 0)
      : 0,
    saved: uid
      ? supabase
          .from('saved_guides')
          .select('frame_id')
          .eq('user_id', uid)
          .then(result)
          .then((rows) => (rows ?? []).map((g) => String(g.frame_id)))
      : [],
    applications: uid
      ? supabase
          .from('volunteer_applications')
          .select('*')
          .order('submitted_at', { ascending: false })
          .then(result)
      : [],
    recaps: supabase
      .from('event_recaps')
      .select('id,event_id,author_id,body,created_at,total_kg,recyclable_kg,photo_path')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(result),
    learning: uid
      ? supabase.from('learning_progress').select('activity,completed_at').eq('user_id', uid).then(result)
      : [],
    claims: uid
      ? supabase.from('reward_claims').select('id,cost,claimed_at').eq('user_id', uid).then(result)
      : [],
  };
  const entries = Object.entries(queries);
  const results = await Promise.allSettled(entries.map(([, query]) => query));
  const values: Partial<ProjectData> = {};
  const errors: string[] = [];
  results.forEach((response, i) => {
    const key = entries[i][0] as keyof ProjectData;
    if (response.status === 'fulfilled') {
      Object.assign(values, { [key]: response.value ?? empty[key] });
    } else {
      errors.push(response.reason?.message || 'Không thể tải dữ liệu.');
    }
  });
  return { values, error: errors[0] || '' };
}

export function useProjectData(session: Session | null, eventId: string, chat: boolean) {
  const uid = session?.user.id;
  const chatId = chat ? eventId : '';
  const [snapshot, setSnapshot] = useState<{
    uid?: string;
    chatId: string;
    data: ProjectData;
    error: string;
  }>({ chatId: '', data: empty, error: '' });
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(() => setReload((r) => r + 1), []);
  useEffect(() => {
    let active = true;
    setLoading(true);
    readProject(session, chatId, !!chatId)
      .then(({ values, error }) => {
        if (!active) return;
        setSnapshot((old) => {
          const previous = old.uid === uid ? old.data : empty;
          return {
            uid,
            chatId,
            data: { ...previous, messages: old.chatId === chatId ? previous.messages : [], ...values },
            error,
          };
        });
      })
      .catch((e) => {
        if (active)
          setSnapshot((old) => ({
            uid,
            chatId,
            data: old.uid === uid ? { ...old.data, messages: [] } : empty,
            error: e?.message || 'Không thể tải dữ liệu.',
          }));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [uid, reload, chatId]);
  const own = snapshot.uid === uid;
  const data = !own ? empty : snapshot.chatId === chatId ? snapshot.data : { ...snapshot.data, messages: [] };
  return { data, error: own ? snapshot.error : '', refresh, loading };
}
