import { supabase } from '../../lib/supabase';

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export function resendConfirmation(email: string) {
  return supabase.auth.resend({ type: 'signup', email: email.trim() });
}

export function requestPasswordReset(email: string) {
  return supabase.auth.resetPasswordForEmail(email.trim());
}

export function requestEmailLogin(email: string) {
  return supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
}
