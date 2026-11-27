import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createRecoveryAuth, supabase, supabaseUrl } from '../../lib/supabase';
import {
  requestEmailLogin,
  requestPasswordReset,
  resendConfirmation,
  signIn,
  signUp,
} from './authService';
import { emailProof, normalizeEmail, passwordlessProof, recoveryProof } from './recovery';
import { colors, radii, spacing, typography } from '../../theme/tokens';

type Mode =
  'quick' | 'emailLogin' | 'signIn' | 'signUp' | 'confirmation' | 'reset' | 'verify' | 'password';
const headings: Record<Mode, string> = {
  quick: 'Tạo tài khoản',
  emailLogin: 'Xác nhận email',
  signIn: 'Chào mừng trở lại',
  signUp: 'Tạo tài khoản',
  confirmation: 'Xác nhận tài khoản',
  reset: 'Quên mật khẩu',
  verify: 'Kiểm tra email',
  password: 'Chọn mật khẩu mới',
};
const submitLabels: Record<Mode, string> = {
  quick: 'Đăng ký',
  emailLogin: 'Xác nhận và tiếp tục',
  signIn: 'Đăng nhập',
  signUp: 'Đăng ký',
  confirmation: 'Xác nhận và đăng nhập',
  reset: 'Gửi email khôi phục',
  verify: 'Xác minh',
  password: 'Lưu mật khẩu mới',
};

function errorMessage(error: unknown) {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : '';
  switch (code) {
    case 'email_address_invalid':
      return 'Supabase không chấp nhận địa chỉ này. Kiểm tra chính tả và dùng hộp thư có thể nhận email.';
    case 'email_address_not_authorized':
      return 'Dịch vụ email của dự án chưa cho phép gửi tới địa chỉ này. Quản trị viên cần cấu hình email gửi đi.';
    case 'signup_disabled':
      return 'Dự án đang tắt đăng ký tài khoản mới.';
    case 'weak_password':
      return 'Mật khẩu chưa đủ mạnh. Hãy dùng mật khẩu dài hơn với chữ hoa, chữ thường và số.';
    case 'invalid_credentials':
      return 'Email hoặc mật khẩu chưa đúng.';
    case 'otp_expired':
      return 'Liên kết hoặc mã đã hết hạn hoặc đã được sử dụng. Hãy yêu cầu một email mới.';
    case 'same_password':
      return 'Hãy chọn mật khẩu khác mật khẩu cũ.';
    case 'over_email_send_rate_limit':
      return 'Supabase đã giới hạn gửi email. Hãy kiểm tra hộp thư và thư rác. Nếu chưa nhận được thư, vui lòng thử lại sau.';
    case 'over_request_rate_limit':
      return 'Bạn đã gửi yêu cầu gần đây. Vui lòng chờ rồi thử lại.';
    default:
      return error instanceof Error ? error.message : 'Kiểm tra mạng rồi thử lại.';
  }
}

export function AuthScreen({
  onBack,
  onAuthenticated = onBack,
}: {
  onBack: () => void;
  onAuthenticated?: () => void;
}) {
  const [mode, setMode] = useState<Mode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [proof, setProof] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [resendAt, setResendAt] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const lock = useRef(false);
  useEffect(() => {
    if (!resendAt) return;
    const tick = () => setSeconds(Math.max(0, Math.ceil((resendAt - Date.now()) / 1000)));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [resendAt]);
  const mounted = useRef(true);
  const recovery = useRef<ReturnType<typeof createRecoveryAuth> | null>(null);
  function releaseRecovery() {
    const client = recovery.current;
    recovery.current = null;
    if (client) void client.signOut({ scope: 'local' }).catch(() => {});
  }
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      releaseRecovery();
    };
  }, []);

  function changeMode(next: Mode, message = '') {
    setMode(next);
    setPassword('');
    setProof('');
    setNotice(message);
    if (next !== 'password') releaseRecovery();
  }

  const showEmail = ['signIn', 'signUp', 'reset', 'quick'].includes(mode);
  const confirmEmail = mode === 'confirmation' || mode === 'emailLogin';
  const showPassword = ['signIn', 'signUp', 'password'].includes(mode);
  async function submit(resend = false) {
    if (lock.current) return;
    const address = normalizeEmail(email);
    if (resend && Date.now() < resendAt) return;
    if (showEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address)) {
      setNotice('Hãy nhập địa chỉ email hợp lệ.');
      return;
    }
    if (showPassword && (!password || (mode !== 'signIn' && password.length < 6))) {
      setNotice(mode === 'signIn' ? 'Hãy nhập mật khẩu.' : 'Mật khẩu cần ít nhất 6 ký tự.');
      return;
    }
    lock.current = true;
    setBusy(true);
    setNotice('');
    try {
      if (mode === 'quick' || (mode === 'emailLogin' && resend)) {
        const { error } = await requestEmailLogin(address);
        if (error) throw error;
        if (!mounted.current) return;
        setEmail(address);
        setResendAt(Date.now() + 60_000);
        changeMode('emailLogin', 'Kiểm tra hộp thư đến và thư rác.');
      } else if (mode === 'reset' || resend) {
        const { error } =
          mode === 'reset' ? await requestPasswordReset(address) : await resendConfirmation(address);
        if (error) throw error;
        if (!mounted.current) return;
        setResendAt(Date.now() + 60_000);
        if (mode === 'reset') changeMode('verify');
        else setNotice('Kiểm tra hộp thư và thư rác để tìm email xác nhận.');
      } else if (confirmEmail) {
        const input =
          mode === 'emailLogin'
            ? passwordlessProof(proof, address, supabaseUrl)
            : emailProof('signup', proof, address, supabaseUrl);
        const { data, error } = await supabase.auth.verifyOtp(input);
        if (error || !data.session) throw error || new Error('Chưa thể xác nhận tài khoản.');
        if (mounted.current) onAuthenticated();
      } else if (mode === 'verify') {
        const input = recoveryProof(proof, address, supabaseUrl);
        const client = createRecoveryAuth();
        recovery.current = client;
        const { data, error } = await client.verifyOtp(input);
        if (error || !data.session) throw error || new Error('Không thể xác minh liên kết.');
        if (!mounted.current) {
          await client.signOut({ scope: 'local' });
          return;
        }
        setEmail(data.session.user.email ?? address);
        changeMode('password');
      } else if (mode === 'password') {
        if (!recovery.current) {
          changeMode('reset');
          return;
        }
        const { error } = await recovery.current.updateUser({ password });
        if (error) throw error;
        if (mounted.current) changeMode('signIn', 'Đã đổi mật khẩu. Bạn có thể đăng nhập.');
      } else {
        const { data, error } =
          mode === 'signIn' ? await signIn(address, password) : await signUp(address, password);
        if (!mounted.current) return;
        if (error?.code === 'email_not_confirmed') {
          changeMode('confirmation');
          return;
        }
        if (error) throw error;
        if (data.session) onAuthenticated();
        else {
          setEmail(address);
          setResendAt(Date.now() + 60_000);
          changeMode('confirmation');
        }
      }
    } catch (error) {
      if (mode === 'verify') releaseRecovery();
      if (
        mounted.current &&
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'over_email_send_rate_limit'
      ) {
        setResendAt(Date.now() + 60_000);
        if (mode === 'signUp') changeMode('confirmation');
        if (mode === 'quick') changeMode('emailLogin');
      }
      if (mounted.current) setNotice(errorMessage(error));
    } finally {
      lock.current = false;
      if (mounted.current) setBusy(false);
    }
  }

  const subtitle =
    mode === 'quick'
      ? 'Nhập email để tạo tài khoản hoặc đăng nhập. Ocean Project sẽ gửi một liên kết đến hộp thư của bạn.'
      : mode === 'verify'
        ? 'Trong email khôi phục, nhấn giữ nút đặt lại mật khẩu để sao chép liên kết trước khi mở. Dán liên kết vào ô bên dưới hoặc nhập mã nếu email có mã.'
        : confirmEmail
          ? 'Kiểm tra thư gửi tới ' +
            email +
            '. Nhấn giữ nút xác nhận trong thư để sao chép liên kết rồi dán vào đây, hoặc nhập mã nếu thư có mã. Nếu đã mở liên kết, hãy quay lại đăng nhập.'
          : mode === 'reset'
            ? 'Nhập email của tài khoản để nhận liên kết đổi mật khẩu.'
            : mode === 'password'
              ? 'Đặt mật khẩu mới cho ' + email
              : 'Đồng bộ báo cáo, sự kiện và tác động của bạn trên mọi thiết bị.';

  function link(label: string, press: () => void) {
    return (
      <Pressable accessibilityRole="button" disabled={busy} onPress={press}>
        <Text style={styles.switch}>{label}</Text>
      </Pressable>
    );
  }
  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={() => (mode === 'signIn' ? onBack() : changeMode('signIn'))}
          >
            <Text style={styles.back}>‹ Quay lại</Text>
          </Pressable>
          <Text style={styles.eyebrow}>OCEAN PROJECT</Text>
          <Text style={styles.heading}>{headings[mode]}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.card}>
            {showEmail && (
              <>
                <Text style={styles.label}>EMAIL</Text>
                <TextInput
                  testID="auth-email"
                  accessibilityLabel="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  keyboardType="email-address"
                  editable={!busy}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  style={styles.input}
                />
              </>
            )}
            {showPassword && (
              <>
                <Text style={styles.label}>{mode === 'password' ? 'MẬT KHẨU MỚI' : 'MẬT KHẨU'}</Text>
                <TextInput
                  key={mode}
                  testID="auth-password"
                  accessibilityLabel="Mật khẩu"
                  secureTextEntry
                  editable={!busy}
                  autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={() => void submit()}
                  returnKeyType="go"
                  style={styles.input}
                />
              </>
            )}
            {(mode === 'verify' || confirmEmail) && (
              <>
                <Text style={styles.label}>
                  {confirmEmail ? 'LIÊN KẾT HOẶC MÃ XÁC NHẬN' : 'LIÊN KẾT HOẶC MÃ KHÔI PHỤC'}
                </Text>
                <TextInput
                  accessibilityLabel={
                    confirmEmail ? 'Liên kết hoặc mã xác nhận' : 'Liên kết hoặc mã khôi phục'
                  }
                  autoComplete="one-time-code"
                  textContentType="oneTimeCode"
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!busy}
                  value={proof}
                  onChangeText={setProof}
                  onSubmitEditing={() => void submit()}
                  style={styles.input}
                />
              </>
            )}
            {notice ? (
              <Text accessibilityLiveRegion="polite" style={styles.subtitle}>
                {notice}
              </Text>
            ) : null}
            <Pressable
              accessibilityRole="button"
              disabled={busy}
              style={styles.button}
              onPress={() => void submit()}
            >
              {busy ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>{submitLabels[mode]}</Text>
              )}
            </Pressable>
          </View>
          {confirmEmail && (
            <Pressable
              accessibilityRole="button"
              disabled={busy || seconds > 0}
              onPress={() => void submit(true)}
            >
              <Text style={styles.switch}>
                {seconds > 0 ? 'Có thể gửi lại sau ' + seconds + ' giây' : 'Gửi lại email xác nhận'}
              </Text>
            </Pressable>
          )}
          {mode === 'quick' && link('Đăng ký bằng mật khẩu', () => changeMode('signUp'))}
          {mode === 'signIn' && link('Tiếp tục chỉ với email', () => changeMode('quick'))}
          {mode === 'signIn' && link('Quên mật khẩu?', () => changeMode('reset'))}
          {mode === 'verify' && link('Yêu cầu email mới', () => changeMode('reset'))}
          {link(mode === 'signIn' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập', () =>
            changeMode(mode === 'signIn' ? 'quick' : 'signIn'),
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#F7FBFC', flex: 1 },
  content: { padding: spacing.xl },
  back: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.xxxl,
  },
  eyebrow: {
    color: colors.blue,
    ...typography.eyebrow,
    marginBottom: spacing.sm,
  },
  heading: { color: colors.navy, ...typography.title },
  subtitle: {
    color: colors.muted,
    ...typography.body,
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.xl,
  },
  label: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    borderColor: colors.line,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 14,
    padding: spacing.md,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: radii.md,
    marginTop: spacing.xl,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonText: { color: colors.white, fontSize: 14, fontWeight: '800' },
  switch: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
