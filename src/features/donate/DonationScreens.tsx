import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createDonation } from '../../lib/supabase';
import { colors, radii, spacing } from '../../theme/tokens';

const campaignImage = require('../../../assets/community/cleanup-beach.png');

type Props = { onBack: () => void };
type DonationDraft = { amount: number; anonymous: boolean; message: string };

export function DonationFlowRoot({ onBack, initial = 'campaigns' }: Props & { initial?: 'campaigns' | 'detail' | 'donate' | 'payment' | 'confirm' | 'success' | 'updates' | 'impact' | 'history' | 'certificate' }) {
  const [screen, setScreen] = useState<'campaigns' | 'detail' | 'donate' | 'payment' | 'confirm' | 'success' | 'updates' | 'impact' | 'history' | 'certificate'>(initial);
  const [draft, setDraft] = useState<DonationDraft>({ amount: 2, anonymous: false, message: '' });
  if (screen === 'detail') return <CampaignDetailScreen onBack={() => setScreen('campaigns')} onDonate={() => setScreen('donate')} />;
  if (screen === 'donate') return <DonateScreen onBack={() => setScreen('detail')} onContinue={(nextDraft) => { setDraft(nextDraft); setScreen('payment'); }} />;
  if (screen === 'payment') return <PaymentMethodScreen amount={draft.amount} onBack={() => setScreen('donate')} onContinue={() => setScreen('confirm')} />;
  if (screen === 'confirm') return <DonationConfirmationScreen draft={draft} onBack={() => setScreen('payment')} onConfirm={async () => { const result = await createDonation(draft.anonymous ? 'Anonymous' : 'Ocean Guardian', draft.amount, 'Protect Phu Quoc Coral Reef', draft.message); if (result.error) { Alert.alert('Donation failed', result.error.message); return; } setScreen('success'); }} />;
  if (screen === 'success') return <DonationSuccessScreen onBack={() => setScreen('campaigns')} onViewCertificate={() => setScreen('certificate')} />;
  if (screen === 'updates') return <CampaignUpdatesScreen onBack={() => setScreen('detail')} />;
  if (screen === 'impact') return <ImpactReportScreen onBack={() => setScreen('campaigns')} />;
  if (screen === 'history') return <DonationHistoryScreen onBack={() => setScreen('campaigns')} />;
  if (screen === 'certificate') return <DonationCertificateScreen onBack={() => setScreen('success')} />;
  return <CampaignsScreen onBack={onBack} onOpenCampaign={() => setScreen('detail')} />;
}

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={styles.topBar}>
      <Pressable onPress={onBack} style={styles.backButton} accessibilityLabel="Go back">
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <View style={styles.topTitle}><Text style={styles.topTitleText}>{title}</Text></View>
    </View>
  );
}

function Progress({ percent = 72 }: { percent?: number }) {
  return (
    <View style={styles.progressCard}>
      <Text style={styles.progressText}><Text style={styles.bold}>{percent}% Raised</Text> / <Text style={styles.bold}>$14,400</Text> of $20,000 Goal</Text>
      <View style={styles.track}><View style={[styles.fill, { width: `${percent}%` }]} /><Text style={styles.percent}>{percent}%</Text></View>
      <View style={styles.rowBetween}><Text style={styles.meta}>542 Supporters</Text><Text style={styles.meta}>12 days left</Text></View>
    </View>
  );
}

export function CampaignsScreen({ onBack, onOpenCampaign }: Props & { onOpenCampaign: () => void }) {
  const campaigns = [
    ['Reefs & Urgent', 'Protect Phu Quoc Coral Reef', 'by XXX Vietnam', '72%', '$14,400 of $20,000', '12 days left'],
    ['Cleanup', 'Nha Trang Coastline Cleanup', 'by Nha Trang XX-Group', '45%', '$4,500 of $10,000', '24 days left'],
    ['Wildlife', 'Save Coastal Sea Turtle', 'by Wildlife Rescue Vietnam', '100%', '$15,000 of $15,000', 'Done']
  ];
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TopBar title="Donate Campaigns" onBack={onBack} />
      <TextInput placeholder="⌕  Search coastlines..." placeholderTextColor={colors.muted} style={styles.search} />
      <View style={styles.chips}>{['All', 'Cleanups', 'Wildlife', 'Reefs'].map((item, index) => <Pressable key={item} style={[styles.chip, index === 0 && styles.chipActive]}><Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{item}</Text></Pressable>)}</View>
      {campaigns.map(([category, title, owner, percent, amount, remaining], index) => (
        <Pressable key={title} onPress={onOpenCampaign} style={styles.campaignCard}>
          <Image source={campaignImage} style={styles.campaignImage} />
          <View style={styles.campaignCopy}>
            <Text style={styles.meta}>{category}</Text>
            <Text style={styles.campaignTitle}>{title}</Text>
            <Text style={styles.owner}>{owner}</Text>
            <View style={styles.smallTrack}><View style={[styles.smallFill, { width: `${Number.parseInt(percent, 10)}%` as `${number}%` }]} /><Text style={styles.smallPercent}>{percent}</Text></View>
            <Text style={styles.owner}>{amount}</Text>
            <Text style={styles.owner}>{remaining}</Text>
          </View>
          {index === 2 && <Text style={styles.impactLink}>Impact</Text>}
        </Pressable>
      ))}
    </ScrollView>
  );
}

export function CampaignDetailScreen({ onBack, onDonate }: Props & { onDonate: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TopBar title="Campaign Detail" onBack={onBack} />
      <View style={styles.detailCard}><Image source={campaignImage} style={styles.detailImage} /><View style={styles.detailCopy}><Text style={styles.meta}>Reefs & Urgent</Text><Text style={styles.detailTitle}>Protect Phu Quoc Coral Reef</Text><Text style={styles.owner}>by XXX Vietnam</Text></View></View>
      <Progress />
      <View style={styles.slogan}><View style={styles.circle}><Text style={styles.circleText}>$</Text></View><View><Text style={styles.sloganTitle}>Every $2 removes kg of waste & restores coral</Text><Text style={styles.owner}>$2.00  ➜  5kg Trash Removal</Text></View></View>
      <View style={styles.about}><View style={styles.rowBetween}><Text style={styles.aboutTitle}>About Campaign</Text><Text style={styles.impactLink}>List of supporters</Text></View><Text style={styles.aboutText}>Phu Quoc's coral reefs are facing severe threats from marine debris and discarded nets. Funds will go directly to dive teams clearing debris and replanting coral nurseries...</Text></View>
      <Pressable onPress={onDonate} style={styles.primaryButton}><Text style={styles.primaryText}>Donate Now</Text></Pressable>
    </ScrollView>
  );
}

export function DonateScreen({ onBack, onContinue }: Props & { onContinue: (draft: DonationDraft) => void }) {
  const [amount, setAmount] = useState('2');
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  function submit(): boolean {
    const numeric = Number(amount);
    if (!Number.isFinite(numeric) || numeric <= 0) {
      Alert.alert('Invalid amount', 'Choose or enter a donation amount.');
      return false;
    }
    return true;
  }
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TopBar title="Donate" onBack={onBack} />
      <Text style={styles.detailTitle}>Protect Phu Quoc Coral Reef</Text><Text style={styles.owner}>72% raised  •  $14,400 of $20,000</Text>
      <View style={styles.track}><View style={[styles.fill, { width: '72%' }]} /><Text style={styles.percent}>72%</Text></View>
      <Text style={styles.sectionTitle}>Choose an amount</Text>
      <View style={styles.amountRow}>{['2', '5', '10', '20'].map((item) => <Pressable key={item} onPress={() => setAmount(item)} style={[styles.amountChip, amount === item && styles.amountActive]}><Text style={styles.amountText}>${item}</Text></Pressable>)}</View>
      <View style={styles.otherAmount}><TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="Other amount" placeholderTextColor={colors.ink} style={styles.amountInput} /><Text style={styles.dollar}>$</Text></View>
      <Text style={styles.impactText}>$2 = 5 kg of waste removed</Text>
      <View style={styles.rowBetween}><Text style={styles.sectionTitle}>Donate anonymously</Text><Pressable onPress={() => setAnonymous(!anonymous)} style={[styles.toggle, anonymous && styles.toggleOn]}><View style={[styles.knob, anonymous && styles.knobOn]} /></Pressable></View>
      <Text style={styles.sectionTitle}>Message (optional)</Text><TextInput value={message} onChangeText={setMessage} multiline placeholder="Leave a note for the campaign organizer..." placeholderTextColor={colors.ink} style={styles.message} />
      <Pressable onPress={() => { if (submit()) onContinue({ amount: Number(amount), anonymous, message }); }} style={styles.primaryButton}><Text style={styles.primaryText}>Continue</Text></Pressable>
      <Text style={styles.helper}>You can review your donation before confirming.</Text>
    </ScrollView>
  );
}

function PaymentMethodScreen({ amount, onBack, onContinue }: Props & { amount: number; onContinue: () => void }) {
  const [selected, setSelected] = useState('MoMo');
  const methods = [['MoMo', 'Pay securely with MoMo'], ['ZaloPay', 'Pay securely with ZaloPay'], ['VNPay', 'Pay securely with VNPay'], ['Bank card', 'Visa, Mastercard or local card'], ['Bank transfer QR', 'Scan QR to transfer']];
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Payment method" onBack={onBack} /><Text style={styles.meta}>Your donation</Text><View style={styles.summary}><Text style={styles.summaryAmount}>${amount.toFixed(2)}</Text><Text style={styles.owner}>Protect Phu Quoc Coral Reef</Text></View><Text style={styles.sectionTitle}>Choose a payment method</Text>{methods.map(([name, description]) => <Pressable key={name} onPress={() => setSelected(name)} style={[styles.payment, selected === name && styles.paymentSelected]}><View style={[styles.radio, selected === name && styles.radioSelected]} /><View><Text style={styles.paymentTitle}>{name}</Text><Text style={styles.meta}>{description}</Text></View></Pressable>)}<Pressable onPress={onContinue} style={styles.primaryButton}><Text style={styles.primaryText}>Continue</Text></Pressable><Text style={styles.helper}>You can change your payment method later.</Text></ScrollView>;
}

function DonationConfirmationScreen({ draft, onBack, onConfirm }: Props & { draft: DonationDraft; onConfirm: () => Promise<void> }) {
  const rows = [['Campaign', 'Protect Phu Quoc Coral Reef'], ['Organization', 'XXX Vietnam'], ['Amount', `$${draft.amount.toFixed(2)}`], ['Payment method', 'MoMo'], ['Estimated impact', `${draft.amount * 2.5} kg of waste removed`]];
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Confirm donation" onBack={onBack} /><Text style={styles.meta}>Review your donation details</Text><View style={styles.confirmCard}>{rows.map(([label, value]) => <View key={label} style={styles.confirmRow}><Text style={styles.meta}>{label}</Text><Text style={styles.confirmValue}>{value}</Text></View>)}<View style={styles.total}><Text style={styles.confirmValue}>Total</Text><Text style={styles.totalAmount}>${draft.amount.toFixed(2)}</Text></View></View><Pressable onPress={onConfirm} style={styles.primaryButton}><Text style={styles.primaryText}>Confirm donation</Text></Pressable><Text style={styles.helper}>Your information is protected and used only to process this donation.</Text><Text style={styles.secure}>Secure</Text></ScrollView>;
}

function DonationSuccessScreen({ onBack, onViewCertificate }: Props & { onViewCertificate: () => void }) {
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Donation complete" onBack={onBack} /><View style={styles.successIcon}>✓</View><Text style={styles.successTitle}>Thank you for making a difference!</Text><Text style={styles.successSubtitle}>Your donation has been received.</Text><View style={styles.impactCard}><Text style={styles.meta}>Your impact</Text><Text style={styles.impactTitle}>You have helped clear 5kg of trash.</Text><Text style={styles.meta}>Together, we help protect our oceans.</Text></View><Pressable onPress={onViewCertificate} style={styles.primaryButton}><Text style={styles.primaryText}>View certificate</Text></Pressable><Pressable onPress={() => Alert.alert('Share', 'Donation impact link copied.')} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Share</Text></Pressable><Pressable onPress={onBack} style={styles.outlineButton}><Text style={styles.outlineText}>Back to Campaigns</Text></Pressable><Text style={styles.helper}>A receipt has been sent to your account.</Text></ScrollView>;
}

function CampaignUpdatesScreen({ onBack }: Props) {
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Campaign Updates" onBack={onBack} /><View style={styles.updateHero}><Text style={styles.detailTitle}>Protect Phu Quoc Coral Reef</Text><Text style={styles.owner}>Latest news from XXX Vietnam</Text></View>{[['12 Jun 2026', 'Dive team removed 240kg of fishing nets from the reef.'], ['28 May 2026', 'Coral nursery installation reached the first milestone.'], ['04 May 2026', 'Community donors funded the next cleanup route.']].map(([date, text]) => <View key={date} style={styles.updateRow}><View style={styles.timelineDot} /><View><Text style={styles.meta}>{date}</Text><Text style={styles.confirmValue}>{text}</Text></View></View>)}</ScrollView>;
}

function ImpactReportScreen({ onBack }: Props) {
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Impact Report" onBack={onBack} /><View style={styles.impactCard}><Text style={styles.meta}>Campaign impact</Text><Text style={styles.impactTitle}>1,240 kg of waste removed</Text><Text style={styles.meta}>Verified through community cleanup logs.</Text></View><View style={styles.card}><Text style={styles.sectionTitle}>Your contribution</Text>{['5kg waste removal supported', '1 coral nursery maintained', '3 volunteer teams equipped'].map((item) => <Text key={item} style={styles.confirmValue}>✓  {item}</Text>)}</View><Pressable onPress={() => Alert.alert('Export', 'Impact report export queued.')} style={styles.primaryButton}><Text style={styles.primaryText}>Export report</Text></Pressable></ScrollView>;
}

function DonationHistoryScreen({ onBack }: Props) {
  const rows = [['20 Jun 2026', '$20.00', 'Protect Phu Quoc Coral Reef'], ['02 Apr 2026', '$10.00', 'Save Coastal Sea Turtle'], ['14 Jan 2026', '$5.00', 'Nha Trang Coastline Cleanup']];
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Donation History" onBack={onBack} /><Text style={styles.meta}>Your completed donations</Text>{rows.map(([date, amount, title]) => <View key={date} style={styles.historyRow}><View><Text style={styles.confirmValue}>{title}</Text><Text style={styles.meta}>{date}</Text></View><Text style={styles.totalAmount}>{amount}</Text></View>)}</ScrollView>;
}

function DonationCertificateScreen({ onBack }: Props) {
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Donation Certificate" onBack={onBack} /><View style={styles.certificate}><Text style={styles.certificateMark}>OCEAN</Text><Text style={styles.successTitle}>Certificate of Impact</Text><Text style={styles.owner}>Presented to Ocean Guardian</Text><View style={styles.certificateLine} /><Text style={styles.confirmValue}>For helping protect Phu Quoc Coral Reef</Text><Text style={styles.impactTitle}>5kg of waste removed</Text><Text style={styles.meta}>Donation date · 20 June 2026</Text></View><Pressable onPress={() => Alert.alert('Download', 'Certificate download prepared.')} style={styles.primaryButton}><Text style={styles.primaryText}>Download certificate</Text></Pressable><Pressable onPress={() => Alert.alert('Share', 'Certificate link copied.')} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Share certificate</Text></Pressable></ScrollView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 80 },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.lg, paddingTop: spacing.sm },
  backButton: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 22, height: 43, justifyContent: 'center', left: 0, position: 'absolute', width: 43 },
  backText: { color: colors.ink, fontSize: 32, lineHeight: 32 },
  topTitle: { backgroundColor: colors.sky, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 },
  topTitleText: { color: colors.ink, fontSize: 18, fontWeight: '700' },
  search: { borderColor: colors.line, borderRadius: 22, borderWidth: 1, color: colors.ink, height: 42, marginBottom: spacing.md, paddingHorizontal: 16 },
  chips: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  chip: { borderColor: colors.line, borderRadius: 18, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 8 },
  chipActive: { backgroundColor: colors.aqua, borderColor: colors.aqua },
  chipText: { color: colors.ink, fontSize: 12 }, chipTextActive: { color: colors.white, fontWeight: '700' },
  campaignCard: { backgroundColor: '#EDFBFF', borderColor: '#C9D5DE', borderRadius: 10, borderWidth: 1, flexDirection: 'row', marginBottom: spacing.lg, padding: 16, position: 'relative' },
  campaignImage: { borderRadius: 5, height: 121, width: 89 }, campaignCopy: { flex: 1, marginLeft: 16 }, meta: { color: colors.ink, fontSize: 12 }, campaignTitle: { color: colors.navy, fontSize: 18, fontWeight: '800', marginVertical: 4 }, owner: { color: colors.ink, fontSize: 14, marginTop: 3 },
  smallTrack: { backgroundColor: colors.sky, borderRadius: 8, height: 15, marginTop: 8, overflow: 'hidden', position: 'relative' }, smallFill: { backgroundColor: colors.aqua, borderRadius: 8, bottom: 0, left: 0, position: 'absolute', top: 0 }, smallPercent: { color: colors.ink, fontSize: 10, position: 'absolute', right: 8, top: 1 }, impactLink: { color: colors.ink, fontSize: 12, position: 'absolute', right: 12, textDecorationLine: 'underline', top: 12 },
  detailCard: { backgroundColor: '#EDFBFF', borderColor: '#C9D5DE', borderRadius: 10, borderWidth: 1, flexDirection: 'row', padding: 16 }, detailImage: { borderRadius: 5, height: 121, width: 89 }, detailCopy: { flex: 1, marginLeft: 16 }, detailTitle: { color: colors.navy, fontSize: 20, fontWeight: '800', marginVertical: 4 }, progressCard: { borderColor: colors.line, borderRadius: 10, borderWidth: 1, marginTop: spacing.lg, padding: 12 }, progressText: { color: colors.ink, fontSize: 13 }, bold: { color: colors.navy, fontWeight: '800' }, track: { backgroundColor: colors.sky, borderRadius: 8, height: 15, marginVertical: 6, overflow: 'hidden', position: 'relative' }, fill: { backgroundColor: colors.aqua, borderRadius: 8, bottom: 0, left: 0, position: 'absolute', top: 0 }, percent: { color: colors.ink, fontSize: 10, position: 'absolute', right: 10, top: 1 }, rowBetween: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, slogan: { borderColor: colors.line, borderRadius: 10, borderWidth: 1, flexDirection: 'row', marginTop: spacing.lg, padding: 10 }, circle: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 25, height: 50, justifyContent: 'center', marginRight: 10, width: 50 }, circleText: { color: colors.aqua, fontSize: 24, fontWeight: '800' }, sloganTitle: { color: colors.ink, flexShrink: 1, fontSize: 16 }, about: { borderColor: colors.line, borderRadius: 10, borderWidth: 1, marginTop: spacing.lg, padding: 10 }, aboutTitle: { color: colors.ink, fontSize: 14 }, aboutText: { color: colors.ink, fontSize: 12, lineHeight: 17, marginTop: 8 }, primaryButton: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 26, marginHorizontal: 12, marginTop: 28, padding: 13 }, primaryText: { color: colors.white, fontSize: 20, fontWeight: '800' }, sectionTitle: { color: colors.navy, fontSize: 15, fontWeight: '700', marginTop: spacing.lg }, amountRow: { flexDirection: 'row', gap: 10, marginTop: spacing.md }, amountChip: { alignItems: 'center', borderColor: colors.line, borderRadius: 20, borderWidth: 1, flex: 1, padding: 10 }, amountActive: { backgroundColor: '#EDFBFF', borderColor: colors.aqua }, amountText: { color: colors.ink, fontSize: 15, fontWeight: '700' }, otherAmount: { alignItems: 'center', borderColor: colors.line, borderRadius: 12, borderWidth: 1, flexDirection: 'row', marginTop: spacing.md, paddingHorizontal: 12 }, amountInput: { color: colors.ink, flex: 1, height: 48 }, dollar: { color: colors.ink, fontWeight: '700' }, impactText: { color: colors.ink, fontSize: 15, fontWeight: '700', marginTop: 28 }, toggle: { backgroundColor: colors.sky, borderRadius: 15, height: 28, justifyContent: 'center', padding: 3, width: 50 }, toggleOn: { backgroundColor: colors.mint }, knob: { backgroundColor: colors.white, borderRadius: 11, height: 22, width: 22 }, knobOn: { alignSelf: 'flex-end' }, message: { borderColor: colors.line, borderRadius: 12, borderWidth: 1, color: colors.ink, height: 92, marginTop: spacing.md, padding: 14, textAlignVertical: 'top' }, helper: { color: colors.ink, fontSize: 12, marginTop: spacing.lg, textAlign: 'center' }
  ,summary: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 12, borderWidth: 1, marginTop: spacing.sm, padding: 16 }, summaryAmount: { color: colors.navy, fontSize: 24, fontWeight: '800' }, payment: { alignItems: 'center', borderColor: colors.line, borderRadius: 12, borderWidth: 1, flexDirection: 'row', marginTop: spacing.md, padding: 14 }, paymentSelected: { backgroundColor: '#EDFBFF', borderColor: colors.aqua, borderWidth: 2 }, radio: { borderColor: '#C9D5DE', borderRadius: 12, borderWidth: 2, height: 22, marginRight: 16, width: 22 }, radioSelected: { backgroundColor: colors.aqua, borderColor: colors.aqua }, paymentTitle: { color: colors.navy, fontSize: 15, fontWeight: '700' }, confirmCard: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 12, borderWidth: 1, marginTop: spacing.md, paddingHorizontal: 16 }, confirmRow: { borderBottomColor: colors.line, borderBottomWidth: 1, paddingVertical: 13 }, confirmValue: { color: colors.navy, fontSize: 15, fontWeight: '700', marginTop: 4 }, total: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 }, totalAmount: { color: colors.navy, fontSize: 22, fontWeight: '800' }, secure: { alignSelf: 'center', backgroundColor: colors.sky, borderRadius: 15, color: colors.ink, fontSize: 12, marginTop: spacing.lg, paddingHorizontal: 18, paddingVertical: 7 }, successIcon: { alignItems: 'center', alignSelf: 'center', backgroundColor: colors.aqua, borderColor: colors.sky, borderRadius: 57, borderWidth: 16, color: colors.white, fontSize: 48, fontWeight: '800', height: 114, justifyContent: 'center', marginTop: 32, textAlign: 'center', width: 114 }, successTitle: { color: colors.navy, fontSize: 21, fontWeight: '800', marginTop: 38, textAlign: 'center' }, successSubtitle: { color: colors.ink, fontSize: 14, marginTop: 10, textAlign: 'center' }, impactCard: { alignItems: 'center', backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 12, borderWidth: 1, marginTop: 36, padding: 18 }, impactTitle: { color: '#0186A8', fontSize: 17, fontWeight: '800', marginVertical: 10, textAlign: 'center' }, secondaryButton: { alignItems: 'center', borderColor: colors.aqua, borderRadius: 26, borderWidth: 1, marginHorizontal: 12, marginTop: 16, padding: 13 }, secondaryButtonText: { color: colors.aqua, fontSize: 18, fontWeight: '700' }, outlineButton: { alignItems: 'center', borderColor: colors.line, borderRadius: 26, borderWidth: 1, marginHorizontal: 12, marginTop: 16, padding: 13 }, outlineText: { color: colors.ink, fontSize: 18, fontWeight: '700' }, card: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: 12, borderWidth: 1, marginTop: spacing.lg, padding: spacing.lg }, updateHero: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 12, borderWidth: 1, padding: spacing.lg }, updateRow: { borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', gap: 12, paddingVertical: spacing.lg }, timelineDot: { backgroundColor: colors.aqua, borderRadius: 8, height: 14, marginTop: 4, width: 14 }, historyRow: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.lg }, certificate: { alignItems: 'center', backgroundColor: '#EDFBFF', borderColor: colors.aqua, borderRadius: 12, borderWidth: 2, marginTop: spacing.lg, padding: 28 }, certificateMark: { color: colors.blue, fontSize: 13, fontWeight: '800', letterSpacing: 4 }, certificateLine: { backgroundColor: colors.line, height: 1, marginVertical: spacing.lg, width: '100%' }
});
