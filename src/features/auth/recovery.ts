export type RecoveryProof =
  | { type: 'recovery'; token_hash: string }
  | { type: 'recovery'; email: string; token: string };

// Supabase's standard email contains a verification link. Reading the token
// locally lets Expo Go finish recovery without a registered custom URL scheme.
export function recoveryProof(input: string, email: string, projectUrl: string): RecoveryProof {
  const value = input.trim();
  if (/^\d{6,10}$/.test(value)) {
    return { type: 'recovery', email: email.trim(), token: value };
  }

  try {
    const url = new URL(value);
    const project = new URL(projectUrl);
    const hash = url.searchParams.get('token');
    if (url.origin === project.origin && !url.username && !url.password &&
        url.pathname === '/auth/v1/verify' && url.searchParams.get('type') === 'recovery' &&
        hash && /^[A-Za-z0-9_-]+$/.test(hash)) {
      return { type: 'recovery', token_hash: hash };
    }
  } catch {
    // Both malformed URLs and unrelated links receive the same user-facing error.
  }
  throw new Error('Hãy sao chép liên kết đặt lại mật khẩu từ email của Ocean Project hoặc nhập mã trong email.');
}
