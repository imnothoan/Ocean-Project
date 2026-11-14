export type ScreenDefinition = {
  id: string;
  group: string;
  title: string;
  description: string;
  action?: string;
};

const define = (group: string, names: string[], description: string): ScreenDefinition[] =>
  names.map((title) => ({
    id: `${group}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    group,
    title,
    description
  }));

export const screenCatalog: ScreenDefinition[] = [
  ...define('Map & Admin', ['Q - 44', 'Q - 43', 'Q - 42', 'Q - 41', 'Q - 39', 'Q - 40', 'Q - 38', 'Q - 37', 'Q - 26', 'Q - 36', 'Q - 28', 'Q - 27', 'Q - 35', 'Q - 34', 'Q - 10', 'Q - 14', 'Q - 15', 'Q - 45', 'Q - 22', 'Q - 31', 'Q - 21', 'Q - 7', 'Q - 2', 'Q - 3', 'Q - 20'], 'Interactive map and administration flow.'),
  ...define('Report Flow', ['19. Add Follow-up Evidence', '17. Edit Report', '20. Report Resolved / Impact', '1. Report type', '9. My Report History', '14. Notification Inbox', '15. Notification Detail', '10. Rare Species Photo', '12. Rare Species Location', '13. Rare Species Review', '11. Rare Species Type', '16. Report Status Tracker', '7. Pollution Review', '8. Pollution Submitted', '6. Pollution More Detail', '2. Pollution Add Photo', '3. Pollution Select Location', '4. Pollution Severity', '5. Pollution Waste Type'], 'Report submission, review, history and resolution.'),
  ...define('Data & Donate', ['Frame 3 - Top Donors', 'Frame 1 - Fundraising Campaigns', 'Frame 2 - Campaign Detail', 'D5 - Campaign Updates', 'D2 - Payment Method', 'D1 - Donate', 'D3 - Donation Confirmation', 'D4 - Donation Success', 'D6 - Impact Report', 'D7 - Donation History', 'D8 - Donation Certificate', 'Frame 7 - Area Details Metrics', 'Frame 6 - Area Comparison', 'Frame 5 - Waste Composition', 'Frame 4 - Time Trends Analytics', 'Frame 3 - Area Rankings', 'Frame 12 - Export & Share', 'Frame 11 - Eco History Log', 'Frame 10 - Eco-Impact Metrics', 'Frame 9 - Campaign Impact Stats', 'Frame 8 - Heatmap Data Overview', 'Frame 2 - Community Dashboard'], 'Transparent impact analytics and donation journeys.'),
  ...define('Event Flow', ['Approve Participants', 'Posting Event Recap', 'Create Event - Step 3', 'Edit Event', 'Event Home - CTV', 'Event Manage', 'Create Event - Step 4', 'Create Event - Step 2', 'Create Event - Step 1', 'Event Recap', 'Event Participants', 'Events Home', 'Event Feedback', 'Event Certificate', 'Event Check-in Completed', 'Event Check-in', 'Event Group Chat', 'My Event', 'Event Checklist', 'Event Registration', 'Event Detail', 'Event Calendar', 'Events Search Filter'], 'Discover, create, join and complete community events.'),
  ...define('Community & Gamification', ['Community', 'Profile & Gamification', 'Knowledge', 'share', 'Rectangle 792', 'Rectangle 793', 'Rectangle 794', 'Rectangle 795', 'Community Feed', 'Post Detail', 'Create Post', 'Comments', 'Likes', 'Leaderboard', 'Challenges', 'Challenge Detail', 'Badge Collection', 'Badge Detail', 'Points History', 'Rewards', 'Reward Detail', 'Notifications', 'Notification Settings', 'Account Settings', 'Help Center', 'About Ocean Project', 'Learning Quiz'], 'Community, knowledge, rewards and personal progress.')
];

export const screenCount = screenCatalog.length;
