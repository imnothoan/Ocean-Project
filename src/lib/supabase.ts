import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { type ReportDraft } from '../features/reports/reportValidation';
import { submitReport, type ReportSubmissionDeps } from '../features/reports/reportSubmission';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

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

export type ReportCategory = 'pollution' | 'animal' | 'recycle';

export type OceanReport = {
  id: string;
  owner_id: string;
  category: ReportCategory;
  title: string;
  location: string;
  status: 'submitted' | 'reviewing' | 'resolved';
  created_at: string;
};

export type OceanEvent = {
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

export async function loadReports() {
  if (!isSupabaseConfigured) {
    return { data: [] as OceanReport[], error: null };
  }

  return supabase
    .from('reports')
    .select('id, owner_id, category, title, location, status, created_at')
    .order('created_at', { ascending: false });
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
    readEvidence: async (uri) => { try { const response = await fetch(uri); if (!response.ok) return { blob: new Blob(), error: new Error('Evidence image could not be read.') }; return { blob: await response.blob(), error: null }; } catch (error) { return { blob: new Blob(), error: error instanceof Error ? error : new Error('Evidence image could not be read.') }; } },
    uploadEvidence: async (path, blob) => (await supabase.storage.from('report-evidence').upload(path, blob, { contentType: blob.type, upsert: false })).error,
    saveEvidence: async (record) => (await supabase.from('report_evidence').insert(record)).error,
    removeEvidence: async (path) => { await supabase.storage.from('report-evidence').remove([path]); },
    deleteReport: async (id, ownerId) => { await supabase.from('reports').delete().eq('id', id).eq('owner_id', ownerId); },
    createId: () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
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

  return supabase
    .from('event_registrations')
    .insert({ event_id: eventId, participant_name: participantName, participant_email: participantEmail })
    .select()
    .single();
}

export async function createDonation(donorName: string, amount: number, campaign: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  return supabase
    .from('donations')
    .insert({ donor_name: donorName, amount, campaign, status: 'pending' })
    .select()
    .single();
}
