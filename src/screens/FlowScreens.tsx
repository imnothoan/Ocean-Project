import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screenCatalog, type ScreenDefinition } from '../navigation/screenCatalog';
import { createDonation, loadEvents, registerForEvent, type OceanEvent } from '../lib/supabase';
import { colors, radii, spacing, typography } from '../theme/tokens';
import { CommunityFlowRoot, CommunityInteractionScreen, CommunityPostDetailsScreen, CreateCommunityPostScreen, GroupsOrganizationsRoot } from '../features/community/CommunityScreens';
import { CreateEventScreen, EditEventScreen, EventAdminScreen, EventCalendarScreen, EventCertificateScreen, EventCheckInCompletedScreen, EventCheckInScreen, EventChecklistScreen, EventDetailScreen, EventFeedbackScreen, EventGroupChatScreen, EventParticipantsScreen, EventRecapScreen, EventRegistrationCatalogScreen, EventSearchFilterScreen, EventsHomeScreen, MyEventScreen } from '../features/events/EventScreens';
import { DonationFlowRoot } from '../features/donate/DonationScreens';
import { VerifyReportScreen } from '../features/admin/VerifyReportScreen';
import { TrainingScreen } from '../features/admin/TrainingScreens';
import { NotificationFlowRoot, NotificationDetailScreen, PollutionSubmittedScreen, PollutionWizardScreen, RareSpeciesFlow, ReportManagementScreen, ReportStatusTrackerScreen } from '../features/reports/ReportStateScreens';
import { AchievementsBadgesScreen, BadgeCollectionScreen, ChallengesScreen, DailyMissionScreen, KnowledgeHubScreen, LeaderboardScreen, LearningQuizScreen, LevelsRewardsScreen, LevelUpScreen, MyProfileEcoImpactScreen, ShareActivityScreen } from '../features/gamification/GamificationScreens';
import { AboutOceanProjectScreen, HelpCenterScreen, NotificationsScreen, PointsHistoryScreen, RewardsScreen } from '../features/gamification/CommunityUtilityScreens';
import { CampaignImpactStatsScreen, CommunityDashboardScreen, EcoHistoryLogScreen, EcoImpactMetricsScreen, ExportShareScreen, TopDonorsScreen } from '../features/data/DataUtilityScreens';

export function ScreenCatalogScreen({ onOpen }: { onOpen: (screen: ScreenDefinition) => void }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => screenCatalog.filter((screen) => `${screen.group} ${screen.title}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const groups = [...new Set(filtered.map((screen) => screen.group))];
  return <ScrollView contentContainerStyle={styles.content}><Text style={styles.eyebrow}>HIGH-FIDELITY FLOWS</Text><Text style={styles.heading}>Khám phá màn hình</Text><Text style={styles.subtitle}>Tất cả flow được gom theo nhóm để kiểm thử từng hành trình.</Text><TextInput value={query} onChangeText={setQuery} placeholder="Tìm màn hình..." placeholderTextColor={colors.muted} style={styles.search} />{groups.map((group) => <View key={group} style={styles.group}><Text style={styles.groupTitle}>{group}</Text>{filtered.filter((screen) => screen.group === group).map((screen) => <Pressable key={screen.id} style={styles.screenRow} onPress={() => onOpen(screen)}><View style={styles.screenNumber}><Text style={styles.number}>{screenCatalog.indexOf(screen) + 1}</Text></View><Text style={styles.screenTitle}>{screen.title}</Text><Text style={styles.chevron}>›</Text></Pressable>)}</View>)}</ScrollView>;
}

export function FlowDetailScreen({ screen, onBack, onOpenScreen }: { screen: ScreenDefinition; onBack: () => void; onOpenScreen?: (screen: ScreenDefinition) => void }) {
  if (screen.title === 'Community Feed') {
    return <CommunityFlowRoot onBack={onBack} />;
  }
  if (screen.title === 'Post Detail') {
    return <CommunityPostDetailsScreen onBack={onBack} />;
  }
  if (screen.title === 'Create Post') {
    return <CreateCommunityPostScreen onBack={onBack} />;
  }
  if (screen.title === 'Comments' || screen.title === 'Likes') {
    return <CommunityInteractionScreen title={screen.title} onBack={onBack} />;
  }
  if (screen.title === 'Q - 42') {
    return <VerifyReportScreen onBack={onBack} />;
  }
  if (screen.title === 'Q - 43' || screen.title === 'Q - 44') return <TrainingScreen title={screen.title} onBack={onBack} />;
  if (screen.title === '8. Pollution Submitted') return <PollutionSubmittedScreen onBack={onBack} />;
  if (screen.title === '16. Report Status Tracker') return <ReportStatusTrackerScreen onBack={onBack} />;
  if (screen.title === '14. Notification Inbox') return <NotificationFlowRoot onBack={onBack} />;
  if (screen.title === '15. Notification Detail') return <NotificationDetailScreen onBack={onBack} />;
  if (['10. Rare Species Photo', '12. Rare Species Location', '13. Rare Species Review', '11. Rare Species Type'].includes(screen.title)) return <RareSpeciesFlow title={screen.title} onBack={onBack} />;
  if (['19. Add Follow-up Evidence', '17. Edit Report', '20. Report Resolved / Impact', '9. My Report History'].includes(screen.title)) return <ReportManagementScreen title={screen.title} onBack={onBack} />;
  if (['1. Report type', '4. Pollution Severity', '5. Pollution Waste Type', '6. Pollution More Detail'].includes(screen.title)) return <PollutionWizardScreen title={screen.title} onBack={onBack} />;
  if (screen.title === 'Leaderboard') return <LeaderboardScreen onBack={onBack} />;
  if (screen.title === 'Challenges' || screen.title === 'Challenge Detail') return <ChallengesScreen onBack={onBack} detail={screen.title === 'Challenge Detail'} />;
  if (screen.title === 'Badge Collection' || screen.title === 'Badge Detail') return <BadgeCollectionScreen onBack={onBack} detail={screen.title === 'Badge Detail'} />;
  if (screen.title === 'Learning Quiz') return <LearningQuizScreen onBack={onBack} />;
  if (screen.title === 'Knowledge') return <KnowledgeHubScreen onBack={onBack} />;
  if (screen.title === 'share') return <ShareActivityScreen onBack={onBack} />;
  if (screen.title === 'Profile & Gamification') return <MyProfileEcoImpactScreen onBack={onBack} />;
  if (screen.title === 'Rectangle 792') return <LevelsRewardsScreen onBack={onBack} />;
  if (screen.title === 'Rectangle 793') return <AchievementsBadgesScreen onBack={onBack} />;
  if (screen.title === 'Rectangle 794') return <DailyMissionScreen onBack={onBack} />;
  if (screen.title === 'Rectangle 795') return <LevelUpScreen onBack={onBack} />;
  if (screen.title === 'Points History') return <PointsHistoryScreen onBack={onBack} />;
  if (screen.title === 'Rewards') return <RewardsScreen onBack={onBack} />;
  if (screen.title === 'Reward Detail') return <RewardsScreen onBack={onBack} detail />;
  if (screen.title === 'Notifications') return <NotificationsScreen onBack={onBack} />;
  if (screen.title === 'Help Center') return <HelpCenterScreen onBack={onBack} />;
  if (screen.title === 'About Ocean Project') return <AboutOceanProjectScreen onBack={onBack} />;
  if (screen.title === 'Frame 11 - Eco History Log') return <EcoHistoryLogScreen onBack={onBack} />;
  if (screen.title === 'Frame 12 - Export & Share') return <ExportShareScreen onBack={onBack} />;
  if (screen.title === 'Frame 10 - Eco-Impact Metrics') return <EcoImpactMetricsScreen onBack={onBack} />;
  if (screen.title === 'Frame 3 - Top Donors') return <TopDonorsScreen onBack={onBack} />;
  if (screen.title === 'Frame 2 - Community Dashboard') return <CommunityDashboardScreen onBack={onBack} />;
  if (screen.title === 'Frame 9 - Campaign Impact Stats') return <CampaignImpactStatsScreen onBack={onBack} />;
  if (screen.title === 'Notification Settings' || screen.title === 'Account Settings') {
    return <SettingsFlow title={screen.title} onBack={onBack} />;
  }
  if (['Frame 1 - Fundraising Campaigns', 'Frame 2 - Campaign Detail', 'D1 - Donate', 'D2 - Payment Method', 'D3 - Donation Confirmation', 'D4 - Donation Success', 'D5 - Campaign Updates', 'D6 - Impact Report', 'D7 - Donation History', 'D8 - Donation Certificate'].includes(screen.title)) {
    const initial = screen.title === 'Frame 2 - Campaign Detail' ? 'detail' : screen.title === 'D1 - Donate' ? 'donate' : screen.title === 'D2 - Payment Method' ? 'payment' : screen.title === 'D3 - Donation Confirmation' ? 'confirm' : screen.title === 'D4 - Donation Success' ? 'success' : screen.title === 'D5 - Campaign Updates' ? 'updates' : screen.title === 'D6 - Impact Report' ? 'impact' : screen.title === 'D7 - Donation History' ? 'history' : screen.title === 'D8 - Donation Certificate' ? 'certificate' : 'campaigns';
    return <DonationFlowRoot onBack={onBack} initial={initial} />;
  }
  if (screen.title === 'Event Detail') {
    return <EventDetailScreen onBack={onBack} />;
  }
  if (screen.title === 'Events Home') {
    return <EventsHomeScreen onOpenDetail={() => onOpenScreen?.({ id: 'event-flow-event-detail', group: 'Event Flow', title: 'Event Detail', description: 'Detailed event information and registration.' })} />;
  }
  if (screen.title === 'Event Registration') {
    return <EventRegistrationCatalogScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Calendar') {
    return <EventCalendarScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Checklist') {
    return <EventChecklistScreen onBack={onBack} />;
  }
  if (screen.title === 'My Event') {
    return <MyEventScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Check-in') {
    return <EventCheckInScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Check-in Completed') {
    return <EventCheckInCompletedScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Feedback') {
    return <EventFeedbackScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Certificate') {
    return <EventCertificateScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Participants') {
    return <EventParticipantsScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Group Chat') {
    return <EventGroupChatScreen onBack={onBack} />;
  }
  if (screen.title === 'Event Recap') {
    return <EventRecapScreen onBack={onBack} />;
  }
  if (screen.title === 'Events Search Filter') {
    return <EventSearchFilterScreen onBack={onBack} />;
  }
  if (/Create Event|Edit Event/.test(screen.title)) {
    const step = /Step 4/.test(screen.title) ? 4 : /Step 3/.test(screen.title) ? 3 : /Step 2/.test(screen.title) ? 2 : 1;
    return <CreateEventScreen onBack={onBack} step={step} />;
  }
  if (screen.title === 'Event Home - CTV') return <EventAdminScreen onBack={onBack} mode="home" />;
  if (screen.title === 'Event Manage') return <EventAdminScreen onBack={onBack} mode="manage" />;
  if (screen.title === 'Approve Participants') return <EventAdminScreen onBack={onBack} mode="approve" />;
  if (screen.title === 'Posting Event Recap') return <EventAdminScreen onBack={onBack} mode="recap" />;
  if (screen.title === 'Edit Event') return <EditEventScreen onBack={onBack} />;
  if (screen.title === 'Community') {
    return <GroupsOrganizationsRoot onBack={onBack} />;
  }
  if (/Groups|Organizations/i.test(screen.title)) {
    return <GroupsOrganizationsRoot onBack={onBack} />;
  }
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

function SettingsFlow({ title, onBack }: { title: string; onBack: () => void }) {
  const isNotifications = title === 'Notification Settings';
  const [profileName, setProfileName] = useState('Hoàng Nguyễn');
  const [saved, setSaved] = useState(false);
  const [preferences, setPreferences] = useState({ reportUpdates: true, eventReminders: true, communityActivity: true });
  useEffect(() => {
    AsyncStorage.multiGet(['ocean.profileName', 'ocean.notificationPreferences']).then((entries) => {
      const name = entries.find(([key]) => key === 'ocean.profileName')?.[1];
      const rawPreferences = entries.find(([key]) => key === 'ocean.notificationPreferences')?.[1];
      if (name) setProfileName(name);
      if (rawPreferences) {
        try {
          setPreferences(JSON.parse(rawPreferences));
        } catch {
          setSaved(false);
        }
      }
    });
  }, []);
  const save = async () => {
    if (!profileName.trim()) {
      Alert.alert('Missing name', 'Enter a display name before saving.');
      return;
    }
    if (isNotifications) await AsyncStorage.setItem('ocean.notificationPreferences', JSON.stringify(preferences));
    else await AsyncStorage.setItem('ocean.profileName', profileName.trim());
    setSaved(true);
  };
  const rows = isNotifications
    ? [['Report status updates', preferences.reportUpdates, 'reportUpdates'], ['Nearby event reminders', preferences.eventReminders, 'eventReminders'], ['Community activity', preferences.communityActivity, 'communityActivity']] as const
    : [];
  return <ScrollView contentContainerStyle={styles.content}><Pressable onPress={onBack}><Text style={styles.back}>‹ Quay lại danh sách</Text></Pressable><Text style={styles.eyebrow}>COMMUNITY & GAMIFICATION</Text><Text style={styles.heading}>{isNotifications ? 'Notification settings' : 'Account settings'}</Text><Text style={styles.subtitle}>{isNotifications ? 'Choose which updates should stay close to you.' : 'Keep your profile details and preferences up to date.'}</Text>{isNotifications ? <View style={styles.card}>{rows.map(([label, enabled, key]) => <Pressable key={label} onPress={() => setPreferences((current) => ({ ...current, [key]: !enabled }))} style={styles.settingRow}><View style={styles.settingCopy}><Text style={styles.cardTitle}>{label}</Text><Text style={styles.cardText}>{enabled ? 'Enabled' : 'Disabled'}</Text></View><View style={[styles.switch, enabled && styles.switchOn]}><View style={[styles.switchKnob, enabled && styles.switchKnobOn]} /></View></Pressable>)}</View> : <View style={styles.card}><Field label="Display name" value={profileName} onChangeText={(value) => { setProfileName(value); setSaved(false); }} placeholder="Your name" /><Text style={styles.cardText}>Privacy and data controls remain protected by your Supabase account policies.</Text></View>}<Pressable style={styles.button} onPress={save}><Text style={styles.buttonText}>{saved ? 'Saved' : isNotifications ? 'Save preferences' : 'Update settings'}</Text></Pressable></ScrollView>;
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
  if (!['1. Report type', '2. Pollution Add Photo', '3. Pollution Select Location'].includes(screen.title)) return <ReportStateFlow screen={screen} onBack={onBack} />;
  const [note, setNote] = useState('');
  const [complete, setComplete] = useState(false);
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.progressSteps}>{['Thông tin', 'Bằng chứng', 'Xác nhận'].map((step, index) => <View key={step} style={styles.step}><View style={[styles.stepDot, index === 0 && styles.stepActive]}><Text style={styles.stepNumber}>{index + 1}</Text></View><Text style={styles.stepText}>{step}</Text></View>)}</View>{complete ? <SuccessCard text="Báo cáo đã chuyển sang bước tiếp theo." /> : <View style={styles.card}><Field label="Ghi chú bổ sung" value={note} onChangeText={setNote} placeholder="Mô tả chi tiết..." multiline /><Pressable style={styles.button} onPress={() => setComplete(true)}><Text style={styles.buttonText}>{/review|resolved|submitted/i.test(screen.title) ? 'Xác nhận trạng thái' : 'Lưu và tiếp tục'}</Text></Pressable></View>}<MetricCard title="Cam kết xử lý" values={['Thông tin được bảo mật', 'Đội kiểm duyệt sẽ phản hồi', 'Bạn có thể bổ sung bằng chứng']} /></FlowFrame>;
}

function ReportStateFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  const [selected, setSelected] = useState('Pollution');
  const review = /review|status|tracker|resolved|history/i.test(screen.title);
  const notification = /notification/i.test(screen.title);
  const rare = /rare species/i.test(screen.title);
  const options = notification ? ['New update from the review team', 'Your report has been received', 'Ocean Care weekly digest'] : rare ? ['Dolphin sighting', 'Sea turtle nest', 'Unknown species'] : ['Submitted', 'Under review', 'Resolved'];
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.reportHeader}><Text style={styles.reportIcon}>{notification ? '◉' : rare ? '◈' : '!'}</Text><View><Text style={styles.cardTitle}>{notification ? 'Notification center' : rare ? 'Rare species report' : 'Report progress'}</Text><Text style={styles.cardText}>{notification ? 'Stay informed about your ocean activity.' : 'Your contribution helps the community respond faster.'}</Text></View></View><Text style={styles.sectionTitle}>{review ? 'Current status' : 'Choose an option'}</Text><View style={styles.card}>{options.map((item, index) => <Pressable key={item} onPress={() => setSelected(item)} style={[styles.reportOption, selected === item && styles.reportOptionActive]}><View style={[styles.optionDot, selected === item && styles.optionDotActive]} /><Text style={[styles.reportOptionText, selected === item && styles.reportOptionTextActive]}>{item}</Text><Text style={styles.listChevron}>›</Text></Pressable>)}</View><MetricCard title="What happens next" values={notification ? ['Updates are sent to your inbox', 'You can review each detail', 'Unread items remain highlighted'] : ['Our team verifies the evidence', 'Location data is shared securely', 'You receive a status notification']} /><Pressable style={styles.button} onPress={() => Alert.alert('Đã cập nhật', `${selected} đã được chọn.`)}><Text style={styles.buttonText}>{review ? 'Save status' : 'Continue'}</Text></Pressable></FlowFrame>;
}

function CommunityFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  if (!['Community', 'Community Feed', 'Post Detail', 'Create Post'].includes(screen.title)) return <CommunityGamificationFlow screen={screen} onBack={onBack} />;
  const [liked, setLiked] = useState(false);
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.profileHero}><Text style={styles.profileEmoji}>🌊</Text><View><Text style={styles.cardTitle}>Ocean Guardian</Text><Text style={styles.cardText}>1,280 điểm • Cấp 4</Text></View></View><MetricCard title={/leaderboard|ranking/i.test(screen.title) ? 'Bảng xếp hạng tuần này' : /challenge|reward|badge/i.test(screen.title) ? 'Tiến trình của bạn' : 'Cộng đồng hôm nay'} values={['Lan tỏa kiến thức biển', 'Tham gia thử thách xanh', 'Nhận huy hiệu đóng góp']} /><Pressable style={[styles.button, liked && styles.buttonComplete]} onPress={() => setLiked(!liked)}><Text style={styles.buttonText}>{liked ? 'Đã tương tác' : 'Tham gia cộng đồng'}</Text></Pressable></FlowFrame>;
}

function CommunityGamificationFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  const [following, setFollowing] = useState(false);
  const isLearning = /knowledge|quiz|about|help|settings|account/i.test(screen.title);
  const isReward = /badge|reward|point|challenge|leaderboard|ranking/i.test(screen.title);
  const configs: Record<string, { heading: string; emoji: string; rows: string[]; metrics: string[]; action: string }> = {
    'Points History': { heading: 'Points history', emoji: '✦', rows: ['Beach cleanup · +120 points', 'Knowledge quiz · +80 points', 'Community post · +40 points'], metrics: ['1,280 points total', '+240 this month', 'Next level at 1,500'], action: 'View all activity' },
    Rewards: { heading: 'Rewards', emoji: '🎁', rows: ['Reusable bottle · 300 points', 'Ocean tote bag · 500 points', 'Cleanup kit · 750 points'], metrics: ['1,280 points available', '3 rewards unlocked', 'Next reward at 1,500'], action: 'Explore rewards' },
    'Reward Detail': { heading: 'Reusable bottle', emoji: '♻', rows: ['Made from recycled ocean plastic', 'Redeem for 300 points', 'Available while supplies last'], metrics: ['300 points required', 'Ships within 7 days', 'Points deducted on redeem'], action: 'Redeem reward' },
    Notifications: { heading: 'Notifications', emoji: '◉', rows: ['Your report is under review', 'New cleanup near My Khe Beach', 'You earned a new badge'], metrics: ['3 unread updates', '2 community invitations', 'Weekly digest enabled'], action: 'Mark all read' },
    'Notification Settings': { heading: 'Notification settings', emoji: '⚙', rows: ['Report status updates', 'Nearby event reminders', 'Community activity'], metrics: ['Push notifications on', 'Email digest weekly', 'Quiet hours 22:00–07:00'], action: 'Save preferences' },
    'Account Settings': { heading: 'Account settings', emoji: '◎', rows: ['Profile and display name', 'Privacy and data controls', 'Connected accounts'], metrics: ['Profile 80% complete', 'Data export available', 'Last login today'], action: 'Update settings' },
    'Help Center': { heading: 'Help Center', emoji: '?', rows: ['How to submit a report', 'How points and badges work', 'Contact Ocean Care support'], metrics: ['24 help articles', 'Average reply under 1 day', 'Community support available'], action: 'Open help topic' },
    'About Ocean Project': { heading: 'About Ocean Project', emoji: '🌊', rows: ['Our mission and impact', 'Data and privacy promise', 'Open-source acknowledgements'], metrics: ['Built for coastal communities', 'Version 1.0', 'Impact data updated daily'], action: 'Learn more' }
  };
  const config = configs[screen.title] ?? { heading: isLearning ? 'Learn and grow with Ocean Care' : isReward ? 'Your ocean guardian journey' : 'Community updates', emoji: isLearning ? '📚' : isReward ? '🏅' : '🌊', rows: isLearning ? ['How plastic reaches the ocean', '5 ways to protect marine life', 'Take the weekly knowledge quiz'] : isReward ? ['Join a beach cleanup', 'Share one ocean fact', 'Invite a friend to the community'] : ['Latest posts from Ocean Guardians', 'Upcoming group activities', 'Stories from the coastline'], metrics: isReward ? ['72% to the next level', '3 badges earned this month', 'Next reward: reusable bottle'] : ['New content every week', 'Progress saved to your account', 'Community-reviewed information'], action: 'Start exploring' };
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.profileHero}><Text style={styles.profileEmoji}>{config.emoji}</Text><View><Text style={styles.cardTitle}>{config.heading}</Text><Text style={styles.cardText}>Ocean Guardian · Level 4 · 1,280 points</Text></View></View><View style={styles.card}>{config.rows.map((row, index) => <Pressable key={row} onPress={() => Alert.alert(row, 'This content is ready to explore.')} style={styles.listRow}><View style={styles.listNumber}><Text style={styles.listNumberText}>{index + 1}</Text></View><Text style={styles.cardText}>{row}</Text><Text style={styles.listChevron}>›</Text></Pressable>)}</View><MetricCard title={screen.title} values={config.metrics} /><Pressable style={[styles.button, following && styles.buttonComplete]} onPress={() => setFollowing(!following)}><Text style={styles.buttonText}>{following ? 'Saved to my journey' : config.action}</Text></Pressable></FlowFrame>;
}

function AdminAndDataFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  if (screen.group === 'Data & Donate') return <DataAnalyticsFlow screen={screen} onBack={onBack} />;
  if (screen.group === 'Map & Admin') return <MapAdminFlow screen={screen} onBack={onBack} />;
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.hero}><Text style={styles.heroIcon}>{screen.group === 'Map & Admin' ? '⌖' : '▥'}</Text><Text style={styles.heroTitle}>{screen.group === 'Map & Admin' ? 'Bản đồ & quản trị' : 'Dữ liệu tác động'}</Text><Text style={styles.heroText}>Các chỉ số được trình bày rõ ràng để người dùng và đội vận hành cùng ra quyết định.</Text></View><MetricCard title="Tổng quan" values={['Dữ liệu được đồng bộ theo thời gian thực', 'Bộ lọc theo khu vực và thời gian', 'Xuất báo cáo khi cần']} /><Pressable style={styles.button} onPress={() => Alert.alert('Đã cập nhật', 'Bộ lọc và trạng thái đã được áp dụng.')}><Text style={styles.buttonText}>Áp dụng và tiếp tục</Text></Pressable></FlowFrame>;
}

function DataAnalyticsFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  const [period, setPeriod] = useState('7 days');
  const configs: Record<string, { heading: string; values: string[]; action: string }> = {
    'Frame 3 - Top Donors': { heading: 'Top donor community', values: ['326 community donors', '$42,800 contributed', '18 recurring supporters'], action: 'View donor list' },
    'Frame 7 - Area Details Metrics': { heading: 'Area details', values: ['1,240 kg collected', '72% recyclable material', '18 active cleanup areas'], action: 'Open area details' },
    'Frame 6 - Area Comparison': { heading: 'Compare coastal areas', values: ['Da Nang · 1,240 kg', 'Nha Trang · 860 kg', 'Phu Quoc · 720 kg'], action: 'Compare areas' },
    'Frame 5 - Waste Composition': { heading: 'Waste composition', values: ['Plastic · 48%', 'Fishing nets · 22%', 'Other waste · 30%'], action: 'View composition' },
    'Frame 4 - Time Trends Analytics': { heading: 'Time trends', values: ['+18% vs last month', 'Best day · Saturday', '12 cleanup peaks'], action: 'Change time range' },
    'Frame 3 - Area Rankings': { heading: 'Area rankings', values: ['1. Da Nang', '2. Nha Trang', '3. Phu Quoc'], action: 'View ranking' },
    'Frame 12 - Export & Share': { heading: 'Export & share', values: ['PDF report ready', 'CSV includes 18 areas', 'Last generated today'], action: 'Export report' },
    'Frame 11 - Eco History Log': { heading: 'Eco history log', values: ['24 actions completed', '12 reports submitted', '8 events joined'], action: 'Open history' },
    'Frame 10 - Eco-Impact Metrics': { heading: 'Eco-impact metrics', values: ['1,240 kg waste removed', '420 volunteer hours', '18 habitats supported'], action: 'View impact' },
    'Frame 9 - Campaign Impact Stats': { heading: 'Campaign impact', values: ['$14,400 raised', '542 supporters', '72% of goal'], action: 'Open campaign' },
    'Frame 8 - Heatmap Data Overview': { heading: 'Heatmap overview', values: ['12 high activity zones', '4 priority hotspots', 'Last sync less than 1 min ago'], action: 'Open heatmap' },
    'Frame 2 - Community Dashboard': { heading: 'Community dashboard', values: ['1,248 active guardians', '86 actions this month', '92% positive trend'], action: 'Open dashboard' }
  };
  const config = configs[screen.title] ?? { heading: /donat|campaign|payment|certificate|fundrais/i.test(screen.title) ? 'Ocean Care campaign' : 'Impact analytics', values: ['1,240 kg waste collected', '72% recyclable material', '18 active cleanup areas'], action: 'Export report' };
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.hero}><Text style={styles.heroIcon}>▥</Text><Text style={styles.heroTitle}>{config.heading}</Text><Text style={styles.heroText}>Clear metrics help the community understand progress and choose the next action.</Text></View><View style={styles.filters}>{['7 days', '30 days', 'This year'].map((item) => <Pressable key={item} onPress={() => setPeriod(item)} style={[styles.chip, period === item && styles.chipActive]}><Text style={[styles.chipText, period === item && styles.chipTextActive]}>{item}</Text></Pressable>)}</View><MetricCard title={screen.title} values={config.values} /><View style={styles.card}><Text style={styles.cardLabel}>ACTIVITY · {period.toUpperCase()}</Text>{[40, 65, 50, 82, 72, 90, 78].map((height, index) => <View key={index} style={styles.chartRow}><Text style={styles.chartLabel}>Day {index + 1}</Text><View style={styles.chartTrack}><View style={[styles.chartBar, { width: `${height}%` }]} /></View><Text style={styles.chartValue}>{height}%</Text></View>)}</View><Pressable style={styles.button} onPress={() => Alert.alert('Updated', `${config.action} · ${period}`)}><Text style={styles.buttonText}>{config.action}</Text></Pressable></FlowFrame>;
}

function MapAdminFlow({ screen, onBack }: { screen: ScreenDefinition; onBack: () => void }) {
  const [selected, setSelected] = useState('All areas');
  const variants: Record<string, { heading: string; label: string; values: string[]; action: string }> = {
    'Q - 41': { heading: 'Live cleanup map', label: 'My Khe coastline', values: ['12 active reports', '4 verified locations', '3 teams operating now'], action: 'Open live layer' },
    'Q - 40': { heading: 'Report hotspots', label: 'Highest priority areas', values: ['8 high-severity reports', '3 pending reviews', '2 areas need volunteers'], action: 'Review hotspots' },
    'Q - 39': { heading: 'Area administration', label: 'Da Nang operations', values: ['18 managed zones', '92% data coverage', 'Last sync less than 1 min ago'], action: 'Manage areas' },
    'Q - 38': { heading: 'Verification queue', label: 'Reports awaiting review', values: ['24 reports in queue', '9 need photo checks', '6 location conflicts'], action: 'Review queue' },
    'Q - 37': { heading: 'Community actions', label: 'Events near you', values: ['6 upcoming events', '3 cleanup groups', '128 participants this week'], action: 'View events' },
    'Q - 26': { heading: 'Location detail', label: 'My Khe Beach', values: ['42 reports nearby', '6 resolved this week', '2 active responders'], action: 'Open location' },
    'Q - 36': { heading: 'Operations dashboard', label: 'Coastal response', values: ['18 active teams', '92% response SLA', '7 pending assignments'], action: 'Assign response' },
    'Q - 28': { heading: 'Report detail review', label: 'Evidence and location', values: ['3 evidence items', 'Location confidence 94%', 'Severity: medium'], action: 'Open report' },
    'Q - 27': { heading: 'Volunteer map', label: 'Nearby guardians', values: ['128 active volunteers', '12 skills verified', '4 teams nearby'], action: 'Invite volunteers' },
    'Q - 35': { heading: 'Area performance', label: 'Monthly operations', values: ['+18% resolved reports', '86 cleanup actions', '3 priority zones'], action: 'View performance' },
    'Q - 34': { heading: 'Data quality checks', label: 'Coverage and accuracy', values: ['96% complete records', '12 duplicate reports', '4 location conflicts'], action: 'Review quality' },
    'Q - 10': { heading: 'Map layers', label: 'Coastal intelligence', values: ['Reports layer enabled', 'Events layer enabled', 'Protected areas visible'], action: 'Manage layers' },
    'Q - 14': { heading: 'Moderation actions', label: 'Community safety', values: ['8 flagged submissions', '3 resolved flags', '0 urgent escalations'], action: 'Review flags' },
    'Q - 15': { heading: 'Response assignments', label: 'Team workload', values: ['12 assigned reports', '4 unassigned reports', '2 overdue actions'], action: 'Assign team' },
    'Q - 45': { heading: 'Impact verification', label: 'Resolved outcomes', values: ['34 outcomes verified', '12 photo proofs', '8 community confirmations'], action: 'Verify impact' },
    'Q - 22': { heading: 'Cleanup planning', label: 'Next response window', values: ['3 planned cleanups', '86 expected volunteers', '5 supply requests'], action: 'Plan cleanup' },
    'Q - 31': { heading: 'Partner organizations', label: 'Response network', values: ['18 active partners', '6 coastal districts', '92% partner coverage'], action: 'View partners' },
    'Q - 21': { heading: 'Incident alerts', label: 'Priority notifications', values: ['2 high severity alerts', '5 new reports', '1 weather warning'], action: 'Review alerts' },
    'Q - 7': { heading: 'Protected habitat map', label: 'Marine conservation', values: ['12 protected zones', '4 species alerts', '8 monitoring points'], action: 'Open habitat data' },
    'Q - 2': { heading: 'Map overview', label: 'Ocean Project network', values: ['1,248 community actions', '86 active locations', '24 open reports'], action: 'Explore map' },
    'Q - 3': { heading: 'Search locations', label: 'Find a coastal area', values: ['Search by name or district', 'Filter by activity', 'Use current location'], action: 'Search map' },
    'Q - 20': { heading: 'Admin audit trail', label: 'Recent operational changes', values: ['24 actions logged today', '3 policy updates', 'All changes traceable'], action: 'Open audit log' }
  };
  const variant = variants[screen.title] ?? { heading: 'Ocean operations map', label: 'Da Nang coastline', values: ['12 active reports', '4 verified locations', 'Last sync less than 1 min ago'], action: 'Apply filters' };
  return <FlowFrame screen={screen} onBack={onBack}><View style={styles.hero}><Text style={styles.heroTitle}>{variant.heading}</Text><Text style={styles.heroText}>Explore verified activity and choose the next operational action.</Text></View><View style={styles.mapCard}><Text style={styles.mapWater}>⌁  ⌁  ⌁  ⌁</Text><View style={styles.mapPin}><Text style={styles.mapPinText}>●</Text></View><View style={[styles.mapPin, styles.mapPinTwo]}><Text style={styles.mapPinText}>●</Text></View><Text style={styles.mapLabel}>{variant.label}</Text></View><View style={styles.filters}>{['All areas', 'Hotspots', 'Events'].map((item) => <Pressable key={item} onPress={() => setSelected(item)} style={[styles.chip, selected === item && styles.chipActive]}><Text style={[styles.chipText, selected === item && styles.chipTextActive]}>{item}</Text></Pressable>)}</View><MetricCard title={screen.title} values={variant.values} /><Pressable style={styles.button} onPress={() => Alert.alert('Updated', `${variant.action}: ${selected}`)}><Text style={styles.buttonText}>{variant.action}</Text></Pressable></FlowFrame>;
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
  successText: { color: colors.ink, fontSize: 14, lineHeight: 20, marginTop: 10, textAlign: 'center' },
  reportHeader: { alignItems: 'center', backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 18, borderWidth: 1, flexDirection: 'row', marginBottom: 16, padding: 18 },
  reportIcon: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 24, color: colors.white, fontSize: 28, height: 48, lineHeight: 46, marginRight: 14, textAlign: 'center', width: 48 },
  sectionTitle: { color: colors.navy, fontSize: 17, fontWeight: '800', marginBottom: 10, marginTop: 12 },
  reportOption: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: 15 },
  reportOptionActive: { backgroundColor: '#EDFBFF' },
  optionDot: { borderColor: colors.line, borderRadius: 9, borderWidth: 2, height: 18, marginRight: 11, width: 18 },
  optionDotActive: { backgroundColor: colors.aqua, borderColor: colors.aqua },
  reportOptionText: { color: colors.ink, flex: 1, fontSize: 14, fontWeight: '700' },
  reportOptionTextActive: { color: colors.blue },
  listRow: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: 11 },
  listNumber: { alignItems: 'center', backgroundColor: colors.mint, borderRadius: 16, height: 32, justifyContent: 'center', marginRight: 10, width: 32 },
  listNumberText: { color: colors.navy, fontWeight: '800' },
  listChevron: { color: colors.aqua, fontSize: 24, marginLeft: 'auto' },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  chip: { backgroundColor: '#F1F3F4', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 8 },
  chipActive: { backgroundColor: colors.aqua },
  chipText: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  chipTextActive: { color: colors.white },
  chartRow: { alignItems: 'center', flexDirection: 'row', marginTop: 12 },
  chartLabel: { color: colors.muted, fontSize: 11, width: 42 },
  chartTrack: { backgroundColor: '#E8EEF0', borderRadius: 4, flex: 1, height: 8, overflow: 'hidden' },
  chartBar: { backgroundColor: colors.aqua, borderRadius: 4, height: 8 },
  chartValue: { color: colors.ink, fontSize: 11, marginLeft: 8, width: 32 },
  mapCard: { backgroundColor: '#CDEDF0', borderColor: colors.aqua, borderRadius: 22, height: 260, marginBottom: 16, overflow: 'hidden', padding: 18, position: 'relative' },
  mapWater: { color: '#6DBBC4', fontSize: 36, letterSpacing: 8, marginTop: 45 },
  mapPin: { alignItems: 'center', backgroundColor: colors.coral, borderColor: colors.white, borderRadius: 20, borderWidth: 3, height: 38, justifyContent: 'center', left: 92, position: 'absolute', top: 100, width: 38 },
  mapPinTwo: { backgroundColor: colors.aqua, left: 224, top: 160 },
  mapPinText: { color: colors.white, fontSize: 14 },
  mapLabel: { bottom: 18, color: colors.navy, fontSize: 14, fontWeight: '800', left: 18, position: 'absolute' },
  settingRow: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: spacing.md },
  settingCopy: { flex: 1 },
  switch: { backgroundColor: colors.line, borderRadius: 18, height: 30, justifyContent: 'center', padding: 3, width: 52 },
  switchOn: { backgroundColor: colors.aqua },
  switchKnob: { backgroundColor: colors.white, borderRadius: 12, height: 24, width: 24 },
  switchKnobOn: { alignSelf: 'flex-end' }
});
