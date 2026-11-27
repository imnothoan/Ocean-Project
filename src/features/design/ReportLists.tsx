import { Text, View } from 'react-native';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { ReportEvidence } from './ReportEvidence';
import { matchesQuery } from './communityView';
import { result } from './workflow';
import { markNotificationRead, type OceanReport } from '../../lib/supabase';

export function ReportHistory({ moderation = false }: { moderation?: boolean }) {
  const { c, data, loading } = useLiveData();
  const { values: v } = c;
  const usersReports = data.reports.filter((r) => r.owner_id === c.user?.id);
  const rows = moderation
    ? data.reports.filter(
        (r) =>
          ['submitted', 'reviewing'].includes(r.status) &&
          matchesQuery(v.modSearch || '', r.title, r.location, r.id) &&
          (!v.modSeverity ||
            v.modSeverity === 'All' ||
            (v.modSeverity === 'Urgent'
              ? ['High', 'Critical'].includes(r.details?.severity || '')
              : r.details?.severity === v.modSeverity)),
      )
    : usersReports.filter((r) =>
        v.historyFilter === 'Verified'
          ? r.status === 'resolved'
          : v.historyFilter === 'Pending'
            ? ['submitted', 'reviewing'].includes(r.status)
            : true,
      );
  const open = (row: OceanReport) => {
    c.setValue('reportId', row.id);
    c.setValue('rejectReason', '');
    c.setValue('evidenceIndex', '0');
    c.go(moderation ? '692:816' : '1249:216');
  };
  return (
    <FlowSection top={moderation ? 235 : 265}>
      {moderation && <Text style={styles.body}>{rows.length} reports awaiting review</Text>}
      {rows.map((r) => (
        <ListRow
          key={r.id}
          title={r.title}
          description={[r.location, new Date(r.created_at).toLocaleDateString(), r.status].join(' · ')}
          onPress={() => open(r)}
        />
      ))}
      {!rows.length && (
        <Text style={styles.body}>
          {loading
            ? 'Loading reports…'
            : moderation
              ? 'No pending reports.'
              : 'No reports match this filter.'}
        </Text>
      )}
      {!moderation && <SmallButton label="Create new report" onPress={() => c.go('230:1093')} />}
    </FlowSection>
  );
}

export function ReportTimeline() {
  const { c, data, loading } = useLiveData();
  const report = data.reports.find((r) => r.id === c.values.reportId);
  if (!report)
    return (
      <FlowSection top={280}>
        <Text style={styles.body}>{loading ? 'Loading report…' : 'Report unavailable.'}</Text>
      </FlowSection>
    );
  const history = (report.report_status_history || [])
    .slice()
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
  return (
    <FlowSection top={315}>
      <Text style={styles.heading}>Status history</Text>
      {history.map((step, i) => (
        <ListRow
          key={step.created_at + step.status + i}
          title={step.status}
          description={new Date(step.created_at).toLocaleString() + ' · ' + step.note}
        />
      ))}
      <View style={styles.actions}>
        {report.owner_id === c.user?.id && (
          <>
            {report.status === 'submitted' && (
              <SmallButton label="Edit report" onPress={() => c.go('1253:343')} />
            )}
            <SmallButton label="Add follow-up evidence" onPress={() => c.go('1253:427')} />
          </>
        )}
        {report.status === 'resolved' && (
          <SmallButton label="View impact" onPress={() => c.go('1253:517')} />
        )}
      </View>
      {(report.report_followups || []).map((f, i) => (
        <ListRow
          key={f.created_at + i}
          title={f.note || 'Photo update'}
          description={new Date(f.created_at).toLocaleString()}
        >
          {!!f.evidence_path && (
            <View style={{ height: 140 }}>
              <ReportEvidence path={f.evidence_path} />
            </View>
          )}
        </ListRow>
      ))}
    </FlowSection>
  );
}

export function ReportInbox() {
  const { c, data, loading } = useLiveData();
  const filter = c.values.inboxFilter;
  const rows = data.notifications.filter((n) =>
    filter === 'Unread' ? !n.read_at : filter === 'Alerts' ? !!n.report_id : true,
  );
  return (
    <FlowSection top={267}>
      {rows.map((n) => (
        <ListRow
          key={n.id}
          title={n.title}
          description={
            n.body + ' · ' + new Date(n.created_at).toLocaleDateString() + (n.read_at ? '' : ' · Unread')
          }
          onPress={() =>
            c.run(async () => {
              if (!n.read_at) result(await markNotificationRead(n.id));
              c.setValue('notificationId', n.id);
              c.setValue('reportId', n.report_id || '');
              c.refresh();
              if (n.title === 'Volunteer application') {
                const own = data.applications.find((a) => a.user_id === c.user?.id);
                c.go(own?.status === 'approved' ? '1335:4216' : '1335:4104');
              } else c.go('230:2052');
            }, true)
          }
        />
      ))}
      {!rows.length && (
        <Text style={styles.body}>
          {loading ? 'Loading notifications…' : 'No notifications in this view.'}
        </Text>
      )}
    </FlowSection>
  );
}
