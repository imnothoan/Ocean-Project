import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors } from '../../theme/tokens';

type AppTab = 'map' | 'events' | 'create' | 'community' | 'profile';

export function FigmaCommunityFeedScreen({
  onCreatePost,
  onTab
}: {
  onCreatePost: () => void;
  onTab: (tab: AppTab) => void;
}) {
  const { width } = useWindowDimensions();
  const scale = Math.min(width / 393, 1.12);
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: 12 * scale }]} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.searchBar} onPress={() => undefined}>
          <Text style={styles.searchIcon}>⌕</Text>
          <Text style={styles.searchText}>Search posts, groups or people</Text>
          <Text style={styles.filterIcon}>☷</Text>
        </Pressable>
        <View style={styles.hero}>
          <Image source={require('../../../assets/figma/calibration/community/hero.jpeg')} style={styles.heroImage} />
          <View style={styles.heroShade} />
          <View style={styles.heroCopy}>
            <Text style={styles.impactPill}>LOCAL IMPACT</Text>
            <Text style={styles.heroTitle}>Small actions.{'\n'}Cleaner shores.</Text>
            <Text style={styles.heroSubtitle}>1,248 neighbors making waves together</Text>
          </View>
        </View>
        <View style={styles.filterRow}>
          <Pressable style={[styles.filterPill, styles.filterActive]}><Text style={styles.filterActiveText}>For you</Text></Pressable>
          <Pressable style={styles.filterPill}><Text style={styles.filterText}>Following</Text></Pressable>
          <Pressable style={styles.filterPill}><Text style={styles.filterText}>Group</Text></Pressable>
          <Text style={styles.sliders}>☷</Text>
        </View>
        <Pressable style={styles.shareRow} onPress={onCreatePost}>
          <View style={styles.avatar}><Text style={styles.avatarText}>HN</Text></View>
          <Text style={styles.shareText}>Share a small action...</Text>
          <Text style={styles.actionIcon}>▧</Text>
          <Text style={styles.actionIcon}>▣</Text>
        </Pressable>
        <View style={styles.divider} />
        <View style={styles.postHeader}>
          <View style={styles.avatar}><Text style={styles.avatarText}>LN</Text></View>
          <View style={styles.postIdentity}><Text style={styles.author}>Linh Nguyen</Text><Text style={styles.meta}>Da Nang · 18 min ago</Text></View>
          <Text style={styles.more}>•••</Text>
        </View>
        <Text style={styles.postTitle}>Sunday cleanup with our neighborhood team!</Text>
        <Text style={styles.postBody}>12 bags collected along My Khe Beach.</Text>
        <Image source={require('../../../assets/figma/calibration/community/post.png')} style={styles.postImage} />
        <View style={styles.postActions}>
          <Text style={styles.like}>♡ <Text style={styles.actionText}>24</Text></Text>
          <Text style={styles.comment}>◯ <Text style={styles.actionText}>8 comments</Text></Text>
          <Text style={styles.shareAction}>♧</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.spotlight}>COMMUNITY SPOTLIGHT</Text>
        <Text style={styles.spotlightTitle}>Every bag keeps wildlife safer.</Text>
        <Text style={styles.spotlightBody}>Join this weekend’s cleanup near you.</Text>
        <Pressable style={styles.localAction} onPress={() => onTab('events')}><Text style={styles.calendar}>▣</Text><Text style={styles.localActionText}>See local actions</Text></Pressable>
        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
}

export function FigmaBottomAppBar({ activeTab, onTab }: { activeTab: AppTab; onTab: (tab: AppTab) => void }) {
  return (
    <View style={styles.tabBar} pointerEvents="box-none">
      <Image source={require('../../../assets/figma/calibration/tab/export.png')} style={styles.tabImage} resizeMode="stretch" />
      <Pressable accessibilityLabel="Map" style={[styles.tabHit, styles.mapHit]} onPress={() => onTab('map')} />
      <Pressable accessibilityLabel="Events" style={[styles.tabHit, styles.eventsHit]} onPress={() => onTab('events')} />
      <Pressable accessibilityLabel="Create post" style={[styles.tabHit, styles.createHit]} onPress={() => onTab('create')} />
      <Pressable accessibilityLabel="Community" style={[styles.tabHit, styles.communityHit]} onPress={() => onTab('community')} />
      <Pressable accessibilityLabel="Profile" style={[styles.tabHit, styles.profileHit]} onPress={() => onTab('profile')} />
      <Text style={styles.activeHint} accessibilityElementsHidden>{activeTab === 'community' ? '' : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: colors.white, flex: 1 },
  content: { paddingTop: 12, paddingBottom: 8 },
  searchBar: { alignItems: 'center', backgroundColor: '#F2F4F5', borderRadius: 13, flexDirection: 'row', height: 42, paddingHorizontal: 20 },
  searchIcon: { color: '#7B92A1', fontSize: 24, lineHeight: 24, marginRight: 8 },
  searchText: { color: '#7B92A1', flex: 1, fontFamily: 'AfacadFlux_400Regular', fontSize: 11 },
  filterIcon: { color: '#7B92A1', fontSize: 19 },
  hero: { borderRadius: 16, height: 144, marginTop: 9, overflow: 'hidden' },
  heroImage: { height: '100%', width: '100%' },
  heroShade: { backgroundColor: 'rgba(0, 25, 45, 0.32)', bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  heroCopy: { bottom: 16, left: 15, position: 'absolute' },
  impactPill: { backgroundColor: colors.white, borderRadius: 18, color: '#0186A8', fontFamily: 'AfacadFlux_700Bold', fontSize: 10, paddingHorizontal: 14, paddingVertical: 6, alignSelf: 'flex-start' },
  heroTitle: { color: colors.white, fontFamily: 'AfacadFlux_700Bold', fontSize: 21, lineHeight: 26, marginTop: 9 },
  heroSubtitle: { color: colors.white, fontFamily: 'AfacadFlux_400Regular', fontSize: 12, marginTop: 7 },
  filterRow: { alignItems: 'center', flexDirection: 'row', gap: 9, marginTop: 12 },
  filterPill: { alignItems: 'center', backgroundColor: '#F2F4F5', borderRadius: 22, height: 34, justifyContent: 'center', width: 96 },
  filterActive: { backgroundColor: '#43C4D6' },
  filterText: { color: '#3F596B', fontFamily: 'AfacadFlux_700Bold', fontSize: 12 },
  filterActiveText: { color: colors.white, fontFamily: 'AfacadFlux_700Bold', fontSize: 12 },
  sliders: { color: '#3F596B', fontSize: 20, marginLeft: 'auto' },
  shareRow: { alignItems: 'center', borderColor: '#D7E1E6', borderRadius: 18, borderWidth: 1, flexDirection: 'row', height: 49, marginTop: 8, paddingHorizontal: 10 },
  avatar: { alignItems: 'center', backgroundColor: '#E1E4E5', borderRadius: 20, height: 38, justifyContent: 'center', width: 38 },
  avatarText: { color: '#091727', fontSize: 11, fontWeight: '800' },
  shareText: { color: '#7B92A1', flex: 1, fontFamily: 'AfacadFlux_400Regular', fontSize: 12, marginLeft: 9 },
  actionIcon: { color: '#0186A8', fontSize: 21, marginLeft: 10 },
  divider: { backgroundColor: '#D7E1E6', height: 1, marginVertical: 10 },
  postHeader: { alignItems: 'center', flexDirection: 'row' },
  postIdentity: { flex: 1, marginLeft: 9 },
  author: { color: '#091727', fontFamily: 'AfacadFlux_700Bold', fontSize: 14 },
  meta: { color: '#7B92A1', fontFamily: 'AfacadFlux_400Regular', fontSize: 11, marginTop: 3 },
  more: { color: '#7B92A1', fontSize: 16, letterSpacing: 2 },
  postTitle: { color: '#091727', fontFamily: 'AfacadFlux_700Bold', fontSize: 14, marginTop: 10 },
  postBody: { color: '#3F596B', fontFamily: 'AfacadFlux_400Regular', fontSize: 13, marginTop: 5 },
  postImage: { borderRadius: 13, height: 130, marginTop: 11, width: '100%' },
  postActions: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7 },
  like: { color: '#FD7B59', fontSize: 22 },
  actionText: { color: '#3F596B', fontSize: 11 },
  comment: { color: '#3F596B', flex: 1, fontSize: 19, marginLeft: 23 },
  shareAction: { color: '#3F596B', fontSize: 22 },
  spotlight: { color: '#0186A8', fontFamily: 'AfacadFlux_700Bold', fontSize: 10, marginTop: 1 },
  spotlightTitle: { color: '#091727', fontFamily: 'AfacadFlux_700Bold', fontSize: 16, marginTop: 7 },
  spotlightBody: { color: '#7B92A1', fontFamily: 'AfacadFlux_400Regular', fontSize: 11, marginTop: 6 },
  localAction: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#E2F7FC', borderRadius: 20, flexDirection: 'row', marginTop: 9, paddingHorizontal: 13, paddingVertical: 8 },
  calendar: { color: '#0186A8', fontSize: 16, marginRight: 8 },
  localActionText: { color: '#0186A8', fontFamily: 'AfacadFlux_700Bold', fontSize: 12 },
  tabBar: { bottom: 0, height: 101, left: 0, position: 'absolute', right: 0 },
  tabImage: { height: 101, width: '100%' },
  tabHit: { position: 'absolute', top: 20, height: 55 },
  mapHit: { left: '5%', width: '20%' },
  eventsHit: { left: '26%', width: '18%' },
  createHit: { left: '40%', top: 0, width: '20%', height: 75 },
  communityHit: { left: '50%', width: '29%' },
  profileHit: { right: '3%', width: '20%' },
  activeHint: { height: 0, width: 0 }
});
