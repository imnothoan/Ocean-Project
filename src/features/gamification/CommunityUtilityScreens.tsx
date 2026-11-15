import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../theme/tokens';

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  return <View style={styles.topBar}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.title}>{title}</Text></View>;
}

export function PointsHistoryScreen({ onBack }: { onBack: () => void }) {
  const entries = [['+120', 'Beach cleanup', 'Today'], ['+80', 'Ocean sorting quiz', 'Yesterday'], ['+240', 'Community event', '12 Jun']];
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Points history" onBack={onBack} /><View style={styles.balance}><Text style={styles.label}>AVAILABLE POINTS</Text><Text style={styles.balanceValue}>2,460</Text><Text style={styles.muted}>Keep taking small actions to make a bigger impact.</Text></View>{entries.map(([points, label, date]) => <View key={`${label}-${date}`} style={styles.row}><View style={styles.icon}><Text style={styles.iconText}>✦</Text></View><View style={styles.copy}><Text style={styles.name}>{label}</Text><Text style={styles.muted}>{date}</Text></View><Text style={styles.points}>{points}</Text></View>)}</ScrollView>;
}

export function RewardsScreen({ onBack, detail = false }: { onBack: () => void; detail?: boolean }) {
  if (detail) return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Reward detail" onBack={onBack} /><View style={styles.rewardHero}><Text style={styles.rewardIcon}>♻</Text><Text style={styles.heroTitle}>Reusable bottle</Text><Text style={styles.muted}>A practical reward for the actions you take to protect the coast.</Text></View><View style={styles.card}><Text style={styles.name}>500 points</Text><Text style={styles.muted}>You have 2,460 points available.</Text><Pressable style={styles.primary} onPress={() => Alert.alert('Reward reserved', 'Your reward request has been saved for confirmation.')}><Text style={styles.primaryText}>Redeem reward</Text></Pressable></View></ScrollView>;
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Rewards" onBack={onBack} /><Text style={styles.subtitle}>Turn your ocean actions into useful, low-impact rewards.</Text>{['Reusable bottle', 'Ocean tote bag', 'Cleanup kit'].map((reward, index) => <Pressable key={reward} style={styles.row} onPress={() => Alert.alert(reward, `${[300, 500, 750][index]} points required.`)}><View style={styles.icon}><Text style={styles.iconText}>♻</Text></View><View style={styles.copy}><Text style={styles.name}>{reward}</Text><Text style={styles.muted}>{[300, 500, 750][index]} points</Text></View><Text style={styles.chevron}>›</Text></Pressable>)}</ScrollView>;
}

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const notifications = [['Report update', 'Your beach report is now under review.', '2h'], ['Event reminder', 'My Khe cleanup starts tomorrow at 07:00.', '1d'], ['Community', 'Mai Pham liked your ocean action.', '2d']];
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Notifications" onBack={onBack} />{notifications.map(([title, body, time]) => <View key={title} style={styles.notification}><View style={styles.unread} /><View style={styles.copy}><Text style={styles.name}>{title}</Text><Text style={styles.muted}>{body}</Text></View><Text style={styles.muted}>{time}</Text></View>)}</ScrollView>;
}

export function HelpCenterScreen({ onBack }: { onBack: () => void }) {
  const questions = ['How do I submit a report?', 'How are points calculated?', 'How can I join an event?', 'How do I update my profile?'];
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="Help center" onBack={onBack} /><View style={styles.helpHero}><Text style={styles.heroTitle}>How can we help?</Text><Text style={styles.muted}>Find quick answers about Ocean Project.</Text></View>{questions.map((question) => <Pressable key={question} style={styles.question} onPress={() => Alert.alert(question, 'This guide is available in the Ocean Project help center.')}><Text style={styles.name}>{question}</Text><Text style={styles.chevron}>›</Text></Pressable>)}</ScrollView>;
}

export function AboutOceanProjectScreen({ onBack }: { onBack: () => void }) {
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title="About Ocean Project" onBack={onBack} /><View style={styles.aboutHero}><Text style={styles.logo}>≈</Text><Text style={styles.heroTitle}>Ocean Project</Text><Text style={styles.muted}>A community-powered way to understand, protect and restore our ocean.</Text></View><View style={styles.card}><Text style={styles.name}>Built for meaningful action</Text><Text style={styles.muted}>Report what you see, join local events, learn with your community and track the impact of every contribution.</Text></View><Text style={styles.version}>Ocean Project · version 1.0</Text></ScrollView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 80 },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.lg, paddingTop: spacing.sm },
  back: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 22, height: 40, justifyContent: 'center', left: 0, position: 'absolute', width: 40 },
  backText: { color: colors.ink, fontSize: 30 }, title: { backgroundColor: colors.sky, borderRadius: 18, color: colors.ink, fontSize: 17, fontWeight: '700', paddingHorizontal: 22, paddingVertical: 9 },
  subtitle: { color: colors.ink, fontSize: 14, lineHeight: 21, marginBottom: spacing.lg }, balance: { backgroundColor: colors.navy, borderRadius: 18, marginBottom: spacing.lg, padding: spacing.xxl },
  label: { color: colors.mint, fontSize: 10, fontWeight: '800', letterSpacing: 1 }, balanceValue: { color: colors.white, fontSize: 42, fontWeight: '800', marginTop: spacing.sm }, muted: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  row: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: spacing.lg }, icon: { alignItems: 'center', backgroundColor: colors.mint, borderRadius: 22, height: 44, justifyContent: 'center', width: 44 }, iconText: { color: colors.navy, fontSize: 22 },
  copy: { flex: 1, marginLeft: spacing.md }, name: { color: colors.navy, fontSize: 14, fontWeight: '800' }, points: { color: colors.blue, fontSize: 14, fontWeight: '800' }, chevron: { color: colors.blue, fontSize: 24 },
  rewardHero: { alignItems: 'center', backgroundColor: '#EDFBFF', borderRadius: 18, padding: spacing.xxl }, rewardIcon: { color: colors.blue, fontSize: 54 }, heroTitle: { color: colors.navy, fontSize: 23, fontWeight: '800', marginTop: spacing.sm }, card: { borderColor: colors.line, borderRadius: 16, borderWidth: 1, marginTop: spacing.lg, padding: spacing.lg },
  primary: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 24, marginTop: spacing.lg, padding: 14 }, primaryText: { color: colors.white, fontSize: 15, fontWeight: '800' },
  notification: { alignItems: 'flex-start', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: spacing.lg }, unread: { backgroundColor: colors.coral, borderRadius: 5, height: 10, marginTop: 4, width: 10 }, helpHero: { backgroundColor: colors.sky, borderRadius: 18, padding: spacing.xxl }, question: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.lg }, aboutHero: { alignItems: 'center', backgroundColor: colors.mint, borderRadius: 18, padding: spacing.xxl }, logo: { color: colors.navy, fontSize: 52, fontWeight: '800' }, version: { color: colors.muted, fontSize: 11, marginTop: spacing.xxl, textAlign: 'center' }
});
