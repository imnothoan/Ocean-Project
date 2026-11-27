type MailAction = 'recovery' | 'signup' | 'email' | 'magiclink';
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
  const action = type === 'recovery' ? 'đặt lại mật khẩu' : 'xác nhận tài khoản';
  throw new Error(
    'Hãy sao chép liên kết ' + action + ' từ email của Ocean Project hoặc nhập mã trong email.',
  );
}

export const recoveryProof = (input: string, email: string, projectUrl: string) =>
  emailProof('recovery', input, email, projectUrl);

export function passwordlessProof(input: string, address: string, projectUrl: string) {
  let purpose: 'signup' | 'email' | 'magiclink' = 'email';
  try {
    const type = new URL(input.trim()).searchParams.get('type');
    if (type === 'signup' || type === 'magiclink') purpose = type;
  } catch {
    // Numeric email codes are verified with the email OTP type.
  }
  return emailProof(purpose, input, address, projectUrl);
}
