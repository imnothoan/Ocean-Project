import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createCommunityPost } from '../../lib/supabase';
import { colors, radii, spacing } from '../../theme/tokens';

const cleanupImage = require('../../../assets/community/cleanup-beach.png');

type Props = { onBack: () => void };

export function CommunityFlowRoot({ onBack }: Props) {
  const [screen, setScreen] = useState<'feed' | 'post' | 'create'>('feed');
  if (screen === 'post') return <CommunityPostDetailsScreen onBack={() => setScreen('feed')} />;
  if (screen === 'create') return <CreateCommunityPostScreen onBack={() => setScreen('feed')} />;
  return <CommunityFeedScreen onBack={onBack} onOpenPost={() => setScreen('post')} onCreatePost={() => setScreen('create')} />;
}

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={styles.topBar}>
      <Pressable accessibilityLabel="Go back" onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <View style={styles.topTitle}><Text style={styles.topTitleText}>{title}</Text></View>
    </View>
  );
}

function Avatar({ initials }: { initials: string }) {
  return <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>;
}

export function CommunityFeedScreen({ onBack, onOpenPost, onCreatePost }: Props & { onOpenPost: () => void; onCreatePost: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.search}><Text style={styles.searchIcon}>⌕</Text><Text style={styles.searchText}>Search posts, groups or people</Text><Text style={styles.filter}>☷</Text></View>
      <View style={styles.hero}><Image source={cleanupImage} style={styles.heroImage} /><View style={styles.heroShade} /><View style={styles.heroCopy}><Text style={styles.heroPill}>LOCAL IMPACT</Text><Text style={styles.heroTitle}>Small actions.{'\n'}Cleaner shores.</Text><Text style={styles.heroMeta}>1,248 neighbors making waves together</Text></View></View>
      <View style={styles.tabs}><Text style={[styles.tab, styles.tabActive]}>For you</Text><Text style={styles.tab}>Following</Text><Text style={styles.tab}>Group</Text><Text style={styles.filter}>☷</Text></View>
      <Pressable onPress={onCreatePost} style={styles.shareComposer}><Avatar initials="HN" /><Text style={styles.shareText}>Share a small action...</Text><Text style={styles.shareIcon}>▧  ◉</Text></Pressable>
      <Pressable onPress={onOpenPost} style={styles.post}>
        <View style={styles.postHeader}><Avatar initials="LN" /><View style={styles.flex}><Text style={styles.name}>Linh Nguyen</Text><Text style={styles.meta}>Da Nang · 18 min ago</Text></View><Text style={styles.more}>•••</Text></View>
        <Text style={styles.postTitle}>Sunday cleanup with our neighborhood team!</Text>
        <Text style={styles.postBody}>12 bags collected along My Khe Beach.</Text>
        <Image source={cleanupImage} style={styles.postImage} />
        <View style={styles.postStats}><Text style={styles.stat}>♡ 24</Text><Text style={styles.stat}>◯ 8 comments</Text><Text style={styles.stat}>♧</Text></View>
        <View style={styles.spotlight}><Text style={styles.spotlightLabel}>COMMUNITY SPOTLIGHT</Text><Text style={styles.spotlightTitle}>Every bag keeps wildlife safer.</Text><Text style={styles.meta}>Join this weekend's cleanup near you.</Text><Text style={styles.actionPill}>▣  See local actions</Text></View>
      </Pressable>
      <View style={styles.bottomBar}><Text>⌖</Text><Text>▣</Text><Text style={styles.addButton} onPress={onCreatePost}>＋</Text><Text style={styles.selectedNav}>♧</Text><Text>◎</Text></View>
    </ScrollView>
  );
}

export function CommunityPostDetailsScreen({ onBack }: Props) {
  const [comment, setComment] = useState('');
  const comments = [
    ['MP', 'Mai Pham', 'This is inspiring! I’ll join next time.', '2 min'],
    ['BL', 'Bao Le', 'Thank you for keeping our beach clean.', '8 min'],
    ['AV', 'An Vu', 'Which area did you start from?', '12 min']
  ];
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TopBar title="Post details" onBack={onBack} />
      <View style={styles.postHeader}><Avatar initials="LN" /><View style={styles.flex}><Text style={styles.name}>Linh Nguyen</Text><Text style={styles.meta}>Da Nang · 18 min ago</Text></View><Text style={styles.more}>•••</Text></View>
      <Text style={styles.postTitle}>Sunday cleanup with our neighborhood team!</Text>
      <Text style={styles.postBody}>We collected 12 bags of litter along the beach.</Text>
      <Image source={cleanupImage} style={styles.detailImage} />
      <View style={styles.postStats}><Text style={styles.stat}>♡ 24 likes</Text><Text style={styles.stat}>◯ 8 comments</Text><Text style={styles.stat}>♧</Text></View>
      <View style={styles.commentsHeader}><Text style={styles.commentsTitle}>Comments</Text><Text style={styles.meta}>8</Text><Text style={styles.topLink}>Top</Text></View>
      {comments.map(([initials, name, text, time]) => <View key={name} style={styles.comment}><Avatar initials={initials} /><View style={styles.flex}><View style={styles.commentTop}><Text style={styles.name}>{name}</Text><Text style={styles.meta}>{time}</Text></View><Text style={styles.commentText}>{text}</Text></View></View>)}
      <View style={styles.commentInput}><Avatar initials="HN" /><TextInput value={comment} onChangeText={setComment} placeholder="Write a comment..." placeholderTextColor={colors.muted} style={styles.commentField} /><Pressable accessibilityLabel="Send comment" onPress={() => setComment('')}><Text style={styles.send}>➤</Text></Pressable></View>
    </ScrollView>
  );
}

export function CreateCommunityPostScreen({ onBack }: Props) {
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState('Beach cleanup');
  const [busy, setBusy] = useState(false);
  async function publish() {
    if (body.trim().length < 3) {
      Alert.alert('Add a little more', 'Write at least 3 characters before publishing.');
      return;
    }

    setBusy(true);
    const result = await createCommunityPost(body.trim(), topic);
    setBusy(false);
    if (result.error) {
      Alert.alert('Could not publish', result.error.message);
      return;
    }
    Alert.alert('Post published', 'Your community update is now live.', [{ text: 'Done', onPress: onBack }]);
  }
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TopBar title="Create a post" onBack={onBack} />
      <View style={styles.postHeader}><Avatar initials="H" /><View style={styles.flex}><Text style={styles.name}>Hoan</Text><Text style={styles.meta}>Posting to Community</Text></View><Text style={styles.public}>Public</Text></View>
      <TextInput value={body} onChangeText={setBody} multiline placeholder="What would you like to share?" placeholderTextColor={colors.muted} style={styles.composeInput} />
      <Text style={styles.meta}>A clean-up, a discovery, or a little win...</Text>
      <View style={styles.divider} />
      <View style={styles.rowBetween}><Text style={styles.sectionTitle}>Add photos</Text><Text style={styles.meta}>Up to 4 photos</Text></View>
      <View style={styles.photoRow}><Image source={cleanupImage} style={styles.photoThumb} /><Pressable style={styles.addPhoto}><Text style={styles.photoIcon}>▧</Text><Text style={styles.actionText}>Add photo</Text></Pressable><Pressable style={styles.addPhoto}><Text style={styles.photoIcon}>▣</Text><Text style={styles.secondaryText}>Take photo</Text></Pressable></View>
      <Text style={styles.sectionTitle}>Choose a topic</Text>
      <View style={styles.topicRow}>{['Beach cleanup', 'Wildlife', 'Zero waste', 'Education'].map((value) => <Pressable key={value} onPress={() => setTopic(value)} style={[styles.topic, topic === value && styles.topicActive]}><Text style={[styles.topicText, topic === value && styles.topicTextActive]}>{value}</Text></Pressable>)}</View>
      <View style={styles.divider} />
      {['⌖  Add location', '♧  Tag people or a group'].map((value) => <Pressable key={value} style={styles.option}><View><Text style={styles.optionTitle}>{value}</Text><Text style={styles.meta}>{value.includes('location') ? 'Help neighbors discover local action' : 'Mention your cleanup team'}</Text></View><Text style={styles.chevron}>›</Text></Pressable>)}
      <Pressable disabled={busy} onPress={publish} style={styles.publish}><Text style={styles.publishText}>{busy ? 'Publishing...' : '➤  Publish post'}</Text></Pressable>
    </ScrollView>
  );
}

export function GroupsOrganizationsScreen({ onBack, onOpenOrganization }: Props & { onOpenOrganization: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TopBar title="Groups & organizations" onBack={onBack} />
      <View style={styles.groupHero}><Text style={styles.groupHeroTitle}>Find your ocean people</Text><Text style={styles.groupHeroText}>Join local groups making a difference every day.</Text></View>
      <View style={styles.search}><Text style={styles.searchIcon}>⌕</Text><Text style={styles.searchText}>Search groups</Text><Text style={styles.filter}>☷</Text></View>
      <Text style={styles.sectionTitle}>Featured organizations</Text>
      <Pressable onPress={onOpenOrganization} style={styles.orgCard}><Image source={cleanupImage} style={styles.orgImage} /><View style={styles.orgCopy}><Text style={styles.name}>Ocean Guardians Da Nang</Text><Text style={styles.meta}>1.2k members · 24 actions</Text><Text style={styles.actionPill}>View organization</Text></View></Pressable>
      <Pressable onPress={onOpenOrganization} style={styles.orgCard}><View style={[styles.orgImage, styles.orgPlaceholder]}><Text style={styles.orgMark}>♒</Text></View><View style={styles.orgCopy}><Text style={styles.name}>Blue Coast Network</Text><Text style={styles.meta}>856 members · Coastal care</Text><Text style={styles.actionPill}>View organization</Text></View></Pressable>
    </ScrollView>
  );
}

export function GroupsOrganizationsRoot({ onBack }: Props) {
  const [detail, setDetail] = useState(false);
  return detail
    ? <OrganizationDetailScreen onBack={() => setDetail(false)} />
    : <GroupsOrganizationsScreen onBack={onBack} onOpenOrganization={() => setDetail(true)} />;
}

export function OrganizationDetailScreen({ onBack }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TopBar title="Organization" onBack={onBack} />
      <Image source={cleanupImage} style={styles.coverImage} />
      <View style={styles.organizationHeader}><Avatar initials="OG" /><View style={styles.flex}><Text style={styles.name}>Ocean Guardians Da Nang</Text><Text style={styles.meta}>Community organization · Da Nang</Text></View><Pressable style={styles.follow}><Text style={styles.followText}>Follow</Text></Pressable></View>
      <Text style={styles.organizationBio}>A local community protecting beaches, wildlife, and the people who call the coast home.</Text>
      <View style={styles.organizationStats}><Text style={styles.stat}>1,248 members</Text><Text style={styles.stat}>38 actions</Text><Text style={styles.stat}>4.9 rating</Text></View>
      <Text style={styles.sectionTitle}>Upcoming actions</Text>
      <View style={styles.actionCard}><Text style={styles.spotlightLabel}>SATURDAY · 08:00</Text><Text style={styles.name}>Sunday beach cleanup</Text><Text style={styles.meta}>My Khe Beach · 46 people going</Text><Pressable style={styles.actionPill}><Text style={styles.actionText}>Join action</Text></Pressable></View>
    </ScrollView>
  );
}

export function CommunityInteractionScreen({ title, onBack }: { title: string; onBack: () => void }) {
  const isLikes = title === 'Likes';
  const people = isLikes ? [['MP', 'Mai Pham', 'Joined your cleanup update'], ['BL', 'Bao Le', 'Liked your community post'], ['AV', 'An Vu', 'Liked your photo']] : [['MP', 'Mai Pham', 'This is inspiring!'], ['BL', 'Bao Le', 'Thank you for helping the coast.'], ['AV', 'An Vu', 'Which area did you start from?']];
  return <ScrollView contentContainerStyle={styles.screen}><TopBar title={title} onBack={onBack} /><View style={styles.interactionHero}><Text style={styles.interactionCount}>{isLikes ? '24' : '8'}</Text><Text style={styles.interactionLabel}>{isLikes ? 'people reacted to this post' : 'community comments'}</Text></View>{people.map(([initials, name, text]) => <View key={name} style={styles.interactionRow}><Avatar initials={initials} /><View style={styles.flex}><Text style={styles.name}>{name}</Text><Text style={styles.meta}>{text}</Text></View><Text style={styles.chevron}>›</Text></View>)}</ScrollView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 110 },
  flex: { flex: 1 },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.lg, paddingTop: spacing.sm },
  backButton: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 22, height: 43, justifyContent: 'center', left: 0, position: 'absolute', width: 43 },
  backText: { color: colors.ink, fontSize: 32, lineHeight: 32 },
  topTitle: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 20, paddingHorizontal: 24, paddingVertical: 11 },
  topTitleText: { color: colors.ink, fontSize: 18, fontWeight: '800' },
  search: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 14, flexDirection: 'row', marginBottom: spacing.md, padding: 12 },
  searchIcon: { color: colors.muted, fontSize: 22, marginRight: 8 },
  searchText: { color: colors.muted, flex: 1, fontSize: 12 },
  filter: { color: colors.ink, fontSize: 18 },
  hero: { borderRadius: 18, height: 144, overflow: 'hidden', position: 'relative' },
  heroImage: { height: '100%', width: '100%' },
  heroShade: { backgroundColor: 'rgba(0,20,35,0.38)', bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  heroCopy: { bottom: 14, left: 14, position: 'absolute' },
  heroPill: { backgroundColor: colors.white, borderRadius: 16, color: colors.blue, fontSize: 10, fontWeight: '800', paddingHorizontal: 13, paddingVertical: 6, alignSelf: 'flex-start' },
  heroTitle: { color: colors.white, fontSize: 21, fontWeight: '800', lineHeight: 25, marginTop: 7 },
  heroMeta: { color: colors.white, fontSize: 12, marginTop: 4 },
  tabs: { alignItems: 'center', flexDirection: 'row', gap: 8, marginVertical: spacing.md },
  tab: { backgroundColor: colors.surface, borderRadius: 18, color: colors.ink, fontSize: 12, fontWeight: '700', paddingHorizontal: 24, paddingVertical: 10 },
  tabActive: { backgroundColor: colors.aqua, color: colors.white },
  shareComposer: { alignItems: 'center', borderColor: colors.line, borderRadius: 20, borderWidth: 1, flexDirection: 'row', marginBottom: spacing.lg, padding: 7 },
  shareText: { color: colors.muted, flex: 1, fontSize: 12, marginLeft: 9 },
  shareIcon: { color: colors.blue, fontSize: 18 },
  avatar: { alignItems: 'center', backgroundColor: '#D5D5D5', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
  avatarText: { color: colors.navy, fontSize: 11, fontWeight: '800' },
  post: { marginBottom: spacing.lg },
  postHeader: { alignItems: 'center', flexDirection: 'row', marginBottom: spacing.sm },
  name: { color: colors.navy, fontSize: 14, fontWeight: '800' },
  meta: { color: colors.muted, fontSize: 11, marginTop: 3 },
  more: { color: colors.muted, fontSize: 16 },
  postTitle: { color: colors.navy, fontSize: 14, fontWeight: '800', marginBottom: 4 },
  postBody: { color: colors.ink, fontSize: 13, marginBottom: spacing.sm },
  postImage: { borderRadius: 14, height: 160, width: '100%' },
  detailImage: { borderRadius: 14, height: 196, marginVertical: spacing.sm, width: '100%' },
  postStats: { borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  stat: { color: colors.ink, fontSize: 11 },
  spotlight: { paddingTop: spacing.md },
  spotlightLabel: { color: colors.blue, fontSize: 10, fontWeight: '800' },
  spotlightTitle: { color: colors.navy, fontSize: 15, fontWeight: '800', marginTop: 6 },
  actionPill: { backgroundColor: colors.sky, borderRadius: 18, color: colors.blue, fontSize: 12, fontWeight: '800', marginTop: 10, paddingHorizontal: 14, paddingVertical: 9, alignSelf: 'flex-start' },
  bottomBar: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 18, bottom: 18, flexDirection: 'row', justifyContent: 'space-around', left: spacing.lg, padding: 8, position: 'absolute', right: spacing.lg },
  addButton: { alignItems: 'center', backgroundColor: colors.aqua, borderColor: colors.white, borderRadius: 35, borderWidth: 5, color: colors.white, fontSize: 30, height: 64, justifyContent: 'center', marginTop: -32, textAlign: 'center', width: 64 },
  selectedNav: { backgroundColor: '#0086A8', borderRadius: 18, color: colors.white, paddingHorizontal: 18, paddingVertical: 10 },
  commentsHeader: { alignItems: 'center', flexDirection: 'row', gap: 10, paddingVertical: spacing.md },
  commentsTitle: { color: colors.navy, fontSize: 18, fontWeight: '800' },
  topLink: { color: '#0186A8', fontSize: 12, fontWeight: '800', marginLeft: 'auto' },
  comment: { alignItems: 'flex-start', flexDirection: 'row', marginBottom: spacing.lg },
  commentTop: { flexDirection: 'row', justifyContent: 'space-between' },
  commentText: { color: colors.ink, fontSize: 13, marginTop: 5 },
  commentInput: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 18, flexDirection: 'row', padding: 8 },
  commentField: { color: colors.ink, flex: 1, marginLeft: 8 },
  send: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 18, color: colors.white, fontSize: 18, padding: 8 },
  public: { backgroundColor: colors.surface, borderRadius: 16, color: colors.ink, fontSize: 11, fontWeight: '700', paddingHorizontal: 16, paddingVertical: 8 },
  composeInput: { color: colors.navy, fontSize: 17, minHeight: 100, paddingVertical: 12, textAlignVertical: 'top' },
  divider: { backgroundColor: colors.line, height: 1, marginVertical: spacing.md },
  rowBetween: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  sectionTitle: { color: colors.navy, fontSize: 16, fontWeight: '800', marginBottom: 10 },
  photoRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.xl },
  photoThumb: { borderRadius: 12, height: 103, width: 104 },
  addPhoto: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.line, borderRadius: 12, borderWidth: 1, height: 103, justifyContent: 'center', width: 104 },
  photoIcon: { color: colors.blue, fontSize: 24 },
  actionText: { color: '#0186A8', fontSize: 11, fontWeight: '800', marginTop: 5 },
  secondaryText: { color: colors.ink, fontSize: 11, fontWeight: '800', marginTop: 5 },
  topicRow: { flexDirection: 'row', gap: 7, marginBottom: spacing.md },
  topic: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8 },
  topicActive: { backgroundColor: '#DDF5F8' },
  topicText: { color: colors.ink, fontSize: 10, fontWeight: '700' },
  topicTextActive: { color: '#0186A8' },
  option: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14 },
  optionTitle: { color: colors.navy, fontSize: 14, fontWeight: '800' },
  chevron: { color: colors.blue, fontSize: 24 },
  publish: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 14, marginTop: 80, padding: 16 },
  publishText: { color: colors.white, fontSize: 15, fontWeight: '800' }
  ,groupHero: { backgroundColor: colors.sky, borderRadius: 18, marginBottom: spacing.md, padding: 22 },
  groupHeroTitle: { color: colors.navy, fontSize: 22, fontWeight: '800' },
  groupHeroText: { color: colors.ink, fontSize: 13, lineHeight: 19, marginTop: 6 },
  orgCard: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: 16, borderWidth: 1, flexDirection: 'row', marginBottom: spacing.md, overflow: 'hidden', padding: 10 },
  orgImage: { borderRadius: 12, height: 100, width: 100 },
  orgPlaceholder: { alignItems: 'center', backgroundColor: colors.mint, justifyContent: 'center' },
  orgMark: { color: colors.blue, fontSize: 34 },
  orgCopy: { flex: 1, paddingLeft: 12, paddingTop: 5 },
  coverImage: { borderRadius: 16, height: 170, marginBottom: spacing.md, width: '100%' },
  organizationHeader: { alignItems: 'center', flexDirection: 'row' },
  organizationBio: { color: colors.ink, fontSize: 14, lineHeight: 21, marginVertical: spacing.md },
  organizationStats: { borderBottomColor: colors.line, borderBottomWidth: 1, borderTopColor: colors.line, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md },
  follow: { backgroundColor: colors.aqua, borderRadius: 16, paddingHorizontal: 15, paddingVertical: 9 },
  followText: { color: colors.white, fontSize: 12, fontWeight: '800' },
  actionCard: { backgroundColor: colors.surface, borderRadius: 16, padding: spacing.lg },
  interactionHero: { alignItems: 'center', backgroundColor: '#EDFBFF', borderRadius: 18, marginBottom: spacing.lg, padding: spacing.xxl },
  interactionCount: { color: colors.blue, fontSize: 44, fontWeight: '800' },
  interactionLabel: { color: colors.ink, fontSize: 13, marginTop: 4 },
  interactionRow: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: spacing.md }
});
