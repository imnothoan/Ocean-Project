import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { screenCatalog, type ScreenDefinition } from '../navigation/screenCatalog';
import { createDonation, loadEvents, registerForEvent, type OceanEvent } from '../lib/supabase';
import { colors, radii, spacing, typography } from '../theme/tokens';

export function ScreenCatalogScreen({ onOpen }: { onOpen: (screen: ScreenDefinition) => void }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => screenCatalog.filter((screen) => `${screen.group} ${screen.title}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const groups = [...new Set(filtered.map((screen) => screen.group))];
  return <ScrollView contentContainerStyle={styles.content}><Text style={styles.eyebrow}>HIGH-FIDELITY FLOWS</Text><Text style={styles.heading}>Khám phá màn hình</Text><Text style={styles.subtitle}>Tất cả flow được gom theo nhóm để kiểm thử từng hành trình.</Text><TextInput value={query} onChangeText={setQuery} placeholder="Tìm màn hình..." placeholderTextColor={colors.muted} style={styles.search} />{groups.map((group) => <View key={group} style={styles.group}><Text style={styles.groupTitle}>{group}</Text>{filtered.filter((screen) => screen.group === group).map((screen) => <Pressable key={screen.id} style={styles.screenRow} onPress={() => onOpen(screen)}><View style={styles.screenNumber}><Text style={styles.number}>{screenCatalog.indexOf(screen) + 1}</Text></View><Text style={styles.screenTitle}>{screen.title}</Text><Text style={styles.chevron}>›</Text></Pressable>)}</View>)}</ScrollView>;
}

export function FlowDetailScreen({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  if (screen.group === 'Data & Donate' && /donat|payment|campaign|certificate/i.test(screen.title)) {
    return <DonationFlow screen={screen} onBack={onBack} />;
  }
  if (screen.group === 'Event Flow') {
    return <EventFlow screen={screen} onBack={onBack} />;
  }
  if (screen.group === 'Report Flow') {
    return <ReportFlow screen={screen} onBack={onBack} />;
  }
  if (screen.group === 'Community & Gamification') {
    return <CommunityFlow screen={screen} onBack={onBack} />;
  }
  return <AdminAndDataFlow screen={screen} onBack={onBack} />;
}

function FlowFrame({ screen, onBack, children }: { screen: ScreenDefinition; onBack: () => void; children: React.ReactNode }) {
  return <ScrollView contentContainerStyle={styles.content}><Pressable onPress={onBack}><Text style={styles.back}>‹ Quay lại danh sách</Text></Pressable><Text style={styles.eyebrow}>{screen.group.toUpperCase()}</Text><Text style={styles.heading}>{screen.title}</Text><Text style={styles.subtitle}>{screen.description}</Text>{children}</ScrollView>;
}

function Field({ label, value, onChangeText, placeholder, multiline = false }: { label: string; value: string; onChangeText: (value: string) => void; placeholder: string; multiline?: boolean }) {
  return <View style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted} multiline={multiline} style={[styles.input, multiline && styles.multiline]} /></View>;
}

function DonationFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [done, setDone] = useState(false);
  const submit = async () => {
    const numericAmount = Number(amount);
    if (!name.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert('Thiếu thông tin', 'Nhập tên và số tiền hợp lệ.');
      return;
    }
    const { error } = await createDonation(name.trim(), numericAmount, 'Bảo vệ đại dương');
    if (error) {
      Alert.alert('Không thể tạo quyên góp', error.message);
      return;
    }
    setDone(true);
  };
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.hero}><Text style={styles.heroIcon}>♥</Text><Text style={styles.heroTitle}>Bảo vệ đại dương</Text><Text style={styles.heroText}>Mỗi đóng góp được ghi nhận minh bạch trong Impact Report.</Text></View>{done ? <SuccessCard text="Đóng góp đã được ghi nhận. Cảm ơn bạn đã đồng hành!" /> : <View style={styles.card}><Field label="Tên người đóng góp" value={name} onChangeText={setName} placeholder="Nguyễn Văn A" /><Field label="Số tiền (VND)" value={amount} onChangeText={setAmount} placeholder="100000" /><Pressable style={styles.button} onPress={submit}><Text style={styles.buttonText}>Tiếp tục thanh toán</Text></Pressable></View>}<MetricCard title="Tác động dự kiến" values={['1kg rác được xử lý', 'Hỗ trợ cộng đồng ven biển', 'Báo cáo công khai theo tháng']} /></FlowFrame>;
}

function EventFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [event, setEvent] = useState<OceanEvent | null>(null);
  useEffect(() => {
    loadEvents().then(({ data }) => setEvent(data?.[0] ?? null));
  }, []);
  const submit = async () => {
    if (!name.trim() || !email.includes('@')) {
      Alert.alert('Thiếu thông tin', 'Nhập tên và email hợp lệ.');
      return;
    }
    if (!event) {
      Alert.alert('Chưa có sự kiện', 'Sự kiện chưa sẵn sàng để đăng ký.');
      return;
    }
    const { error } = await registerForEvent(event.id, name.trim(), email.trim());
    if (error) {
      Alert.alert('Chưa thể đăng ký', error.message);
      return;
    }
    setDone(true);
  };
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.eventBanner}><Text style={styles.eventWave}>≈</Text><Text style={styles.heroTitle}>Cùng hành động vì biển xanh</Text></View>{done ? <SuccessCard text="Bạn đã đăng ký thành công. Vé tham gia đã được lưu." /> : <View style={styles.card}><Field label="Họ và tên" value={name} onChangeText={setName} placeholder="Hoàng Nguyễn" /><Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" /><Pressable style={styles.button} onPress={submit}><Text style={styles.buttonText}>{/check-in|registration/i.test(screen.title) ? 'Xác nhận tham gia' : 'Tiếp tục'}</Text></Pressable></View>}<MetricCard title="Thông tin hành trình" values={['Địa điểm được xác minh', 'Có chứng nhận sau khi hoàn thành', 'Cập nhật qua thông báo']} /></FlowFrame>;
}

function ReportFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  const [note, setNote] = useState('');
  const [complete, setComplete] = useState(false);
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.progressSteps}>{['Thông tin', 'Bằng chứng', 'Xác nhận'].map((step, index) => <View key={step} style={styles.step}><View style={[styles.stepDot, index === 0 && styles.stepActive]}><Text style={styles.stepNumber}>{index + 1}</Text></View><Text style={styles.stepText}>{step}</Text></View>)}</View>{complete ? <SuccessCard text="Báo cáo đã chuyển sang bước tiếp theo." /> : <View style={styles.card}><Field label="Ghi chú bổ sung" value={note} onChangeText={setNote} placeholder="Mô tả chi tiết..." multiline /><Pressable style={styles.button} onPress={() => setComplete(true)}><Text style={styles.buttonText}>{/review|resolved|submitted/i.test(screen.title) ? 'Xác nhận trạng thái' : 'Lưu và tiếp tục'}</Text></Pressable></View>}<MetricCard title="Cam kết xử lý" values={['Thông tin được bảo mật', 'Đội kiểm duyệt sẽ phản hồi', 'Bạn có thể bổ sung bằng chứng']} /></FlowFrame>;
}

function CommunityFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  const [liked, setLiked] = useState(false);
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.profileHero}><Text style={styles.profileEmoji}>🌊</Text><View><Text style={styles.cardTitle}>Ocean Guardian</Text><Text style={styles.cardText}>1,280 điểm • Cấp 4</Text></View></View><MetricCard title={/leaderboard|ranking/i.test(screen.title) ? 'Bảng xếp hạng tuần này' : /challenge|reward|badge/i.test(screen.title) ? 'Tiến trình của bạn' : 'Cộng đồng hôm nay'} values={['Lan tỏa kiến thức biển', 'Tham gia thử thách xanh', 'Nhận huy hiệu đóng góp']} /><Pressable style={[styles.button, liked && styles.buttonComplete]} onPress={() => setLiked(!liked)}><Text style={styles.buttonText}>{liked ? 'Đã tương tác' : 'Tham gia cộng đồng'}</Text></Pressable></FlowFrame>;
}

function AdminAndDataFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.hero}><Text style={styles.heroIcon}>{screen.group === 'Map & Admin' ? '⌖' : '▥'}</Text><Text style={styles.heroTitle}>{screen.group === 'Map & Admin' ? 'Bản đồ & quản trị' : 'Dữ liệu tác động'}</Text><Text style={styles.heroText}>Các chỉ số được trình bày rõ ràng để người dùng và đội vận hành cùng ra quyết định.</Text></View><MetricCard title="Tổng quan" values={['Dữ liệu được đồng bộ theo thời gian thực', 'Bộ lọc theo khu vực và thời gian', 'Xuất báo cáo khi cần']} /><Pressable style={styles.button} onPress={() => Alert.alert('Đã cập nhật', 'Bộ lọc và trạng thái đã được áp dụng.')}><Text style={styles.buttonText}>Áp dụng và tiếp tục</Text></Pressable></FlowFrame>;
}

function MetricCard({ title, values }: { title: string; values: string[] }) {
  return <View style={styles.card}><Text style={styles.cardLabel}>{title.toUpperCase()}</Text>{values.map((value) => <View key={value} style={styles.metricRow}><View style={styles.metricDot} /><Text style={styles.cardText}>{value}</Text></View>)}</View>;
}

function SuccessCard({ text }: { text: string }) {
  return <View style={styles.success}><Text style={styles.successIcon}>✓</Text><Text style={styles.successText}>{text}</Text></View>;
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 100 },
  eyebrow: { color: colors.blue, ...typography.eyebrow, marginBottom: spacing.sm },
  heading: { color: colors.navy, ...typography.title },
  subtitle: { color: colors.muted, ...typography.body, marginTop: spacing.sm, marginBottom: spacing.xl },
  search: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: radii.md, padding: spacing.md, color: colors.ink, marginBottom: spacing.xxl },
  group: { marginBottom: 20 },
  groupTitle: { color: colors.navy, fontSize: 18, fontWeight: '800', marginBottom: 9 },
  screenRow: { alignItems: 'center', backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 14, flexDirection: 'row', marginBottom: 7, padding: 11 },
  screenNumber: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 10, height: 32, justifyContent: 'center', marginRight: 11, width: 32 },
  number: { color: colors.navy, fontSize: 12, fontWeight: '800' },
  screenTitle: { color: colors.ink, flex: 1, fontSize: 13, fontWeight: '700' },
  chevron: { color: colors.blue, fontSize: 24 },
  back: { color: colors.blue, fontSize: 14, fontWeight: '700', marginBottom: 28 },
  hero: { alignItems: 'center', backgroundColor: colors.navy, borderRadius: 22, marginVertical: 18, padding: 30 },
  heroIcon: { color: '#7EE1D1', fontSize: 40 },
  heroTitle: { color: colors.white, fontSize: 22, fontWeight: '800', marginTop: 12 },
  heroText: { color: '#C4D8DF', fontSize: 13, lineHeight: 20, marginTop: 8, textAlign: 'center' },
  card: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: 20, borderWidth: 1, marginBottom: 14, padding: 18 },
  cardLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1.1 },
  cardTitle: { color: colors.navy, fontSize: 18, fontWeight: '800', marginTop: 10 },
  cardText: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 8 },
  button: { alignItems: 'center', backgroundColor: colors.blue, borderRadius: 14, marginTop: 18, padding: 14 },
  buttonComplete: { backgroundColor: '#45B39D' },
  buttonText: { color: colors.white, fontSize: 14, fontWeight: '800' },
  statusRow: { alignItems: 'center', flexDirection: 'row', marginTop: 12 },
  statusDot: { borderRadius: 6, height: 12, marginRight: 9, width: 12 }
  ,field: { marginTop: 14 },
  fieldLabel: { color: colors.ink, fontSize: 13, fontWeight: '800', marginBottom: 7 },
  input: { borderColor: colors.line, borderRadius: 13, borderWidth: 1, color: colors.ink, padding: 13 },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  eventBanner: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 22, marginBottom: 16, padding: 25 },
  eventWave: { color: colors.blue, fontSize: 55, marginBottom: 8 },
  progressSteps: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  step: { alignItems: 'center', flex: 1 },
  stepDot: { alignItems: 'center', backgroundColor: colors.line, borderRadius: 15, height: 30, justifyContent: 'center', width: 30 },
  stepActive: { backgroundColor: colors.blue },
  stepNumber: { color: colors.white, fontSize: 12, fontWeight: '800' },
  stepText: { color: colors.muted, fontSize: 11, marginTop: 5 },
  metricRow: { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
  metricDot: { backgroundColor: '#45B39D', borderRadius: 5, height: 10, marginRight: 9, width: 10 },
  profileHero: { alignItems: 'center', backgroundColor: colors.mint, borderRadius: 20, flexDirection: 'row', marginBottom: 16, padding: 20 },
  profileEmoji: { fontSize: 40, marginRight: 15 },
  success: { alignItems: 'center', backgroundColor: '#E8FAF7', borderRadius: 20, marginBottom: 16, padding: 24 },
  successIcon: { color: '#299B78', fontSize: 42, fontWeight: '800' },
  successText: { color: colors.ink, fontSize: 14, lineHeight: 20, marginTop: 10, textAlign: 'center' }
});
