import { supabase } from '../../lib/supabase';
import { action, choices, field, required, result, type Controller } from './workflow';
import type { ProjectData } from './useProjectData';

export type VolunteerApplication = {
  user_id: string;
  full_name: string;
  birth_date: string;
  email: string;
  phone: string;
  location: string;
  motivation: string;
  hours: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string | null;
  lessons: number;
  quiz_score: number | null;
};
export const lessons = ['1335:4425', '1335:4572', '1335:4756'];
export function volunteer(c: Controller, data: ProjectData) {
  const { id, user, values: v, binding: b } = c;
  const mine = data.applications.find((a) => a.user_id === user?.id);
  const verified = data.reports.filter((r) => r.owner_id === user?.id && r.status === 'resolved').length;
  const statusPage = mine?.status === 'approved' ? '1335:4216' : '1335:4104';
  if (id === '1358:343')
    choices(c, 'noticeFilter', { '1358:471': 'All', '1358:474': 'Unread', '1358:477': 'Important' });
  if (id === '1335:4001') {
    b.labels['1335:4065'] = 'Verified reports: ' + Math.min(3, verified) + ' of 3';
    b.labels['1335:4066'] =
      verified >= 3 ? 'Report requirement met' : 'Submit reports and check their review status.';
    b.labels['1335:4057'] = 'Confirmed from the date on your application';
    b.labels['1335:4052'] = mine ? mine.status.toUpperCase() : verified >= 3 ? 'READY' : 'IN PROGRESS';
    b.labels['1335:4072'] = mine
      ? 'View application'
      : verified >= 3
        ? 'Apply to volunteer'
        : 'View my reports';
    action(c, ['1335:4069', '1335:4072'], () =>
      c.go(mine ? statusPage : verified >= 3 ? '1335:4347' : '230:1379'),
    );
  }
  if (id === '1335:4347') {
    const draft = (node: string, key: string, placeholder: string, initial = '', multiline = false) =>
      field(c, node, 'application:' + key, placeholder, {
        value: v['application:' + key] ?? initial,
        multiline,
      });
    draft('1335:4366', 'name', 'Full name', data.profile.display_name);
    draft('1335:4370', 'birth', 'YYYY-MM-DD');
    draft('1335:4375', 'email', 'Email', user?.email);
    draft('1335:4379', 'phone', 'Phone number (optional)');
    draft('1335:4383', 'place', 'Preferred location', data.profile.location);
    draft('1335:4387', 'reason', 'Why do you want to volunteer?', '', true);
    choices(c, 'application:hours', {
      '1335:4393': '2-4 hours',
      '1335:4394': '8+ hours',
      '1335:4397': '4-8 hours',
    });
    b.labels['1335:4388'] = (v['application:reason'] || '').length + '/300';
    b.labels['1335:4402'] =
      (v['application:consent'] === 'yes' ? '☑ ' : '☐ ') +
      'I confirm the information is accurate and agree to the volunteer terms.';
    action(c, ['1335:4399', '1335:4402'], () =>
      c.setValue('application:consent', v['application:consent'] === 'yes' ? '' : 'yes'),
    );
    action(c, ['1335:4403', '1335:4406'], () =>
      c.run(async () => {
        if (mine) {
          c.go(statusPage);
          return;
        }
        if (verified < 3) throw new Error('Cần 3 báo cáo đã được xác nhận.');
        const birth = required(v['application:birth'], 'Nhập ngày sinh theo YYYY-MM-DD.');
        const birthday = new Date(birth + 'T00:00:00Z');
        const threshold = new Date();
        threshold.setFullYear(threshold.getFullYear() - 18);
        if (
          !/^\d{4}-\d\d-\d\d$/.test(birth) ||
          !Number.isFinite(+birthday) ||
          birthday.toISOString().slice(0, 10) !== birth ||
          birthday > threshold
        )
          throw new Error('Cần ngày sinh hợp lệ và đủ 18 tuổi.');
        const email = required(v['application:email'] ?? user?.email, 'Nhập email.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Email chưa đúng định dạng.');
        const motivation = required(v['application:reason'], 'Nhập lý do tham gia.');
        if (motivation.length < 3 || motivation.length > 300)
          throw new Error('Lý do tham gia cần từ 3 đến 300 ký tự.');
        if (v['application:consent'] !== 'yes') throw new Error('Xác nhận điều khoản trước khi gửi.');
        result(
          await supabase
            .from('volunteer_applications')
            .insert({
              full_name: required(v['application:name'] ?? data.profile.display_name, 'Nhập tên.'),
              birth_date: birth,
              email,
              phone: v['application:phone'] || '',
              location: required(v['application:place'] ?? data.profile.location, 'Nhập địa điểm.'),
              motivation,
              hours: required(v['application:hours'], 'Chọn thời gian có thể tham gia.'),
              terms_accepted: true,
            }),
        );
        for (const key of Object.keys(v).filter((key) => key.startsWith('application:')))
          c.setValue(key, '');
        c.refresh();
        c.go('1335:4104');
      }, true),
    );
  }
  if (id === '1335:4104') {
    Object.assign(b.labels, {
      '1335:4123': mine ? 'Application ' + mine.status : 'No application yet',
      '1335:4124':
        mine?.status === 'pending'
          ? 'Your application is waiting for a reviewer.'
          : mine
            ? 'Your decision is available.'
            : 'Check volunteer eligibility to apply.',
      '1335:4150': mine ? new Date(mine.submitted_at).toLocaleString() : '—',
      '1335:4156': mine ? 'Completed' : '—',
      '1335:4160': 'Eligibility checked',
      '1335:4161': mine ? 'Age and report requirements met' : '—',
      '1335:4167': mine ? 'Completed' : '—',
      '1335:4172': mine?.reviewed_at ? new Date(mine.reviewed_at).toLocaleString() : '—',
      '1335:4179': mine?.status === 'pending' ? 'In progress' : mine ? 'Completed' : '—',
      '1335:4190': mine?.status || '—',
      '1335:4184': mine?.reviewed_at ? 'Review completed' : 'Awaiting decision',
    });
  }
  if (id === '605:523') {
    field(c, '606:651', 'applicationSearch', 'Search applications');
    choices(c, 'applicationStatus', {
      '606:626': 'pending',
      '606:636': 'rejected',
      '606:638': 'approved',
    });
    b.labels['606:626'] =
      'Pending (' + data.applications.filter((a) => a.status === 'pending').length + ')';
  }
  if (id === '1335:4216') {
    const done = mine?.lessons || 0,
      passed = (mine?.quiz_score ?? 0) >= 8;
    Object.assign(b.labels, {
      '1335:4230': data.profile.display_name || 'Volunteer',
      '1335:4234': done + '/3 lessons',
      '1335:4254': done + '/3 modules completed',
      '1335:4260': done === 3 ? 'Completed' : 'Learning',
      '1335:4240': passed
        ? 'Knowledge test passed. Explore events to continue.'
        : 'Complete all three lessons and score 8/10 on the knowledge test.',
      '1335:4324': mine?.quiz_score != null ? mine.quiz_score + '/10' : 'Pending',
      '1335:4306': passed ? 'Available' : 'Locked',
      '1335:4328': done < 3 ? 'Learn' : passed ? 'Events' : 'Quiz',
    });
    action(c, ['1335:4326', '1335:4328'], () => {
      if (done < 3) c.go(lessons[done]);
      else if (passed) c.go('258:426');
      else c.setValue('showTrainingQuiz', 'yes');
    });
  }
  const index = lessons.indexOf(id);
  if (index >= 0) {
    b.labels[['1335:4450', '1335:4601', '1335:4786'][index]] =
      Math.round(((mine?.lessons || 0) / 3) * 100) + '%';
    const checks = ['1335:5011', '1335:5022', '1335:5029', '1335:5037', '1335:5045', '1335:5054'];
    const chosen = (v.safetyChecklist || '').split('|').filter(Boolean);
    if (index === 2) {
      b.labels['1335:5004'] = chosen.length + '/6';
      b.labels['1335:5054'] = 'Know whom to contact in an emergency';
      for (const n of checks) {
        b.tint[n] = chosen.includes(n) ? '#0186a8' : '#222222';
        action(c, [n], () =>
          c.setValue(
            'safetyChecklist',
            (chosen.includes(n) ? chosen.filter((key) => key !== n) : [...chosen, n]).join('|'),
          ),
        );
      }
    }
    action(c, [['1335:4525', '1335:4734', '1335:5058'][index]], () =>
      c.run(async () => {
        if (index === 2 && chosen.length !== 6) throw new Error('Xác nhận đủ 6 mục an toàn.');
        result(await supabase.rpc('advance_volunteer_training', { lesson: index + 1 }));
        c.refresh();
        c.go(lessons[index + 1] || '1335:4216');
      }, true),
    );
  }
}
