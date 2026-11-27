export type BadgeMetric =
  | 'actions'
  | 'resolved'
  | 'events'
  | 'learning'
  | 'streak'
  | 'posts'
  | 'pollution'
  | 'wildlife'
  | 'recycling'
  | 'comments'
  | 'saved'
  | 'claims';
export type BadgeMetrics = Partial<Record<BadgeMetric, number>>;
export type BadgeCategory = 'Community' | 'Cleanup' | 'Knowledge';
export type Badge = {
  title: string;
  category: BadgeCategory;
  metric: BadgeMetric;
  target: number;
  goal: string;
  route: string;
  art: number;
};

function badge(
  title: string,
  category: BadgeCategory,
  metric: BadgeMetric,
  target: number,
  goal: string,
  route: string,
  art: number,
): Badge {
  return { title, category, metric, target, goal, route, art };
}
export const badges = [
  badge('First Step', 'Community', 'actions', 1, 'Earn points for one activity', '263:2756', 0),
  badge('Report Guardian', 'Cleanup', 'resolved', 3, 'Have 3 reports resolved', '230:1379', 1),
  badge('Team Player', 'Cleanup', 'events', 3, 'Check in at 3 events', '258:426', 2),
  badge('Nature Guide', 'Knowledge', 'learning', 2, 'Finish both learning activities', '244:550', 3),
  badge('7-Day Streak', 'Community', 'streak', 7, 'Earn points 7 days in a row', '670:5000', 4),
  badge('Community Builder', 'Community', 'posts', 3, 'Publish 3 community posts', '101:2769', 5),
  badge('First Cleanup', 'Cleanup', 'events', 1, 'Check in at your first event', '258:426', 2),
  badge('Field Observer', 'Cleanup', 'resolved', 1, 'Have your first report resolved', '230:1093', 1),
  badge('Wildlife Friend', 'Knowledge', 'wildlife', 1, 'Have a wildlife report resolved', '230:1356', 3),
  badge('Zero Waste', 'Cleanup', 'recycling', 1, 'Have a recycling report resolved', '230:1093', 1),
  badge('Coast Watch', 'Cleanup', 'pollution', 1, 'Have a pollution report resolved', '230:1213', 1),
  badge('First Lesson', 'Knowledge', 'learning', 1, 'Finish a learning activity', '244:550', 3),
  badge('Bookmarker', 'Knowledge', 'saved', 1, 'Save a guide for later', '244:550', 3),
  badge('Field Library', 'Knowledge', 'saved', 3, 'Save 3 different guides', '244:550', 3),
  badge('First Voice', 'Community', 'posts', 1, 'Publish your first post', '115:422', 5),
  badge(
    'Conversation Starter',
    'Community',
    'comments',
    1,
    'Comment on a community post',
    '101:2769',
    5,
  ),
  badge('Eco Mentor', 'Community', 'comments', 5, 'Contribute 5 comments', '101:2769', 5),
  badge('Community Reporter', 'Community', 'posts', 10, 'Publish 10 community posts', '101:2769', 5),
  badge('Steady Steps', 'Community', 'streak', 3, 'Earn points 3 days in a row', '670:5000', 4),
  badge('Ocean Regular', 'Cleanup', 'events', 5, 'Check in at 5 events', '258:426', 2),
  badge('Cleanup Veteran', 'Cleanup', 'events', 10, 'Check in at 10 events', '258:426', 2),
  badge('Ocean Advocate', 'Cleanup', 'resolved', 10, 'Have 10 reports resolved', '230:1379', 1),
  badge('First Reward', 'Community', 'claims', 1, 'Redeem a reward with your points', '240:442', 0),
  badge('Ocean Champion', 'Community', 'actions', 25, 'Earn points for 25 activities', '263:2756', 0),
];
export function badgeProgress(b: Badge, metrics: BadgeMetrics) {
  return Math.min(b.target, Math.max(0, metrics[b.metric] ?? 0));
}
