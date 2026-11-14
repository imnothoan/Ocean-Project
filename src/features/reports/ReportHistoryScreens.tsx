import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { loadNotifications, loadReports, loadReportStatusHistory, markNotificationRead, type OceanNotification, type OceanReport, type ReportStatusHistory } from '../../lib/supabase';
import { colors, radii, spacing, typography } from '../../theme/tokens';

type Props = { onBack: () => void };

export function ReportHistoryScreen({ onBack }: Props) {
  const [reports, setReports] = useState<OceanReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<OceanReport | null>(null);

  useEffect(() => {
    loadReports().then(({ data }) => {
      if (data) setReports(data);
      setLoading(false);
    });
  }, []);

  if (selected) return <ReportStatusScreen report={selected} onBack={() => setSelected(null)} />;
  return <ScreenFrame title="Lịch sử báo cáo" subtitle="Theo dõi tất cả báo cáo bạn đã gửi." onBack={onBack}>{loading ? <ActivityIndicator color={colors.blue} /> : reports.length ? reports.map((report) => <Pressable key={report.id} style={styles.row} onPress={() => setSelected(report)}><View style={styles.rowIcon}><Text>♒</Text></View><View style={styles.flex}><Text style={styles.rowTitle}>{report.title}</Text><Text style={styles.meta}>{report.location}</Text></View><StatusBadge status={report.status} /><Text style={styles.chevron}>›</Text></Pressable>) : <EmptyState text="Bạn chưa có báo cáo nào." />}</ScreenFrame>;
}

function ReportStatusScreen({ report, onBack }: { report: OceanReport; onBack: () => void }) {
  const [history, setHistory] = useState<ReportStatusHistory[]>([]);
  useEffect(() => {
    loadReportStatusHistory(report.id).then(({ data }) => {
      if (data) setHistory(data);
    });
  }, [report.id]);
  const items = history.length ? history : [{ id: 'local', report_id: report.id, status: report.status, note: 'Báo cáo đã được tiếp nhận.', created_at: report.created_at }];
  return <ScreenFrame title="Trạng thái báo cáo" subtitle={report.title} onBack={onBack}><View style={styles.location}><Text style={styles.meta}>VỊ TRÍ</Text><Text style={styles.rowTitle}>{report.location}</Text></View><View style={styles.timeline}>{items.map((item, index) => <View key={item.id} style={styles.timelineRow}><View style={styles.timelineRail}><View style={styles.timelineDot} />{index < items.length - 1 ? <View style={styles.timelineLine} /> : null}</View><View style={styles.flex}><Text style={styles.rowTitle}>{labelForStatus(item.status)}</Text><Text style={styles.meta}>{item.note}</Text><Text style={styles.date}>{new Date(item.created_at).toLocaleDateString('vi-VN')}</Text></View></View>)}</View></ScreenFrame>;
}

export function NotificationInboxScreen({ onBack }: Props) {
  const [notifications, setNotifications] = useState<OceanNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<OceanNotification | null>(null);
  useEffect(() => {
    loadNotifications().then(({ data }) => {
      if (data) setNotifications(data);
      setLoading(false);
    });
  }, []);
  async function open(notification: OceanNotification) {
    setSelected(notification);
    if (!notification.read_at) {
      const { error } = await markNotificationRead(notification.id);
      if (!error) setNotifications((items) => items.map((item) => item.id === notification.id ? { ...item, read_at: new Date().toISOString() } : item));
    }
  }
  if (selected) return <ScreenFrame title="Chi tiết thông báo" subtitle={selected.title} onBack={() => setSelected(null)}><View style={styles.notificationDetail}><Text style={styles.notificationIcon}>✦</Text><Text style={styles.detailTitle}>{selected.title}</Text><Text style={styles.detailBody}>{selected.body}</Text><Text style={styles.date}>{new Date(selected.created_at).toLocaleString('vi-VN')}</Text></View></ScreenFrame>;
  return <ScreenFrame title="Thông báo" subtitle="Cập nhật mới nhất về hoạt động của bạn." onBack={onBack}>{loading ? <ActivityIndicator color={colors.blue} /> : notifications.length ? notifications.map((notification) => <Pressable key={notification.id} style={[styles.row, !notification.read_at && styles.unread]} onPress={() => open(notification)}><View style={styles.rowIcon}><Text>✦</Text></View><View style={styles.flex}><Text style={styles.rowTitle}>{notification.title}</Text><Text style={styles.meta} numberOfLines={2}>{notification.body}</Text></View><Text style={styles.chevron}>›</Text></Pressable>) : <EmptyState text="Bạn chưa có thông báo mới." />}</ScreenFrame>;
}

function ScreenFrame({ title, subtitle, onBack, children }: { title: string; subtitle: string; onBack: () => void; children: React.ReactNode }) {
  return <ScrollView contentContainerStyle={styles.content}><Pressable onPress={onBack}><Text style={styles.back}>‹ Quay lại</Text></Pressable><Text style={styles.eyebrow}>OCEAN PROJECT</Text><Text style={styles.heading}>{title}</Text><Text style={styles.subtitle}>{subtitle}</Text>{children}</ScrollView>;
}

function StatusBadge({ status }: { status: OceanReport['status'] }) {
  return <View style={styles.badge}><Text style={styles.badgeText}>{labelForStatus(status)}</Text></View>;
}

function EmptyState({ text }: { text: string }) {
  return <View style={styles.empty}><Text style={styles.emptyIcon}>○</Text><Text style={styles.meta}>{text}</Text></View>;
}

function labelForStatus(status: OceanReport['status']) {
  return status === 'resolved' ? 'Đã xử lý' : status === 'reviewing' ? 'Đang xem xét' : 'Đã gửi';
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, paddingBottom: 100 },
  back: { color: colors.blue, fontSize: 14, fontWeight: '700', marginBottom: spacing.xxxl },
  eyebrow: { color: colors.blue, ...typography.eyebrow, marginBottom: spacing.sm },
  heading: { color: colors.navy, ...typography.title },
  subtitle: { color: colors.muted, ...typography.body, marginBottom: spacing.xxl, marginTop: spacing.sm },
  row: { alignItems: 'center', backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.lg, borderWidth: 1, flexDirection: 'row', marginBottom: spacing.md, padding: spacing.md },
  unread: { backgroundColor: colors.mint, borderColor: colors.aqua },
  rowIcon: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: radii.md, height: 42, justifyContent: 'center', marginRight: spacing.md, width: 42 },
  flex: { flex: 1 },
  rowTitle: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  meta: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: spacing.xs },
  chevron: { color: colors.blue, fontSize: 24, marginLeft: spacing.sm },
  badge: { backgroundColor: colors.mint, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  badgeText: { color: colors.positive, fontSize: 10, fontWeight: '800' },
  location: { backgroundColor: colors.aqua, borderRadius: radii.lg, marginBottom: spacing.xl, padding: spacing.lg },
  timeline: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.lg, borderWidth: 1, padding: spacing.lg },
  timelineRow: { flexDirection: 'row', minHeight: 74 },
  timelineRail: { alignItems: 'center', marginRight: spacing.md, width: 16 },
  timelineDot: { backgroundColor: colors.blue, borderRadius: 7, height: 14, width: 14 },
  timelineLine: { backgroundColor: colors.aqua, flex: 1, marginVertical: 3, width: 2 },
  date: { color: colors.muted, fontSize: 11, marginTop: spacing.sm },
  notificationDetail: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.xl, borderWidth: 1, padding: spacing.xl },
  notificationIcon: { color: colors.blue, fontSize: 32 },
  detailTitle: { color: colors.navy, fontSize: 20, fontWeight: '800', marginTop: spacing.md },
  detailBody: { color: colors.ink, fontSize: 14, lineHeight: 22, marginTop: spacing.md },
  empty: { alignItems: 'center', backgroundColor: colors.white, borderColor: colors.line, borderRadius: radii.xl, borderWidth: 1, padding: spacing.xxxl },
  emptyIcon: { color: colors.muted, fontSize: 42, marginBottom: spacing.md }
});
