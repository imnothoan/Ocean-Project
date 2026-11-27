type MailAction = 'recovery' | 'signup';
type Proof<T extends MailAction> =
  { type: T; token_hash: string } | { type: T; email: string; token: string };

export function normalizeEmail(value: string) {
  return value.trim().normalize('NFC').toLowerCase();
}

// Consume the original link in Expo Go before the mail app follows its browser redirect.
export function emailProof<T extends MailAction>(
  type: T,
  input: string,
  email: string,
  projectUrl: string,
): Proof<T> {
  const value = input.trim();
  if (/^\d{6,10}$/.test(value)) return { type, email: normalizeEmail(email), token: value };
  try {
    const url = new URL(value);
    const project = new URL(projectUrl);
    const hash = url.searchParams.get('token');
    if (
      url.origin === project.origin &&
      !url.username &&
      !url.password &&
      url.pathname === '/auth/v1/verify' &&
      url.searchParams.get('type') === type &&
      hash &&
      /^[A-Za-z0-9_-]+$/.test(hash)
    ) {
      return { type, token_hash: hash };
    }
  } catch {
    // A malformed or unrelated link has the same recovery instructions.
  }
  const action = type === 'signup' ? 'xác nhận tài khoản' : 'đặt lại mật khẩu';
  throw new Error(
    'Hãy sao chép liên kết ' + action + ' từ email của Ocean Project hoặc nhập mã trong email.',
  );
}

export const recoveryProof = (input: string, email: string, projectUrl: string) =>
  emailProof('recovery', input, email, projectUrl);
