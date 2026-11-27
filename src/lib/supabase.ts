import { Platform } from 'react-native';
import { File } from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { type ReportDraft } from '../features/reports/reportValidation';
import { submitReport, type ReportSubmissionDeps } from '../features/reports/reportSubmission';

// Public Expo client configuration. A different project must supply its own key.
const projectUrl = 'https://eennwumflulpfhcfzupe.supabase.co';
const projectKey = 'sb_publishable_9FXGr60lua0RY2HtfJ5aEg_NoQwiMy7';
export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || projectUrl;
const configuredKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAnonKey = configuredKey && configuredKey !== 'your-anon-key'
  ? configuredKey
  : supabaseUrl === projectUrl ? projectKey : undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  }
);

// A recovery challenge must never replace the active application session.
export function createRecoveryAuth() {
  return createClient(supabaseUrl, supabaseAnonKey ?? 'placeholder-anon-key', {
    auth: {
      storageKey: 'ocean-password-recovery',
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }).auth;
}

export type ReportCategory = 'pollution' | 'animal' | 'recycle';

export type OceanReport = {
  id: string;
  owner_id: string;
  category: ReportCategory;
  title: string;
  location: string;
  details?: Record<string, string>;
  report_evidence?: { storage_path: string; created_at: string }[];
  report_followups?: { note: string; evidence_path: string | null; created_at: string }[];
  report_status_history?: Pick<ReportStatusHistory, 'status' | 'created_at' | 'note'>[];
  status: 'submitted' | 'reviewing' | 'resolved' | 'rejected';
  created_at: string;
};

export type OceanEvent = {
  owner_id?: string|null; category?: string; duration_minutes?: number|null;
  preparation?: string[]; safety?: string; cover_path?: string|null; ended_at?: string|null;
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  capacity: number;
};

export type ImpactMetric = {
  metric_date: string;
  total_kg: number;
  plastic_kg: number;
  organic_kg: number;
  other_kg: number;
};

export type ReportStatusHistory = {
  id: string;
  report_id: string;
  status: OceanReport['status'];
  note: string;
  created_at: string;
  actor_id: string | null;
};

export type OceanNotification = {
  id: string;
  title: string;
  body: string;
  report_id: string | null;
  read_at: string | null;
  created_at: string;
  user_id: string;
};

export type CommunityPost = {
  id: string;
  author_id: string;
  body: string;
  topic: string;
  created_at: string;
};

export type EventMessage = {
  id: string;
  event_id: string;
  user_id: string;
  body: string;
  created_at: string;
};

export type EventRecap = {
  total_kg?: number|null; recyclable_kg?: number|null; photo_path?: string|null;
  id: string;
  event_id: string;
  author_id: string;
  body: string;
  created_at: string;
};

export async function createCommunityPost(body: string, topic: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { data: null, error: userError ?? new Error('You must be signed in to publish a post.') };
  }
  return supabase.from('community_posts').insert({ author_id: userData.user.id, body, topic }).select().single();
}

export async function loadCommunityPosts() {
  if (!isSupabaseConfigured) return { data: [] as CommunityPost[], error: null };
  return supabase
    .from('community_posts')
    .select('id, author_id, body, topic, created_at')
    .order('created_at', { ascending: false })
    .limit(20);
}

export async function createReport(
  report: Pick<OceanReport, 'category' | 'title' | 'location'>
) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { data: null, error: userError ?? new Error('You must be signed in to submit a report.') };
  }

  return supabase.from('reports').insert({ ...report, owner_id: userData.user.id }).select().single();
}

export async function updateOwnReport(reportId: string, input: Pick<OceanReport, 'title' | 'location' | 'details'>) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured.') };
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { data: null, error: userError ?? new Error('You must be signed in to edit a report.') };
  return supabase.from('reports').update(input).eq('id', reportId).eq('owner_id', userData.user.id).eq('status', 'submitted').select().single();
}

export async function loadReports() {
  if (!isSupabaseConfigured) {
    return { data: [] as OceanReport[], error: null };
  }

  return supabase
    .from('reports')
    .select('id, owner_id, category, title, location, status, details, created_at, report_evidence(storage_path, created_at), report_status_history(status, created_at, note), report_followups(note, evidence_path, created_at)')
    .order('created_at', { ascending: false })
    .order('created_at', { referencedTable: 'report_evidence', ascending: true })
    .order('created_at', { referencedTable: 'report_followups', ascending: false })
    .returns<OceanReport[]>();
}

export async function loadEvents() {
  if (!isSupabaseConfigured) {
    return { data: [] as OceanEvent[], error: null };
  }

  return supabase
    .from('events')
    .select('id, title, description, event_date, location, capacity')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true });
}

export async function loadImpactMetrics() {
  if (!isSupabaseConfigured) {
    return { data: [] as ImpactMetric[], error: null };
  }

  return supabase
    .from('impact_metrics')
    .select('metric_date, total_kg, plastic_kg, organic_kg, other_kg')
    .order('metric_date', { ascending: true })
    .limit(30);
}

export async function loadReportStatusHistory(reportId: string) {
  if (!isSupabaseConfigured) {
    return { data: [] as ReportStatusHistory[], error: null };
  }

  return supabase
    .from('report_status_history')
    .select('id, report_id, status, note, created_at, actor_id')
    .eq('report_id', reportId)
    .order('created_at', { ascending: true });
}

export async function loadNotifications() {
  if (!isSupabaseConfigured) {
    return { data: [] as OceanNotification[], error: null };
  }

  return supabase
    .from('notifications')
    .select('id, user_id, title, body, report_id, read_at, created_at')
    .order('created_at', { ascending: false })
    .limit(50);
}

export async function submitReportWithEvidence(draft: ReportDraft) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured.') };

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const deps: ReportSubmissionDeps = {
    getUser: async () => ({ user: userData.user ? { id: userData.user.id } : null, error: userError }),
    createReport: async (record) => supabase.from('reports').insert(record).select('id, owner_id, category, title, location, status, created_at').single(),
    readEvidence: async (uri, mime) => {
      try {
        const file = Platform.OS === 'web' ? null : new File(uri);
        const response = file ? null : await fetch(uri);
        if (response && !response.ok) throw new Error('Không đọc được ảnh.');
        const bytes = file ? await file.arrayBuffer() : await response!.arrayBuffer();
        const type = mime || file?.type || response?.headers.get('content-type') || 'image/jpeg';
        return { blob: { payload: bytes, type, size: bytes.byteLength }, error: null };
      } catch (error) {
        return { blob: { type: '', size: 0 }, error: error instanceof Error ? error : new Error('Không đọc được ảnh.') };
      }
    },
    uploadEvidence: async (path, image) => {
      if (!image.payload) return new Error('Thiếu dữ liệu ảnh.');
      return (await supabase.storage.from('report-evidence').upload(path, image.payload, { contentType: image.type, upsert: false })).error;
    },
    saveEvidence: async (record) => (await supabase.from('report_evidence').insert(record)).error,
    removeEvidence: async (path) => {
      const { error } = await supabase.storage.from('report-evidence').remove([path]);
      if (error) throw error;
    },
    deleteReport: async (id, ownerId) => {
      const { error } = await supabase.from('reports').delete().eq('id', id).eq('owner_id', ownerId).select('id').single();
      if (error) throw error;
    },
    createId: randomUUID
  };
  return submitReport(draft, deps);
}

export async function markNotificationRead(notificationId: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  return supabase
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('id', notificationId)
    .select()
    .single();
}

export async function registerForEvent(eventId: string, participantName: string, participantEmail: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { data: null, error: userError ?? new Error('You must be signed in to register for an event.') };
  }

  return supabase
    .from('event_registrations')
    .insert({ event_id: eventId, participant_name: participantName, participant_email: participantEmail, owner_id: userData.user.id })
    .select()
    .single();
}

export async function createEvent(input: Omit<OceanEvent, 'id'|'owner_id'|'ended_at'>) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { data: null, error: userError ?? new Error('You must be signed in to create an event.') };
  }
  return supabase.from('events').insert({ ...input, owner_id: userData.user.id }).select().single();
}

export async function updateEvent(eventId: string, input: Partial<Omit<OceanEvent,'id'|'owner_id'>>) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured.') };
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { data: null, error: userError ?? new Error('You must be signed in to edit an event.') };
  return supabase.from('events').update(input).eq('id', eventId).eq('owner_id', userData.user.id).select().single();
}

export async function recordEventCheckIn(eventId: string, code: string) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured.') };
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { data: null, error: userError ?? new Error('You must be signed in to check in.') };
  return supabase.rpc('check_in_to_event', { target: eventId, supplied_code: code.trim() });
}

export async function submitEventFeedback(eventId: string, rating: number, thoughts: string, enjoyed: string, joinAgain: string) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured.') };
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { data: null, error: userError ?? new Error('You must be signed in to submit feedback.') };
  return supabase.from('event_feedback').upsert({ event_id: eventId, user_id: userData.user.id, rating, thoughts, enjoyed, join_again: joinAgain }, { onConflict: 'event_id,user_id' }).select().single();
}

export async function loadEventMessages(eventId: string) {
  if (!isSupabaseConfigured) return { data: [] as EventMessage[], error: null };
  return supabase.from('event_messages').select('id, event_id, user_id, body, created_at').eq('event_id', eventId).order('created_at', { ascending: true });
}

export async function loadEventParticipants(eventId: string) {
  if (!isSupabaseConfigured) return { data: [] as Array<{ id: string; participant_name: string; participant_email: string; status: string }>, error: null };
  return supabase.from('event_registrations').select('id, participant_name, participant_email, status').eq('event_id', eventId).order('created_at', { ascending: true });
}

export async function moderateEventParticipant(registrationId: string, status: 'approved' | 'rejected') {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured.') };
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { data: null, error: userError ?? new Error('You must be signed in to moderate participants.') };
  return supabase
    .from('event_registrations')
    .update({ status })
    .eq('id', registrationId)
    .select()
    .single();
}

export async function sendEventMessage(eventId: string, body: string) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured.') };
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { data: null, error: userError ?? new Error('You must be signed in to send a message.') };
  return supabase.from('event_messages').insert({ event_id: eventId, user_id: userData.user.id, body }).select().single();
}

export async function createEventRecap(eventId: string, body: string, extra: Pick<EventRecap, 'total_kg'|'recyclable_kg'|'photo_path'> = {}) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase is not configured.') };
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { data: null, error: userError ?? new Error('You must be signed in to publish a recap.') };
  return supabase.from('event_recaps').insert({ event_id: eventId, author_id: userData.user.id, body, ...extra }).select().single();
}

export async function loadEventRecaps(eventId: string) {
  if (!isSupabaseConfigured) return { data: [] as EventRecap[], error: null };
  return supabase.from('event_recaps').select('id, event_id, author_id, body, created_at').eq('event_id', eventId).order('created_at', { ascending: false });
}

export async function createDonation(donorName: string, amount: number, campaign: string, note = '', requestId?:string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { data: null, error: userError ?? new Error('You must be signed in to record a donation.') };
  }

  const saved=await supabase.from('donations')
    .insert({...(requestId?{id:requestId}:{}),donor_name:donorName,amount,campaign,note,status:'pending',donor_id:userData.user.id}).select().single();
  if(saved.error?.code==='23505' && requestId){
    return supabase.from('donations').select().eq('id',requestId).eq('donor_id',userData.user.id).single();
  }
  return saved;
}
