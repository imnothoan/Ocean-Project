import { randomUUID } from 'expo-crypto';
import { createDonation } from '../../lib/supabase';
import { action, choices, field, result, required, type Controller } from './workflow';
export type Pledge = {
  id: string;
  amount: number;
  campaign: string;
  status: string;
  created_at: string;
};
export function donations(c: Controller, pledges: Pledge[]) {
  const { id, values: v, binding: b } = c;
  const amount = Number(v.amount || 0);
  const money = Number.isFinite(amount) ? '$' + amount.toFixed(2) : '—';
  if (id === '1581:1601') {
    choices(c, 'amount', { '1581:1609': '2', '1581:1611': '5', '1581:1613': '10', '1581:1615': '20' });
    field(c, '1581:1617', 'amount', 'Other amount', { keyboardType: 'numeric' });
    field(c, '1581:1625', 'donationNote', 'Leave a note for the campaign organizer…', {
      multiline: true,
    });
    action(c, ['1581:1620'], () => c.setValue('anonymous', v.anonymous === 'yes' ? 'no' : 'yes'));
    b.labels['1581:1620'] = v.anonymous === 'yes' ? 'Donate anonymously ✓' : 'Donate anonymously';
    action(c, ['1581:1626'], () =>
      c.run(async () => {
        if (!Number.isFinite(amount) || amount <= 0)
          throw new Error('Chọn hoặc nhập số tiền lớn hơn 0.');
        c.go('1581:1655');
      }),
    );
  }
  if (id === '1581:1655') {
    b.labels['1581:1658'] = money;
    choices(c, 'payment', {
      '1581:1664': 'MoMo',
      '1581:1668': 'ZaloPay',
      '1581:1672': 'VNPay',
      '1581:1676': 'Bank card',
      '1581:1680': 'Bank transfer QR',
    });
    action(c, ['1581:1682'], () =>
      c.run(async () => {
        required(v.payment, 'Chọn phương thức muốn sử dụng.');
        c.go('1581:1711');
      }),
    );
  }
  if (id === '1581:1711') {
    b.labels['1581:1722'] = money;
    b.labels['1581:1732'] = money;
    b.labels['1581:1726'] = v.payment || '—';
    b.labels['1581:1734'] = 'Save pledge';
    b.labels['1581:1735'] = 'Records a pledge only. No money will be charged.';
    action(c, ['1581:1733', '1581:1734'], () =>
      c.run(async () => {
        if (!Number.isFinite(amount) || amount <= 0) throw new Error('Nhập số tiền hợp lệ.');
        const campaign = required(v.campaign, 'Hãy chọn chiến dịch đã công bố.');
        const campaignId = required(v.campaignId, 'Hãy chọn chiến dịch đã công bố.');
        const fingerprint = JSON.stringify([
          campaignId,
          amount,
          v.donationNote || '',
          v.anonymous || '',
        ]);
        if (v.pledgeId && v.lastPledge === fingerprint) {
          c.go('1581:1764');
          return;
        }
        const requestId =
          v.pendingPledge === fingerprint && v.pledgeRequestId ? v.pledgeRequestId : randomUUID();
        c.setValue('pendingPledge', fingerprint);
        c.setValue('pledgeRequestId', requestId);
        const pledge = result(
          await createDonation(
            v.anonymous === 'yes' ? 'Anonymous' : 'Ocean Project supporter',
            amount,
            campaign,
            v.donationNote || '',
            requestId,
            campaignId,
          ),
        );
        if (!pledge) throw new Error('Chưa lưu được cam kết.');
        c.setValue('lastPledge', fingerprint);
        c.setValue('pledgeId', pledge.id);
        c.refresh();
        c.go('1581:1764');
      }, true),
    );
  }
  if (id === '1581:1764') {
    Object.assign(b.labels, {
      '1581:1766': 'Pledge saved',
      '1581:1768': 'Your pledge is awaiting payment.',
      '1581:1771': money + ' pledged.',
      '1581:1774': 'View pledge history',
      '1581:1779': 'No payment has been taken.',
      '1581:1785': 'Pledge recorded',
    });
    action(c, ['1581:1773', '1581:1774'], () => c.go('1581:1920'));
    action(c, ['1581:1778'], () => c.go('258:426'));
  }
  if (id === '1581:1920') {
    const total = pledges
      .filter((p) => p.status === 'confirmed')
      .reduce((sum, p) => sum + Number(p.amount), 0);
    b.labels['1581:1923'] = '$' + total.toFixed(2);
    b.labels['1581:1925'] = '—';
    b.labels['1581:1959'] = pledges.length + ' pledges';
    [
      ['1581:1936', '1581:1937', '1581:1938', '1581:1940'],
      ['1581:1942', '1581:1943', '1581:1944', '1581:1946'],
      ['1581:1948', '1581:1949', '1581:1950', '1581:1952'],
      ['1581:1954', '1581:1955', '1581:1956', '1581:1958'],
    ].forEach(([campaign, date, value, status], i) => {
      const p = pledges[i];
      b.labels[campaign] = p?.campaign || (!i ? 'No contributions yet' : '');
      b.labels[date] = p ? new Date(p.created_at).toLocaleDateString() : '';
      b.labels[value] = p ? '$' + Number(p.amount).toFixed(2) : '';
      b.labels[status] = p?.status || '';
    });
  }
}
