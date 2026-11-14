import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { createReport, loadEvents, loadImpactMetrics, loadReports, type ImpactMetric, type OceanEvent, type OceanReport, type ReportCategory } from './src/lib/supabase';
import { FlowDetailScreen, ScreenCatalogScreen } from './src/screens/FlowScreens';
import type { ScreenDefinition } from './src/navigation/screenCatalog';
import { AuthScreen } from './src/features/auth/AuthScreen';
import { ReportEntryFlow } from './src/features/reports/ReportEntryFlow';
import { NotificationInboxScreen, ReportHistoryScreen } from './src/features/reports/ReportHistoryScreens';

type Tab = 'home' | 'report' | 'events' | 'data' | 'profile';
type Overlay = 'history' | 'notifications' | null;

const palette = {
  navy: '#0D2B45',
  blue: '#087EA4',
  aqua: '#B9F2F4',
  mint: '#E8FAF7',
  ink: '#17324D',
  muted: '#6E8494',
  line: '#DDEBEF',
  white: '#FFFFFF',
  coral: '#FF7A68'
};

const demoReports = [
  { title: 'Rác thải nhựa ven bờ', meta: 'Cầu cảng Cát Bà • Đang xử lý', color: '#DDF7F0' },
  { title: 'Rùa biển cần hỗ trợ', meta: 'Vịnh Lan Hạ • Đã tiếp nhận', color: '#EAF2FF' }
];

const events = [
  { title: 'Làm sạch bãi biển', date: 'Thứ Bảy, 18.05', place: 'Bãi biển Tân Thành', people: '38 người tham gia' },
  { title: 'Đêm quan sát sinh vật biển', date: 'Chủ Nhật, 26.05', place: 'Trạm nghiên cứu Cù Lao Chàm', people: '12 chỗ còn lại' }
];

function Header({ title, subtitle, onNotifications }: { title: string; subtitle?: string; onNotifications?: () => void }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>OCEAN PROJECT</Text>
        <Text style={styles.heading}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.headerActions}>{onNotifications ? <Pressable onPress={onNotifications} style={styles.notificationButton}><Text style={styles.notificationText}>✦</Text></Pressable> : null}<View style={styles.avatar}><Text style={styles.avatarText}>OH</Text></View></View>
    </View>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function Pill({ text, active = false }: { text: string; active?: boolean }) {
  return <View style={[styles.pill, active && styles.pillActive]}><Text style={[styles.pillText, active && styles.pillTextActive]}>{text}</Text></View>;
}

function HomeScreen({ goTo, openOverlay }: { goTo: (tab: Tab) => void; openOverlay: (overlay: Exclude<Overlay, null>) => void }) {
  const [reports, setReports] = useState<OceanReport[]>([]);

  useEffect(() => {
    loadReports().then(({ data }) => {
      if (data) setReports(data);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Header title="Xin chào, Hoàng 👋" subtitle="Cùng nhau giữ đại dương xanh hơn mỗi ngày." onNotifications={() => openOverlay('notifications')} />
      <Card style={styles.impactCard}>
        <View style={styles.impactTop}><Text style={styles.cardLabel}>TÁC ĐỘNG CỦA BẠN</Text><Text style={styles.impactIcon}>✦</Text></View>
        <Text style={styles.impactValue}>128.4 kg</Text>
        <Text style={styles.impactCaption}>rác thải được ghi nhận và xử lý</Text>
        <View style={styles.progress}><View style={[styles.progressFill, { width: '72%' }]} /></View>
        <Text style={styles.progressLabel}>72% mục tiêu tháng 5</Text>
      </Card>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Hành động nhanh</Text><Text style={styles.link}>Xem tất cả</Text></View>
      <View style={styles.quickGrid}>
        <Pressable style={[styles.quick, { backgroundColor: '#DDF7F0' }]} onPress={() => goTo('report')}><Text style={styles.quickIcon}>⌖</Text><Text style={styles.quickTitle}>Báo cáo vấn đề</Text><Text style={styles.quickMeta}>Giúp chúng tôi xử lý nhanh</Text></Pressable>
        <Pressable style={[styles.quick, { backgroundColor: '#EAF2FF' }]} onPress={() => goTo('events')}><Text style={styles.quickIcon}>◉</Text><Text style={styles.quickTitle}>Tham gia sự kiện</Text><Text style={styles.quickMeta}>Kết nối cộng đồng</Text></Pressable>
      </View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Báo cáo gần đây</Text><Pressable onPress={() => openOverlay('history')}><Text style={styles.link}>Lịch sử</Text></Pressable></View>
      {(reports.length ? reports.slice(0, 3).map((report) => ({ title: report.title, meta: `${report.location} • ${report.status === 'resolved' ? 'Đã xử lý' : report.status === 'reviewing' ? 'Đang xử lý' : 'Đã tiếp nhận'}`, color: '#DDF7F0' })) : demoReports).map((report) => <Card key={report.title} style={styles.reportRow}><View style={[styles.reportDot, { backgroundColor: report.color }]}><Text>♒</Text></View><View style={styles.flex}><Text style={styles.rowTitle}>{report.title}</Text><Text style={styles.rowMeta}>{report.meta}</Text></View><Text style={styles.chevron}>›</Text></Card>)}
    </ScrollView>
  );
}

function ReportScreen() {
  const [category, setCategory] = useState<ReportCategory>('pollution');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  async function submit() {
    if (!title.trim() || !location.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập mô tả và vị trí trước khi gửi.');
      return;
    }
    const { error } = await createReport({ category, title: title.trim(), location: location.trim() });
    if (error) {
      Alert.alert('Chưa thể gửi báo cáo', error.message);
      return;
    }
    Alert.alert('Đã gửi báo cáo', 'Cảm ơn bạn đã giúp bảo vệ đại dương.');
    setTitle('');
    setLocation('');
  }

  if (scannerOpen) {
    return <View style={styles.scanner}><CameraView style={StyleSheet.absoluteFill} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={({ data }) => { setScannerOpen(false); setLocation(data); }} /><View style={styles.scannerOverlay}><Text style={styles.scannerTitle}>Quét mã QR địa điểm</Text><View style={styles.scanFrame} /><Pressable style={styles.secondaryButton} onPress={() => setScannerOpen(false)}><Text style={styles.secondaryButtonText}>Đóng</Text></Pressable></View></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Header title="Báo cáo vấn đề" subtitle="Mỗi báo cáo là một bước tiến cho đại dương." />
      <Text style={styles.fieldLabel}>Loại vấn đề</Text>
      <View style={styles.chips}>{(['pollution', 'animal', 'recycle'] as ReportCategory[]).map((value) => <Pressable key={value} onPress={() => setCategory(value)}><Pill active={category === value} text={value === 'pollution' ? 'Ô nhiễm' : value === 'animal' ? 'Động vật' : 'Tái chế'} /></Pressable>)}</View>
      <Text style={styles.fieldLabel}>Mô tả vấn đề</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Bạn nhìn thấy điều gì?" placeholderTextColor={palette.muted} style={[styles.input, styles.multiline]} multiline />
      <Text style={styles.fieldLabel}>Vị trí</Text>
      <View style={styles.inputWithAction}><TextInput value={location} onChangeText={setLocation} placeholder="Nhập vị trí hoặc quét QR" placeholderTextColor={palette.muted} style={styles.inputInline} /><Pressable onPress={async () => { if (!permission?.granted) { const result = await requestPermission(); if (!result.granted) return; } setScannerOpen(true); }}><Text style={styles.scanText}>Quét</Text></Pressable></View>
      <Card style={styles.upload}><Text style={styles.uploadIcon}>＋</Text><Text style={styles.rowTitle}>Thêm hình ảnh</Text><Text style={styles.rowMeta}>Tối đa 5 ảnh • JPG, PNG</Text></Card>
      <Pressable style={styles.primaryButton} onPress={submit}><Text style={styles.primaryButtonText}>Gửi báo cáo</Text></Pressable>
      <Text style={styles.helper}>Bạn có thể theo dõi tiến độ xử lý trong mục Lịch sử.</Text>
    </ScrollView>
  );
}

function EventsScreen() {
  const [joined, setJoined] = useState<string[]>([]);
  const [remoteEvents, setRemoteEvents] = useState<OceanEvent[]>([]);
  useEffect(() => {
    loadEvents().then(({ data }) => {
      if (data) setRemoteEvents(data);
    });
  }, []);
  const displayedEvents = remoteEvents.length ? remoteEvents.map((event) => ({ title: event.title, date: new Date(event.event_date).toLocaleDateString('vi-VN'), place: event.location, people: `${event.capacity} chỗ` })) : events;
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Header title="Sự kiện cộng đồng" subtitle="Cùng hành động, cùng tạo thay đổi." /><View style={styles.chips}><Pill text="Tất cả" active /><Pill text="Gần bạn" /><Pill text="Cuối tuần" /></View>{displayedEvents.map((event) => <Card key={event.title} style={styles.eventCard}><View style={styles.eventImage}><Text style={styles.eventWave}>≈</Text></View><Text style={styles.eventDate}>{event.date}</Text><Text style={styles.eventTitle}>{event.title}</Text><Text style={styles.rowMeta}>{event.place}</Text><View style={styles.eventFooter}><Text style={styles.rowMeta}>{event.people}</Text><Pressable style={styles.smallButton} onPress={() => setJoined((current) => current.includes(event.title) ? current.filter((item) => item !== event.title) : [...current, event.title])}><Text style={styles.smallButtonText}>{joined.includes(event.title) ? 'Đã tham gia' : 'Tham gia'}</Text></Pressable></View></Card>)}</ScrollView>;
}

function DataScreen() {
  const stats = useMemo(() => [{ label: 'Rác nhựa', value: '42%', color: '#087EA4' }, { label: 'Rác hữu cơ', value: '31%', color: '#45B39D' }, { label: 'Khác', value: '27%', color: '#FFB26B' }], []);
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  useEffect(() => {
    loadImpactMetrics().then(({ data }) => {
      if (data) setMetrics(data);
    });
  }, []);
  const chartMetrics = metrics.slice(-7);
  const total = chartMetrics.reduce((sum, metric) => sum + Number(metric.total_kg), 0);
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Header title="Dữ liệu đại dương" subtitle="Minh bạch để cùng tạo tác động lớn hơn." /><Card style={styles.chartCard}><Text style={styles.cardLabel}>TỔNG RÁC THẢI GHI NHẬN</Text><Text style={styles.chartValue}>{(total || 2846).toLocaleString('vi-VN')} kg</Text><Text style={styles.positive}>↑ 18.4% so với tháng trước</Text><View style={styles.bars}>{(chartMetrics.length ? chartMetrics.map((metric) => Number(metric.total_kg)) : [32, 54, 46, 70, 58, 84, 74]).map((value, index, values) => <View key={index} style={styles.barGroup}><View style={[styles.bar, { height: Math.max(20, (value / Math.max(...values)) * 84) }]} /><Text style={styles.barLabel}>{chartMetrics.length ? new Date(chartMetrics[index].metric_date).toLocaleDateString('vi-VN', { weekday: 'short' }) : ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][index]}</Text></View>)}</View></Card><Text style={styles.sectionTitle}>Thành phần rác thải</Text>{stats.map((stat) => <View key={stat.label} style={styles.metric}><View style={[styles.metricDot, { backgroundColor: stat.color }]} /><Text style={styles.flex}>{stat.label}</Text><Text style={styles.metricValue}>{stat.value}</Text></View>)}<Pressable style={styles.outlineButton}><Text style={styles.outlineButtonText}>Xem phân tích chi tiết</Text></Pressable></ScrollView>;
}

function ProfileScreen({ onOpenCatalog, onOpenAuth }: { onOpenCatalog: () => void; onOpenAuth: () => void }) {
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Header title="Hồ sơ của bạn" subtitle="Mỗi hành động nhỏ đều được ghi nhận." /><Card style={styles.profileCard}><View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>OH</Text></View><Text style={styles.profileName}>Hoàng Nguyễn</Text><Text style={styles.rowMeta}>Thành viên từ tháng 03.2025</Text><View style={styles.levelRow}><Pill text="Cấp 4 • Ocean Guardian" active /><Text style={styles.points}>1,280 điểm</Text></View></Card><Pressable style={styles.authButton} onPress={onOpenAuth}><Text style={styles.authButtonTitle}>Đăng nhập để đồng bộ dữ liệu</Text><Text style={styles.authButtonText}>Lưu báo cáo, điểm và lịch sử hoạt động</Text><Text style={styles.chevron}>›</Text></Pressable><Pressable style={styles.flowButton} onPress={onOpenCatalog}><Text style={styles.flowButtonTitle}>Khám phá 116 màn hình</Text><Text style={styles.flowButtonText}>Mở toàn bộ High-Fidelity flows</Text><Text style={styles.chevron}>›</Text></Pressable><View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Huy hiệu của bạn</Text><Text style={styles.link}>Xem tất cả</Text></View><View style={styles.badges}>{['🌊', '♻️', '🐢', '🤝'].map((badge) => <View key={badge} style={styles.badge}><Text style={styles.badgeIcon}>{badge}</Text></View>)}</View>{['Lịch sử hoạt động', 'Chứng nhận đóng góp', 'Cài đặt tài khoản'].map((item) => <Pressable key={item} style={styles.menuRow}><Text style={styles.rowTitle}>{item}</Text><Text style={styles.chevron}>›</Text></Pressable>)}</ScrollView>;
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [flowCatalogOpen, setFlowCatalogOpen] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<ScreenDefinition | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const screen = authOpen ? <AuthScreen onBack={() => setAuthOpen(false)} /> : overlay === 'history' ? <ReportHistoryScreen onBack={() => setOverlay(null)} /> : overlay === 'notifications' ? <NotificationInboxScreen onBack={() => setOverlay(null)} /> : selectedFlow ? <FlowDetailScreen screen={selectedFlow} onBack={() => setSelectedFlow(null)} /> : flowCatalogOpen ? <ScreenCatalogScreen onOpen={setSelectedFlow} /> : tab === 'home' ? <HomeScreen goTo={setTab} openOverlay={(next) => setOverlay(next)} /> : tab === 'report' ? <ReportEntryFlow /> : tab === 'events' ? <EventsScreen /> : tab === 'data' ? <DataScreen /> : <ProfileScreen onOpenCatalog={() => setFlowCatalogOpen(true)} onOpenAuth={() => setAuthOpen(true)} />;
  return <SafeAreaView style={styles.safe}><StatusBar style="dark" />{screen}<View style={styles.tabBar}>{([['home', '⌂', 'Trang chủ'], ['report', '＋', 'Báo cáo'], ['events', '◉', 'Sự kiện'], ['data', '▥', 'Dữ liệu'], ['profile', '○', 'Hồ sơ']] as const).map(([key, icon, label]) => <Pressable key={key} style={styles.tab} onPress={() => setTab(key)}><Text style={[styles.tabIcon, tab === key && styles.tabActive]}>{icon}</Text><Text style={[styles.tabLabel, tab === key && styles.tabActive]}>{label}</Text></Pressable>)}</View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7FBFC' },
  content: { padding: 20, paddingBottom: 120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  headerActions: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  eyebrow: { color: palette.blue, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8 },
  heading: { color: palette.navy, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: palette.muted, fontSize: 14, marginTop: 7, maxWidth: 290, lineHeight: 20 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: palette.aqua, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: palette.navy, fontWeight: '800' },
  notificationButton: { alignItems: 'center', backgroundColor: palette.white, borderColor: palette.line, borderRadius: 22, borderWidth: 1, height: 44, justifyContent: 'center', width: 44 },
  notificationText: { color: palette.blue, fontSize: 20 },
  card: { backgroundColor: palette.white, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: palette.line, marginBottom: 12 },
  impactCard: { backgroundColor: palette.navy, borderColor: palette.navy, marginBottom: 28 },
  impactTop: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLabel: { color: '#A8C5D0', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  impactIcon: { color: '#7EE1D1', fontSize: 20 },
  impactValue: { color: palette.white, fontSize: 36, fontWeight: '800', marginTop: 12 },
  impactCaption: { color: '#C4D8DF', fontSize: 13, marginTop: 4 },
  progress: { backgroundColor: '#31536A', height: 8, borderRadius: 4, marginTop: 22, overflow: 'hidden' },
  progressFill: { backgroundColor: '#7EE1D1', height: 8, borderRadius: 4 },
  progressLabel: { color: '#C4D8DF', fontSize: 12, marginTop: 9 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  sectionTitle: { color: palette.navy, fontSize: 18, fontWeight: '800' },
  link: { color: palette.blue, fontSize: 13, fontWeight: '700' },
  quickGrid: { flexDirection: 'row', gap: 12, marginBottom: 26 },
  quick: { flex: 1, padding: 16, borderRadius: 18, minHeight: 136 },
  quickIcon: { color: palette.navy, fontSize: 26, marginBottom: 16 },
  quickTitle: { color: palette.navy, fontSize: 15, fontWeight: '800' },
  quickMeta: { color: palette.muted, fontSize: 11, marginTop: 5, lineHeight: 15 },
  reportRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  reportDot: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  flex: { flex: 1 },
  rowTitle: { color: palette.ink, fontSize: 14, fontWeight: '700' },
  rowMeta: { color: palette.muted, fontSize: 12, marginTop: 5 },
  chevron: { color: palette.blue, fontSize: 26, paddingLeft: 8 },
  fieldLabel: { color: palette.ink, fontSize: 14, fontWeight: '800', marginBottom: 9, marginTop: 8 },
  chips: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  pill: { borderWidth: 1, borderColor: palette.line, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9, backgroundColor: palette.white },
  pillActive: { backgroundColor: palette.navy, borderColor: palette.navy },
  pillText: { color: palette.muted, fontSize: 12, fontWeight: '700' },
  pillTextActive: { color: palette.white },
  input: { borderWidth: 1, borderColor: palette.line, backgroundColor: palette.white, borderRadius: 14, padding: 14, color: palette.ink, fontSize: 14 },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  inputWithAction: { borderWidth: 1, borderColor: palette.line, backgroundColor: palette.white, borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingLeft: 14 },
  inputInline: { flex: 1, paddingVertical: 14, color: palette.ink, fontSize: 14 },
  scanText: { color: palette.blue, fontWeight: '800', padding: 14 },
  upload: { alignItems: 'center', borderStyle: 'dashed', paddingVertical: 24, marginTop: 22 },
  uploadIcon: { color: palette.blue, fontSize: 28, marginBottom: 6 },
  primaryButton: { backgroundColor: palette.blue, borderRadius: 15, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  primaryButtonText: { color: palette.white, fontWeight: '800', fontSize: 15 },
  helper: { textAlign: 'center', color: palette.muted, fontSize: 12, marginTop: 12 },
  scanner: { flex: 1, backgroundColor: '#000' },
  scannerOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', padding: 20 },
  scannerTitle: { color: palette.white, fontSize: 20, fontWeight: '800', marginBottom: 30 },
  scanFrame: { width: 250, height: 250, borderWidth: 2, borderColor: '#7EE1D1', borderRadius: 24, marginBottom: 35 },
  secondaryButton: { backgroundColor: palette.white, paddingHorizontal: 28, paddingVertical: 13, borderRadius: 20 },
  secondaryButtonText: { color: palette.navy, fontWeight: '800' },
  eventCard: { padding: 12 },
  eventImage: { height: 130, borderRadius: 14, backgroundColor: '#BCEEF0', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  eventWave: { color: '#087EA4', fontSize: 72, fontWeight: '200' },
  eventDate: { color: palette.blue, fontSize: 12, fontWeight: '800', marginBottom: 7 },
  eventTitle: { color: palette.navy, fontSize: 18, fontWeight: '800' },
  eventFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  smallButton: { backgroundColor: palette.navy, borderRadius: 14, paddingHorizontal: 15, paddingVertical: 9 },
  smallButtonText: { color: palette.white, fontSize: 12, fontWeight: '800' },
  chartCard: { marginBottom: 22 },
  chartValue: { color: palette.navy, fontSize: 32, fontWeight: '800', marginTop: 10 },
  positive: { color: '#299B78', fontSize: 12, marginTop: 4 },
  bars: { height: 120, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 8 },
  barGroup: { alignItems: 'center', gap: 7 },
  bar: { width: 20, borderRadius: 6, backgroundColor: '#8DDCD2' },
  barLabel: { color: palette.muted, fontSize: 10 },
  metric: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: palette.line },
  metricDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  metricValue: { color: palette.navy, fontWeight: '800' },
  outlineButton: { borderWidth: 1, borderColor: palette.blue, borderRadius: 15, paddingVertical: 14, alignItems: 'center', marginTop: 22 },
  outlineButtonText: { color: palette.blue, fontWeight: '800' },
  profileCard: { alignItems: 'center', paddingVertical: 25 },
  profileAvatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: palette.aqua, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  profileAvatarText: { color: palette.navy, fontSize: 20, fontWeight: '800' },
  profileName: { color: palette.navy, fontSize: 20, fontWeight: '800' },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 17 },
  points: { color: palette.blue, fontWeight: '800', fontSize: 12 },
  badges: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  badge: { flex: 1, height: 72, borderRadius: 18, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, alignItems: 'center', justifyContent: 'center' },
  badgeIcon: { fontSize: 28 },
  menuRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: palette.line, paddingVertical: 18 },
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: palette.white, borderTopWidth: 1, borderTopColor: palette.line, flexDirection: 'row', paddingTop: 10, paddingBottom: 10 },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  tabIcon: { color: palette.muted, fontSize: 22 },
  tabLabel: { color: palette.muted, fontSize: 10, fontWeight: '700' },
  tabActive: { color: palette.blue },
  flowButton: { backgroundColor: '#E8FAF7', borderColor: '#B9F2F4', borderRadius: 18, borderWidth: 1, marginBottom: 22, padding: 16 },
  flowButtonTitle: { color: palette.navy, fontSize: 15, fontWeight: '800' },
  flowButtonText: { color: palette.muted, fontSize: 12, marginTop: 5 },
  authButton: { backgroundColor: '#EAF2FF', borderColor: '#C9DFFF', borderRadius: 18, borderWidth: 1, marginBottom: 12, padding: 16 },
  authButtonTitle: { color: palette.navy, fontSize: 15, fontWeight: '800' },
  authButtonText: { color: palette.muted, fontSize: 12, marginTop: 5 }
});
