import { useState } from 'react';
import { Text, View } from 'react-native';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { supabase, markNotificationRead } from '../../lib/supabase';
import { matchesQuery } from './communityView';
import { result } from './workflow';

export function ApplicationQueue() {
  const { c, data, loading } = useLiveData();
  const filtered = data.applications.filter(
    (a) =>
      a.status === (c.values.applicationStatus || 'pending') &&
      matchesQuery(c.values.applicationSearch || '', a.full_name, a.location),
  );
  return (
    <FlowSection top={236}>
      {filtered.map((a) => (
        <ListRow
          key={a.user_id}
          title={a.full_name}
          description={a.location + ' · ' + a.status}
          onPress={() => {
            c.setValue('applicantId', a.user_id);
            c.go('614:766');
          }}
        />
      ))}
      {!filtered.length && (
        <Text style={styles.body}>
          {loading ? 'Loading applications…' : 'No applications in this view.'}
        </Text>
      )}
    </FlowSection>
  );
}
export function ApplicantDetail() {
  const { c, data } = useLiveData();
  const a = data.applications.find((row) => row.user_id === c.values.applicantId);
  if (!a)
    return (
      <FlowSection top={140}>
        <Text style={styles.body}>Select a volunteer application.</Text>
      </FlowSection>
    );
  function decide(status: string) {
    c.run(async () => {
      result(
        await supabase
          .from('volunteer_applications')
          .update({ status })
          .eq('user_id', a!.user_id)
          .eq('status', 'pending')
          .select('user_id')
          .single(),
      );
      c.refresh();
      c.go('605:523');
    }, true);
  }
  const reports = data.reports.filter((r) => r.owner_id === a.user_id);
  return (
    <FlowSection top={137}>
      <ListRow title={a.full_name} description={a.location + ' · ' + a.status} />
      <ListRow
        title="Application details"
        description={[a.email, a.phone, a.birth_date, a.hours, a.motivation].filter(Boolean).join('\n')}
      />
      <ListRow
        title="Report statistics"
        description={
          reports.filter((r) => r.status === 'resolved').length +
          ' verified of ' +
          reports.length +
          ' reports'
        }
      />
      {a.status === 'pending' && (
        <View style={styles.actions}>
          <SmallButton label="Approve application" onPress={() => decide('approved')} />
          <SmallButton label="Reject application" onPress={() => decide('rejected')} />
        </View>
      )}
    </FlowSection>
  );
}
const questions = [
  [
    'Which report photo is most useful?',
    'A blurred close-up',
    'A clear photo with nearby landmarks',
    'A picture of another beach',
  ],
  [
    'How should you verify a report location?',
    'Compare the coordinates and landmarks',
    'Guess from the title',
    'Ignore the coordinates',
  ],
  [
    'What determines pollution severity?',
    'Photo count',
    'Time of day',
    'Area affected and hazardous material',
  ],
  [
    'What should an organizer check before a cleanup?',
    'Shirt colors',
    'Tides, weather and access',
    'Number of likes',
  ],
  [
    'How should a cleanup start?',
    'Check in and brief participants',
    'Disperse immediately',
    'Skip the safety plan',
  ],
  [
    'What belongs in an event recap?',
    'Unverified claims',
    'An estimate of signups only',
    'Attendance, recovered waste and observations',
  ],
  [
    'Who should handle an entangled animal?',
    'A qualified rescue team',
    'The first volunteer on site',
    'Any bystander',
  ],
  [
    'What if volunteers find unknown chemicals?',
    'Move them by hand',
    'Keep people away and alert the lead',
    'Pour them into a bin',
  ],
  [
    'When waves make an area unsafe, what should the group do?',
    'Keep working quickly',
    'Work alone',
    'Stop and follow the safety plan',
  ],
  [
    'Where should volunteers meet during an incident?',
    'At random points',
    'The designated assembly point',
    'In the water',
  ],
];
export function VolunteerQuiz() {
  const { c } = useLiveData();
  const [answers, setAnswers] = useState<number[]>([]);
  if (c.values.showTrainingQuiz !== 'yes') return null;
  const index = answers.length;
  return (
    <FlowSection top={930}>
      <Text style={styles.heading}>Knowledge test</Text>
      {index < questions.length ? (
        <>
          <Text style={styles.title}>
            {index + 1}/10 · {questions[index][0]}
          </Text>
          {questions[index].slice(1).map((label, i) => (
            <SmallButton key={label} label={label} onPress={() => setAnswers((a) => [...a, i + 1])} />
          ))}
        </>
      ) : (
        <SmallButton
          label="Check answers"
          onPress={() =>
            c.run(async () => {
              const score = Number(
                result(await supabase.rpc('advance_volunteer_training', { lesson: 3, answers })),
              );
              c.setValue('quizResult', score + '/10');
              c.refresh();
              setAnswers([]);
              c.setValue('showTrainingQuiz', '');
            }, true)
          }
        />
      )}
    </FlowSection>
  );
}
export function NoticeFeed() {
  const { c, data, loading } = useLiveData();
  const mine = data.applications.find((a) => a.user_id === c.user?.id);
  const filter = c.values.noticeFilter || 'All';
  const openApplication = () =>
    c.go(!mine ? '1335:4001' : mine.status === 'approved' ? '1335:4216' : '1335:4104');
  const rows = data.notifications.filter((n) =>
    filter === 'Unread'
      ? !n.read_at
      : filter === 'Important'
        ? !!n.report_id || n.title === 'Volunteer application'
        : true,
  );
  return (
    <FlowSection top={172}>
      <ListRow
        title={mine ? 'My volunteer application' : 'OceanRescue is recruiting!'}
        description={mine?.status || 'Check volunteer eligibility and apply to protect the coast.'}
        onPress={openApplication}
      />
      {rows.map((n) => (
        <ListRow
          key={n.id}
          title={n.title}
          description={n.body + ' · ' + new Date(n.created_at).toLocaleDateString()}
          onPress={() =>
            c.run(async () => {
              if (!n.read_at) result(await markNotificationRead(n.id));
              c.refresh();
              if (n.title === 'Volunteer application') {
                openApplication();
                return;
              }
              c.setValue('notificationId', n.id);
              c.setValue('reportId', n.report_id || '');
              c.go('230:2052');
            }, true)
          }
        />
      ))}
      {!rows.length && (
        <Text style={styles.body}>{loading ? 'Loading…' : 'No notifications to display.'}</Text>
      )}
    </FlowSection>
  );
}
