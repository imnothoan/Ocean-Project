import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { signIn, signUp } from './authService';
import { colors, radii, spacing, typography } from '../../theme/tokens';

export function AuthScreen({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const [notice, setNotice] = useState('');

  async function submit() {
    if (busy) return;
    setNotice('');
    if (!email.trim() || !email.includes('@') || password.length < 6) {
      setNotice('Em hãy nhập email hợp lệ và mật khẩu tối thiểu 6 ký tự.');
      return;
    }

    setBusy(true);
    try {
      const { data, error } = mode === 'signIn'
        ? await signIn(email.trim(), password)
        : await signUp(email.trim(), password);
      if (error) {
        const message = error.code === 'invalid_credentials' ? 'Email hoặc mật khẩu chưa đúng.'
          : error.code === 'email_not_confirmed' ? 'Hãy xác nhận email rồi đăng nhập lại.' : error.message;
        setNotice(message);
      } else if (data.session) {
        onBack();
      } else {
        setNotice('Kiểm tra hộp thư để xác nhận tài khoản, sau đó đăng nhập.');
        setMode('signIn');
        setPassword('');
      }
    } catch {
      setNotice('Không kết nối được. Kiểm tra mạng rồi thử lại.');
    } finally {
      setBusy(false);
    }
  }

  return <SafeAreaView style={styles.safe}><KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}><Pressable onPress={onBack}><Text style={styles.back}>‹ Quay lại</Text></Pressable><Text style={styles.eyebrow}>OCEAN PROJECT</Text><Text style={styles.heading}>{mode === 'signIn' ? 'Chào mừng trở lại' : 'Tạo tài khoản'}</Text><Text style={styles.subtitle}>Đồng bộ báo cáo, sự kiện và tác động của bạn trên mọi thiết bị.</Text><View style={styles.card}><Text style={styles.label}>EMAIL</Text><TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={colors.muted} style={styles.input} /><Text style={styles.label}>MẬT KHẨU</Text><TextInput secureTextEntry value={password} onChangeText={setPassword} placeholder="Tối thiểu 6 ký tự" placeholderTextColor={colors.muted} style={styles.input} />{notice ? <Text accessibilityLiveRegion="polite" style={styles.subtitle}>{notice}</Text> : null}<Pressable accessibilityRole="button" disabled={busy} style={styles.button} onPress={submit}>{busy ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>{mode === 'signIn' ? 'Đăng nhập' : 'Đăng ký'}</Text>}</Pressable></View><Pressable disabled={busy} onPress={() => { setNotice(''); setMode(mode === 'signIn' ? 'signUp' : 'signIn'); }}><Text style={styles.switch}>{mode === 'signIn' ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}</Text></Pressable></ScrollView></KeyboardAvoidingView></SafeAreaView>;
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
