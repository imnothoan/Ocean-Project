import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createRecoveryAuth, supabaseUrl } from '../../lib/supabase';
import { requestPasswordReset, resendConfirmation, signIn, signUp } from './authService';
import { recoveryProof } from './recovery';
import { colors, radii, spacing, typography } from '../../theme/tokens';

type Mode = 'signIn' | 'signUp' | 'confirmation' | 'reset' | 'verify' | 'password';
const headings: Record<Mode, string> = {
  signIn: 'Chào mừng trở lại', signUp: 'Tạo tài khoản', confirmation: 'Xác nhận tài khoản',
  reset: 'Quên mật khẩu', verify: 'Kiểm tra email', password: 'Chọn mật khẩu mới'
};
const submitLabels: Record<Mode, string> = {
  signIn: 'Đăng nhập', signUp: 'Đăng ký', confirmation: 'Gửi lại email xác nhận',
  reset: 'Gửi email khôi phục', verify: 'Xác minh', password: 'Lưu mật khẩu mới'
};

function errorMessage(error: unknown) {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : '';
  switch (code) {
    case 'invalid_credentials': return 'Email hoặc mật khẩu chưa đúng.';
    case 'otp_expired': return 'Liên kết hoặc mã đã hết hạn hoặc đã được sử dụng. Hãy yêu cầu một email mới.';
    case 'same_password': return 'Hãy chọn mật khẩu khác mật khẩu cũ.';
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit': return 'Bạn đã gửi yêu cầu gần đây. Vui lòng chờ rồi thử lại.';
    default: return error instanceof Error ? error.message : 'Kiểm tra mạng rồi thử lại.';
  }
}

export function AuthScreen({ onBack, onAuthenticated = onBack }: { onBack: () => void; onAuthenticated?: () => void }) {
  const [mode, setMode] = useState<Mode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [proof, setProof] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const lock = useRef(false);
  const mounted = useRef(true);
  const recovery = useRef<ReturnType<typeof createRecoveryAuth> | null>(null);
  function releaseRecovery() {
    const client = recovery.current;
    recovery.current = null;
    if (client) void client.signOut({ scope: 'local' }).catch(() => {});
  }
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; releaseRecovery(); };
  }, []);

  function changeMode(next: Mode, message = '') {
    setMode(next);
    setPassword('');
    setProof('');
    setNotice(message);
    if (next !== 'password') releaseRecovery();
  }

  const showEmail = ['signIn', 'signUp', 'reset'].includes(mode);
  const showPassword = ['signIn', 'signUp', 'password'].includes(mode);
  async function submit() {
    if (lock.current) return;
    const address = email.trim();
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
      if (mode === 'reset' || mode === 'confirmation') {
        const { error } = mode === 'reset' ? await requestPasswordReset(address) : await resendConfirmation(address);
        if (error) throw error;
        if (!mounted.current) return;
        if (mode === 'reset') changeMode('verify');
        else setNotice('Kiểm tra hộp thư và thư rác để tìm email xác nhận.');
      } else if (mode === 'verify') {
        const input = recoveryProof(proof, address, supabaseUrl);
        const client = createRecoveryAuth();
        recovery.current = client;
        const { data, error } = await client.verifyOtp(input);
        if (error || !data.session) throw error || new Error('Không thể xác minh liên kết.');
        if (!mounted.current) { await client.signOut({ scope: 'local' }); return; }
        setEmail(data.session.user.email ?? address);
        changeMode('password');
      } else if (mode === 'password') {
        if (!recovery.current) { changeMode('reset'); return; }
        const { error } = await recovery.current.updateUser({ password });
        if (error) throw error;
        if (mounted.current) changeMode('signIn', 'Đã đổi mật khẩu. Bạn có thể đăng nhập.');
      } else {
        const { data, error } = mode === 'signIn' ? await signIn(address, password) : await signUp(address, password);
        if (!mounted.current) return;
        if (error?.code === 'email_not_confirmed') { changeMode('confirmation'); return; }
        if (error) throw error;
        if (data.session) onAuthenticated();
        else changeMode('confirmation');
      }
    } catch (error) {
      if (mode === 'verify') releaseRecovery();
      if (mounted.current) setNotice(errorMessage(error));
    } finally {
      lock.current = false;
      if (mounted.current) setBusy(false);
    }
  }

  const subtitle = mode === 'verify'
    ? 'Trong email khôi phục, nhấn giữ nút đặt lại mật khẩu để sao chép liên kết trước khi mở. Dán liên kết vào ô bên dưới hoặc nhập mã nếu email có mã.'
    : mode === 'confirmation' ? 'Mở liên kết xác nhận trong email rồi quay lại đăng nhập.'
    : mode === 'reset' ? 'Nhập email của tài khoản để nhận liên kết đổi mật khẩu.'
    : mode === 'password' ? 'Đặt mật khẩu mới cho ' + email
    : 'Đồng bộ báo cáo, sự kiện và tác động của bạn trên mọi thiết bị.';

  function link(label: string, press: () => void) {
    return <Pressable accessibilityRole="button" disabled={busy} onPress={press}><Text style={styles.switch}>{label}</Text></Pressable>;
  }
  return <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" disabled={busy} onPress={() => mode === 'signIn' ? onBack() : changeMode('signIn')}>
          <Text style={styles.back}>‹ Quay lại</Text>
        </Pressable>
        <Text style={styles.eyebrow}>OCEAN PROJECT</Text><Text style={styles.heading}>{headings[mode]}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.card}>
          {showEmail && <><Text style={styles.label}>EMAIL</Text>
            <TextInput accessibilityLabel="Email" autoCapitalize="none" autoCorrect={false} autoComplete="email" keyboardType="email-address" editable={!busy}
              value={email} onChangeText={setEmail} placeholder="you@example.com" style={styles.input}/></>}
          {showPassword && <><Text style={styles.label}>{mode === 'password' ? 'MẬT KHẨU MỚI' : 'MẬT KHẨU'}</Text>
            <TextInput key={mode} accessibilityLabel="Mật khẩu" secureTextEntry editable={!busy}
              autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'} value={password} onChangeText={setPassword}
              onSubmitEditing={submit} returnKeyType="go" style={styles.input}/></>}
          {mode === 'verify' && <><Text style={styles.label}>LIÊN KẾT HOẶC MÃ KHÔI PHỤC</Text>
            <TextInput accessibilityLabel="Liên kết hoặc mã khôi phục" secureTextEntry autoCapitalize="none" autoCorrect={false}
              editable={!busy} value={proof} onChangeText={setProof} onSubmitEditing={submit} style={styles.input}/></>}
          {notice ? <Text accessibilityLiveRegion="polite" style={styles.subtitle}>{notice}</Text> : null}
          <Pressable accessibilityRole="button" disabled={busy} style={styles.button} onPress={submit}>
            {busy ? <ActivityIndicator color={colors.white}/> : <Text style={styles.buttonText}>{submitLabels[mode]}</Text>}
          </Pressable>
        </View>
        {mode === 'signIn' && link('Quên mật khẩu?', () => changeMode('reset'))}
        {mode === 'verify' && link('Yêu cầu email mới', () => changeMode('reset'))}
        {link(mode === 'signIn' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập', () => changeMode(mode === 'signIn' ? 'signUp' : 'signIn'))}
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#F7FBFC', flex: 1 },
  content: { padding: spacing.xl },
  back: { color: colors.blue, fontSize: 14, fontWeight: '700', marginBottom: spacing.xxxl },
  eyebrow: { color: colors.blue, ...typography.eyebrow, marginBottom: spacing.sm },
  heading: { color: colors.navy, ...typography.title },
  subtitle: { color: colors.muted, ...typography.body, marginTop: spacing.sm, marginBottom: spacing.xxl },
  card: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.xl, borderWidth: 1, padding: spacing.xl },
  label: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: spacing.sm, marginTop: spacing.md },
  input: { borderColor: colors.line, borderRadius: radii.md, borderWidth: 1, color: colors.ink, fontSize: 14, padding: spacing.md },
  button: { alignItems: 'center', backgroundColor: colors.blue, borderRadius: radii.md, marginTop: spacing.xl, minHeight: 50, justifyContent: 'center' },
  buttonText: { color: colors.white, fontSize: 14, fontWeight: '800' },
  switch: { color: colors.blue, fontSize: 13, fontWeight: '700', marginTop: spacing.xl, textAlign: 'center' }
});
