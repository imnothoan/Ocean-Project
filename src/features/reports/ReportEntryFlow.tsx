import { useRef, useState } from 'react';
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
import { CameraView } from 'expo-camera';
import { submitReportWithEvidence, type ReportCategory } from '../../lib/supabase';
import { colors, radii, spacing, typography } from '../../theme/tokens';

type Step = 'type' | 'photo' | 'location' | 'details' | 'review' | 'submitted';

const categories: Array<{ value: ReportCategory; label: string; description: string }> = [
  { value: 'pollution', label: 'Ô nhiễm', description: 'Rác thải, nước bẩn hoặc tác động môi trường.' },
  { value: 'animal', label: 'Động vật biển', description: 'Sinh vật cần hỗ trợ hoặc có dấu hiệu nguy hiểm.' },
  { value: 'recycle', label: 'Tái chế', description: 'Điểm thu gom hoặc cơ hội tái chế trong cộng đồng.' }
];

export function ReportEntryFlow() {
  const [step, setStep] = useState<Step>('type');
  const [category, setCategory] = useState<ReportCategory>('pollution');
  const [title, setTitle] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [wasteType, setWasteType] = useState('Nhựa');
  const [details, setDetails] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const camera = useRef<CameraView>(null);

  function nextFromType() {
    if (!title.trim()) {
      Alert.alert('Thiếu mô tả', 'Hãy mô tả ngắn gọn điều bạn quan sát được.');
      return;
    }
    setStep('photo');
  }

  async function capturePhoto() {
    const result = await camera.current?.takePictureAsync({ quality: 0.7, skipProcessing: true });
    if (!result?.uri) {
      Alert.alert('Chưa chụp được ảnh', 'Hãy thử lại khi camera đã sẵn sàng.');
      return;
    }
    setPhotoUri(result.uri);
    setStep('location');
  }

  async function submit() {
    if (!location.trim()) {
      Alert.alert('Thiếu vị trí', 'Nhập vị trí hoặc quét QR trước khi gửi.');
      return;
    }
    setBusy(true);
    const reportTitle = details.trim() ? `${title.trim()} — ${details.trim()}` : title.trim();
    const { error } = await submitReportWithEvidence({ category, title: `${severity === 'high' ? '[Khẩn cấp] ' : ''}${reportTitle} (${wasteType})`, location: location.trim(), photoUri });
    setBusy(false);
    if (error) {
      Alert.alert('Chưa thể gửi báo cáo', error.message);
      return;
    }
    setStep('submitted');
  }

  if (scannerOpen) {
    return <SafeAreaView style={styles.scanner}><CameraView style={StyleSheet.absoluteFill} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={({ data }) => { setLocation(data); setScannerOpen(false); }} /><View style={styles.scannerOverlay}><Text style={styles.scannerTitle}>Quét mã QR địa điểm</Text><View style={styles.scanFrame} /><Pressable style={styles.secondaryButton} onPress={() => setScannerOpen(false)}><Text style={styles.secondaryButtonText}>Đóng</Text></Pressable></View></SafeAreaView>;
  }

  const stepNumber = step === 'type' ? '1/4' : step === 'photo' ? '2/4' : step === 'location' ? '3/4' : step === 'details' ? '4/4' : '';
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><Text style={styles.eyebrow}>BÁO CÁO VẤN ĐỀ {stepNumber ? `• ${stepNumber}` : ''}</Text><Text style={styles.heading}>{step === 'type' ? 'Bạn muốn báo cáo điều gì?' : step === 'photo' ? 'Thêm ảnh hiện trường' : step === 'location' ? 'Xác định vị trí' : step === 'details' ? 'Phân loại chi tiết' : step === 'review' ? 'Kiểm tra báo cáo' : 'Báo cáo đã gửi'}</Text><Text style={styles.subtitle}>{step === 'type' ? 'Chọn đúng loại để đội xử lý có thể phản hồi nhanh hơn.' : step === 'photo' ? 'Ảnh giúp xác minh và ưu tiên xử lý báo cáo.' : step === 'location' ? 'Vị trí chính xác giúp cộng đồng tìm thấy vấn đề.' : step === 'details' ? 'Thông tin chi tiết giúp đội vận hành ưu tiên đúng cách.' : step === 'review' ? 'Kiểm tra lại thông tin trước khi gửi đến đội xử lý.' : 'Bạn có thể theo dõi tiến độ xử lý của báo cáo này.'}</Text>{step !== 'submitted' ? <Progress step={step} /> : null}{step === 'type' ? <TypeStep category={category} title={title} setCategory={setCategory} setTitle={setTitle} onNext={nextFromType} /> : null}{step === 'photo' ? <PhotoStep camera={camera} captured={Boolean(photoUri)} onCapture={capturePhoto} onSkip={() => setStep('location')} /> : null}{step === 'location' ? <LocationStep location={location} setLocation={setLocation} onScan={() => setScannerOpen(true)} onNext={() => setStep('details')} /> : null}{step === 'details' ? <DetailsStep severity={severity} wasteType={wasteType} details={details} setSeverity={setSeverity} setWasteType={setWasteType} setDetails={setDetails} onSubmit={() => setStep('review')} busy={false} /> : null}{step === 'review' ? <ReviewStep category={category} title={title} location={location} severity={severity} wasteType={wasteType} photoCaptured={Boolean(photoUri)} onConfirm={submit} busy={busy} /> : null}{step === 'submitted' ? <SubmittedStep onReset={() => { setStep('type'); setTitle(''); setLocation(''); setDetails(''); setPhotoUri(undefined); }} /> : null}</ScrollView></SafeAreaView>;
}

function Progress({ step }: { step: Step }) {
  const active = step === 'type' ? 1 : step === 'photo' ? 2 : step === 'location' ? 3 : 4;
  return <View style={styles.progress}>{[1, 2, 3, 4].map((item) => <View key={item} style={styles.progressItem}><View style={[styles.progressDot, item <= active && styles.progressActive]}><Text style={styles.progressNumber}>{item}</Text></View>{item < 4 ? <View style={[styles.progressLine, item < active && styles.progressActive]} /> : null}</View>)}</View>;
}

function TypeStep({ category, title, setCategory, setTitle, onNext }: { category: ReportCategory; title: string; setCategory: (value: ReportCategory) => void; setTitle: (value: string) => void; onNext: () => void }) {
  return <View>{categories.map((item) => <Pressable key={item.value} style={[styles.choice, category === item.value && styles.choiceActive]} onPress={() => setCategory(item.value)}><View style={[styles.choiceIcon, category === item.value && styles.choiceIconActive]}><Text>{item.value === 'pollution' ? '♒' : item.value === 'animal' ? '🐢' : '♻️'}</Text></View><View style={styles.flex}><Text style={styles.choiceTitle}>{item.label}</Text><Text style={styles.choiceDescription}>{item.description}</Text></View><Text style={styles.radio}>{category === item.value ? '●' : '○'}</Text></Pressable>)}<Text style={styles.label}>MÔ TẢ NGẮN</Text><TextInput value={title} onChangeText={setTitle} placeholder="Bạn nhìn thấy điều gì?" placeholderTextColor={colors.muted} style={[styles.input, styles.multiline]} multiline /><PrimaryButton label="Tiếp tục" onPress={onNext} /></View>;
}

function PhotoStep({ camera, captured, onCapture, onSkip }: { camera: React.RefObject<CameraView | null>; captured: boolean; onCapture: () => void; onSkip: () => void }) {
  return <View>{captured ? <View style={styles.photoSuccess}><Text style={styles.successIcon}>✓</Text><Text style={styles.cardTitle}>Ảnh đã được ghi nhận</Text><Text style={styles.cardText}>Bạn có thể tiếp tục xác định vị trí.</Text></View> : <View style={styles.cameraCard}><CameraView ref={camera} style={styles.cameraPreview} facing="back" /><View style={styles.cameraControls}><Pressable style={styles.captureButton} onPress={onCapture}><View style={styles.captureInner} /></Pressable></View></View>}<Pressable style={styles.skipButton} onPress={onSkip}><Text style={styles.skipText}>{captured ? 'Tiếp tục' : 'Bỏ qua ảnh'}</Text></Pressable></View>;
}

function LocationStep({ location, setLocation, onScan, onNext }: { location: string; setLocation: (value: string) => void; onScan: () => void; onNext: () => void }) {
  return <View><View style={styles.locationCard}><Text style={styles.locationIcon}>⌖</Text><Text style={styles.cardTitle}>Vị trí báo cáo</Text><Text style={styles.cardText}>Nhập địa điểm dễ nhận biết hoặc quét QR tại điểm được đánh dấu.</Text></View><Text style={styles.label}>ĐỊA ĐIỂM</Text><View style={styles.locationInput}><TextInput value={location} onChangeText={setLocation} placeholder="Ví dụ: Cầu cảng Cát Bà" placeholderTextColor={colors.muted} style={styles.inputInline} /><Pressable onPress={onScan}><Text style={styles.scanText}>Quét QR</Text></Pressable></View><PrimaryButton label="Tiếp tục" onPress={() => location.trim() ? onNext() : Alert.alert('Thiếu vị trí', 'Nhập vị trí hoặc quét QR trước khi tiếp tục.')} /></View>;
}

function DetailsStep({ severity, wasteType, details, setSeverity, setWasteType, setDetails, onSubmit, busy }: { severity: 'low' | 'medium' | 'high'; wasteType: string; details: string; setSeverity: (value: 'low' | 'medium' | 'high') => void; setWasteType: (value: string) => void; setDetails: (value: string) => void; onSubmit: () => void; busy: boolean }) {
  return <View><Text style={styles.label}>MỨC ĐỘ ẢNH HƯỞNG</Text><View style={styles.chips}>{(['low', 'medium', 'high'] as const).map((value) => <Pressable key={value} style={[styles.chip, severity === value && styles.chipActive]} onPress={() => setSeverity(value)}><Text style={[styles.chipText, severity === value && styles.chipTextActive]}>{value === 'low' ? 'Thấp' : value === 'medium' ? 'Trung bình' : 'Cao'}</Text></Pressable>)}</View><Text style={styles.label}>LOẠI RÁC THẢI</Text><View style={styles.chips}>{['Nhựa', 'Kim loại', 'Hữu cơ', 'Khác'].map((value) => <Pressable key={value} style={[styles.chip, wasteType === value && styles.chipActive]} onPress={() => setWasteType(value)}><Text style={[styles.chipText, wasteType === value && styles.chipTextActive]}>{value}</Text></Pressable>)}</View><Text style={styles.label}>CHI TIẾT BỔ SUNG</Text><TextInput value={details} onChangeText={setDetails} placeholder="Mô tả thêm nếu cần..." placeholderTextColor={colors.muted} multiline style={[styles.input, styles.multiline]} /><PrimaryButton label={busy ? 'Đang gửi...' : 'Gửi báo cáo'} onPress={onSubmit} disabled={busy} /></View>;
}

function ReviewStep({ category, title, location, severity, wasteType, photoCaptured, onConfirm, busy }: { category: ReportCategory; title: string; location: string; severity: string; wasteType: string; photoCaptured: boolean; onConfirm: () => void; busy: boolean }) {
  return <View><View style={styles.reviewCard}>{[['Loại', category === 'pollution' ? 'Ô nhiễm' : category === 'animal' ? 'Động vật biển' : 'Tái chế'], ['Mô tả', title], ['Vị trí', location], ['Mức độ', severity === 'high' ? 'Cao' : severity === 'medium' ? 'Trung bình' : 'Thấp'], ['Loại rác', wasteType], ['Ảnh', photoCaptured ? 'Đã thêm' : 'Không có']].map(([label, value]) => <View key={label} style={styles.reviewRow}><Text style={styles.reviewLabel}>{label}</Text><Text style={styles.reviewValue}>{value}</Text></View>)}</View><PrimaryButton label={busy ? 'Đang gửi...' : 'Xác nhận và gửi'} onPress={onConfirm} disabled={busy} /></View>;
}

function SubmittedStep({ onReset }: { onReset: () => void }) {
  return <View><View style={styles.submittedCard}><Text style={styles.successIcon}>✓</Text><Text style={styles.cardTitle}>Đã gửi báo cáo</Text><Text style={styles.cardText}>Đội Ocean Project đã tiếp nhận thông tin của bạn.</Text></View><View style={styles.tracker}><Text style={styles.trackerTitle}>TIẾN ĐỘ XỬ LÝ</Text>{['Đã gửi', 'Đang xem xét', 'Đã xử lý'].map((status, index) => <View key={status} style={styles.trackerRow}><View style={[styles.trackerDot, index === 0 && styles.progressActive]} /><Text style={styles.trackerText}>{status}</Text>{index === 0 ? <Text style={styles.trackerCurrent}>Hiện tại</Text> : null}</View>)}</View><Pressable style={styles.skipButton} onPress={onReset}><Text style={styles.skipText}>Tạo báo cáo mới</Text></Pressable></View>;
}

function PrimaryButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return <Pressable disabled={disabled} style={[styles.primaryButton, disabled && styles.disabled]} onPress={onPress}><Text style={styles.primaryButtonText}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#F7FBFC', flex: 1 },
  content: { padding: spacing.xl, paddingBottom: 80 },
  eyebrow: { color: colors.blue, ...typography.eyebrow, marginBottom: spacing.sm },
  heading: { color: colors.navy, ...typography.title },
  subtitle: { color: colors.muted, ...typography.body, marginBottom: spacing.xl, marginTop: spacing.sm },
  progress: { alignItems: 'center', flexDirection: 'row', marginBottom: spacing.xxl },
  progressItem: { alignItems: 'center', flex: 1, flexDirection: 'row' },
  progressDot: { alignItems: 'center', backgroundColor: colors.line, borderRadius: 15, height: 30, justifyContent: 'center', width: 30 },
  progressActive: { backgroundColor: colors.blue },
  progressNumber: { color: colors.white, fontSize: 12, fontWeight: '800' },
  progressLine: { backgroundColor: colors.line, flex: 1, height: 2 },
  choice: { alignItems: 'center', backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.lg, borderWidth: 1, flexDirection: 'row', marginBottom: spacing.md, padding: spacing.md },
  choiceActive: { backgroundColor: colors.mint, borderColor: colors.aqua },
  choiceIcon: { alignItems: 'center', backgroundColor: colors.mint, borderRadius: radii.md, height: 44, justifyContent: 'center', marginRight: spacing.md, width: 44 },
  choiceIconActive: { backgroundColor: colors.aqua },
  choiceTitle: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  choiceDescription: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 3 },
  flex: { flex: 1 },
  radio: { color: colors.blue, fontSize: 20, marginLeft: spacing.sm },
  label: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: spacing.sm, marginTop: spacing.md },
  input: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.md, borderWidth: 1, color: colors.ink, padding: spacing.md },
  multiline: { minHeight: 96, textAlignVertical: 'top' },
  primaryButton: { alignItems: 'center', backgroundColor: colors.blue, borderRadius: radii.md, marginTop: spacing.xl, minHeight: 52, justifyContent: 'center' },
  primaryButtonText: { color: colors.white, fontSize: 15, fontWeight: '800' },
  disabled: { opacity: 0.55 },
  cameraCard: { backgroundColor: colors.navy, borderRadius: radii.xl, overflow: 'hidden' },
  cameraPreview: { height: 330 },
  cameraControls: { alignItems: 'center', padding: spacing.xl },
  captureButton: { alignItems: 'center', backgroundColor: colors.white, borderColor: colors.aqua, borderRadius: 36, borderWidth: 4, height: 72, justifyContent: 'center', width: 72 },
  captureInner: { backgroundColor: colors.coral, borderRadius: 27, height: 54, width: 54 },
  skipButton: { alignItems: 'center', padding: spacing.xl },
  skipText: { color: colors.blue, fontSize: 14, fontWeight: '800' },
  photoSuccess: { alignItems: 'center', backgroundColor: colors.mint, borderRadius: radii.xl, padding: spacing.xxxl },
  successIcon: { color: colors.positive, fontSize: 46, fontWeight: '800' },
  cardTitle: { color: colors.navy, fontSize: 18, fontWeight: '800', marginTop: spacing.md },
  cardText: { color: colors.muted, ...typography.caption, marginTop: spacing.sm, textAlign: 'center' },
  locationCard: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: radii.xl, padding: spacing.xxl },
  locationIcon: { color: colors.blue, fontSize: 42 },
  locationInput: { alignItems: 'center', backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.md, borderWidth: 1, flexDirection: 'row', paddingLeft: spacing.md },
  inputInline: { color: colors.ink, flex: 1, paddingVertical: spacing.md },
  scanText: { color: colors.blue, fontSize: 12, fontWeight: '800', padding: spacing.md },
  scanner: { backgroundColor: '#000', flex: 1 },
  scannerOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  scannerTitle: { color: colors.white, fontSize: 20, fontWeight: '800', marginBottom: spacing.xxl },
  scanFrame: { borderColor: colors.aqua, borderRadius: radii.xl, borderWidth: 2, height: 250, marginBottom: spacing.xxxl, width: 250 },
  secondaryButton: { backgroundColor: colors.white, borderRadius: radii.pill, paddingHorizontal: spacing.xxl, paddingVertical: spacing.md },
  secondaryButtonText: { color: colors.navy, fontWeight: '800' }
  ,chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.pill, borderWidth: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  chipActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  chipText: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  chipTextActive: { color: colors.white }
  ,reviewCard: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.xl, borderWidth: 1, padding: spacing.lg },
  reviewRow: { borderBottomColor: colors.line, borderBottomWidth: 1, paddingVertical: spacing.md },
  reviewLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  reviewValue: { color: colors.ink, fontSize: 14, fontWeight: '700', marginTop: spacing.xs },
  submittedCard: { alignItems: 'center', backgroundColor: colors.mint, borderRadius: radii.xl, padding: spacing.xxxl },
  tracker: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.xl, borderWidth: 1, marginTop: spacing.lg, padding: spacing.lg },
  trackerTitle: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  trackerRow: { alignItems: 'center', flexDirection: 'row', marginTop: spacing.lg },
  trackerDot: { backgroundColor: colors.line, borderRadius: 6, height: 12, marginRight: spacing.md, width: 12 },
  trackerText: { color: colors.ink, flex: 1, fontSize: 14, fontWeight: '700' },
  trackerCurrent: { color: colors.positive, fontSize: 12, fontWeight: '800' }
});
