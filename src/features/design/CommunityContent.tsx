import { shareText } from './share';
import { useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../../theme/tokens';
import { supabase } from '../../lib/supabase';
import { result } from './workflow';
import { useCommunity } from './CommunityContext';
import type { CommunityItem } from './data';
import type { Photo } from './media';
import { commentBody, initials, matchesQuery, postTags } from './communityView';

const assets = {
  avatar: require('../../../assets/figma/mobile/e61d5.svg'),
  like: require('../../../assets/figma/mobile/f5b1f.svg'),
  comment: require('../../../assets/figma/mobile/0b5fc.svg'),
  share: require('../../../assets/figma/mobile/6dd90.svg'),
  send: require('../../../assets/figma/mobile/c97b2.svg'),
  calendar: require('../../../assets/figma/mobile/dd7f3.svg'),
  cleanup: require('../../../assets/figma/mobile/efaeb.jpg'),
};
const blue = '#0186A8';
const date = (timestamp: string) => new Date(timestamp).toLocaleDateString();
function url(path: string) {
  return supabase.storage.from('community-photos').getPublicUrl(path).data.publicUrl;
}
function Icon({ source, size = 16 }: { source: number; size?: number }) {
  return <Image source={source} contentFit="contain" style={{ width: size, height: size }} />;
}
function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={assets.avatar} style={StyleSheet.absoluteFill} />
      <Text style={s.initials}>{initials(name)}</Text>
    </View>
  );
}
function Button({
  label,
  onPress,
  selected = false,
}: {
  label: string;
  onPress: () => void;
  selected?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[s.pill, selected && s.active]}
    >
      <Text style={[s.pillText, selected && s.activeText]}>{label}</Text>
    </Pressable>
  );
}
function Row({ title, detail, onPress }: { title: string; detail?: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={s.row}>
      <View style={s.flex}>
        <Text style={s.title}>{title}</Text>
        {!!detail && <Text style={s.meta}>{detail}</Text>}
      </View>
      <Text style={s.meta}>›</Text>
    </Pressable>
  );
}
function DirectoryStatus() {
  const { loading, error, retry } = useCommunity();
  if (error)
    return (
      <Pressable accessibilityRole="button" onPress={retry}>
        <Text style={s.body}>{error}</Text>
      </Pressable>
    );
  return loading ? (
    <Text accessibilityLiveRegion="polite" style={s.meta}>
      Loading…
    </Text>
  ) : null;
}
export { FlowSection as CommunitySection } from './live';
function useRoutes() {
  const { controller: c } = useCommunity();
  return {
    post: (id: string) => {
      c.setValue('postId', id);
      c.go('105:2895');
    },
    profile: (id: string) => {
      c.setValue('publicUserId', id);
      c.go('666:4125');
    },
    group: (id: string) => {
      c.setValue('groupId', id);
      c.go('119:3037');
    },
    share: (id: string) => {
      c.setValue('postId', id);
      c.setValue('shareCaption', '');
      c.setValue('shareAuthor', '');
      c.setValue('shareLocation', '');
      c.go('666:3173');
    },
  };
}
function PostCard({
  item,
  detail = false,
  onComment,
}: {
  item: CommunityItem;
  detail?: boolean;
  onComment?: () => void;
}) {
  const { controller: c } = useCommunity();
  const routes = useRoutes();
  const name = item.profile?.display_name || 'Community member';
  const post = item.post;
  const photos = post.photo_paths ?? [];
  const toggleLike = () =>
    c.run(async () => {
      if (item.liked)
        result(
          await supabase.from('post_likes').delete().eq('post_id', post.id).eq('user_id', c.user!.id),
        );
      else {
        const response = await supabase
          .from('post_likes')
          .insert({ post_id: post.id, user_id: c.user!.id });
        if (response.error?.code !== '23505') result(response);
      }
      c.refresh();
    }, true);
  return (
    <View style={s.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={'View profile of ' + name}
        onPress={() => routes.profile(post.author_id)}
        style={s.author}
      >
        <Avatar name={name} />
        <View style={s.flex}>
          <Text style={s.title}>{name}</Text>
          <Text style={s.meta}>
            {[post.location, date(post.created_at)].filter(Boolean).join(' · ')}
          </Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole={detail ? undefined : 'button'}
        disabled={detail}
        onPress={() => routes.post(post.id)}
      >
        <Text style={s.title}>{post.topic}</Text>
        <Text style={s.body} numberOfLines={detail ? undefined : 3}>
          {post.body}
        </Text>
        {detail && !!post.mention && <Text style={s.meta}>{post.mention}</Text>}
        {(detail ? photos : photos.slice(0, 1)).map((path) => (
          <Image
            key={path}
            source={{ uri: url(path) }}
            accessibilityLabel="Post photo"
            contentFit="cover"
            style={[s.photo, { aspectRatio: detail ? 353 / 196 : 370 / 130 }]}
          />
        ))}
      </Pressable>
      <View style={s.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.liked ? 'Unlike post' : 'Like post'}
          accessibilityState={{ selected: item.liked }}
          onPress={toggleLike}
          style={s.iconButton}
        >
          <Icon source={assets.like} />
          <Text style={[s.meta, item.liked && { color: blue }]}>
            {item.likes}
            {detail ? ' likes' : ''}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onComment || (() => routes.post(post.id))}
          style={s.iconButton}
        >
          <Icon source={assets.comment} />
          <Text style={s.meta}>{item.comments.length} comments</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Share post"
          onPress={() => routes.share(post.id)}
          style={[s.iconButton, { marginLeft: 'auto' }]}
        >
          <Icon source={assets.share} />
        </Pressable>
      </View>
    </View>
  );
}
export function CommunityFeed() {
  const { controller: c, items, followed } = useCommunity();
  const following = c.values.feedFilter === 'following';
  const posts = following ? items.filter((item) => followed.includes(item.post.author_id)) : items;
  return (
    <>
      {posts.length ? (
        <PostCard item={posts[0]} />
      ) : (
        <View style={s.card}>
          {following && <DirectoryStatus />}
          <Text style={s.title}>
            {following ? 'No recent posts from people you follow' : 'No community posts yet'}
          </Text>
          <Text style={s.body}>Share a small action with the community.</Text>
        </View>
      )}
      <View style={s.spotlight}>
        <Text style={s.eyebrow}>COMMUNITY SPOTLIGHT</Text>
        <Text style={s.title}>Every bag keeps wildlife safer.</Text>
        <Text style={s.meta}>Discover local cleanups near you.</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => c.go('258:426')}
          style={[s.iconButton, s.spotlightButton]}
        >
          <Icon source={assets.calendar} />
          <Text style={s.pillText}>See local actions</Text>
        </Pressable>
      </View>
      {posts.slice(1).map((item) => (
        <PostCard key={item.post.id} item={item} />
      ))}
    </>
  );
}
export function PostDetail() {
  const { controller: c, items, profiles, profile } = useCommunity();
  const item = items.find((i) => i.post.id === c.values.postId);
  const routes = useRoutes();
  const input = useRef<ComponentRef<typeof TextInput>>(null);
  if (!item) return <Text style={s.body}>This post is unavailable.</Text>;
  const draft = 'comment:' + item.post.id;
  const send = () =>
    c.run(async () => {
      const body = commentBody(c.values[draft] || '');
      result(await supabase.from('post_comments').insert({ post_id: item.post.id, body }));
      c.setValue(draft, '');
      c.refresh();
    }, true);
  return (
    <>
      <PostCard item={item} detail onComment={() => input.current?.focus()} />
      <Text style={s.heading}>
        Comments <Text style={s.meta}>{item.comments.length}</Text>
      </Text>
      {item.comments.map((comment) => {
        const name =
          profiles.find((p) => p.id === comment.author_id)?.display_name || 'Community member';
        return (
          <View key={comment.id} style={s.comment}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={'View profile of ' + name}
              onPress={() => routes.profile(comment.author_id)}
            >
              <Avatar name={name} size={30} />
            </Pressable>
            <View style={s.flex}>
              <Text style={s.title}>{name}</Text>
              <Text style={s.body}>{comment.body}</Text>
            </View>
            <Text style={s.meta}>{date(comment.created_at)}</Text>
          </View>
        );
      })}
      <View style={s.composer}>
        <Avatar name={profile.display_name || 'Guest'} size={26} />
        <TextInput
          ref={input}
          accessibilityLabel="Write a comment"
          placeholder="Write a comment…"
          multiline
          maxLength={2000}
          value={c.values[draft] || ''}
          onChangeText={(v) => c.setValue(draft, v)}
          style={[s.body, s.input]}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send comment"
          onPress={send}
          style={s.send}
        >
          <Icon source={assets.send} />
        </Pressable>
      </View>
    </>
  );
}
export function PhotoSelection() {
  const { controller: c } = useCommunity();
  const photos: Photo[] = JSON.parse(c.values.postPhotos || '[]');
  const [focused, setFocused] = useState(0);
  const index = Math.max(0, Math.min(focused, photos.length - 1));
  const pic = photos[index];
  if (!pic) return null;
  return (
    <View style={s.preview}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={'Photo ' + (index + 1) + ' of ' + photos.length + '. View next'}
        onPress={() => setFocused((index + 1) % photos.length)}
        style={s.flex}
      >
        <Image source={{ uri: pic.uri }} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Remove selected photo"
        onPress={() => c.setValue('postPhotos', JSON.stringify(photos.filter((_, i) => i !== index)))}
        style={s.remove}
      >
        <Text style={s.activeText}>×</Text>
      </Pressable>
    </View>
  );
}

export function SearchDirectory() {
  const { controller: c, groups, profiles, items } = useCommunity();
  const routes = useRoutes();
  const query = c.values.search || '';
  const tab = c.values.searchTab || 'All';
  const posts = items.filter((i) =>
    matchesQuery(query, i.post.body, i.post.topic, i.post.location, i.profile?.display_name),
  );
  const tags = [...new Set(items.flatMap(postTags))].filter((tag) => matchesQuery(query, tag));
  const sections = [
    {
      name: 'Posts',
      rows: posts.map((i) => (
        <Row
          key={i.post.id}
          title={i.post.body}
          detail={i.profile?.display_name}
          onPress={() => routes.post(i.post.id)}
        />
      )),
    },
    {
      name: 'Groups',
      rows: groups
        .filter((g) => matchesQuery(query, g.name, g.category, g.description))
        .map((g) => (
          <Row key={g.id} title={g.name} detail={g.category} onPress={() => routes.group(g.id)} />
        )),
    },
    {
      name: 'People',
      rows: profiles
        .filter((p) => matchesQuery(query, p.display_name, p.handle))
        .map((p) => (
          <Row
            key={p.id}
            title={p.display_name || 'Community member'}
            detail={p.handle ?? undefined}
            onPress={() => routes.profile(p.id)}
          />
        )),
    },
    {
      name: 'Hashtags',
      rows: tags.map((tag) => (
        <Button
          key={tag}
          label={tag}
          onPress={() => {
            c.setValue('search', tag);
            c.setValue('searchTab', 'Posts');
          }}
        />
      )),
    },
  ].filter((group) => tab === 'All' || group.name === tab);
  return (
    <>
      <View style={s.tabs}>
        {['All', 'Posts', 'Groups', 'People', 'Hashtags'].map((name) => (
          <Button
            key={name}
            label={name}
            selected={tab === name}
            onPress={() => c.setValue('searchTab', name)}
          />
        ))}
      </View>
      <DirectoryStatus />
      {sections
        .filter((g) => g.rows.length)
        .map((g) => (
          <View key={g.name}>
            <Text style={s.heading}>{g.name}</Text>
            {g.rows}
          </View>
        ))}
      {sections.every((g) => !g.rows.length) && <Text style={s.meta}>No matches.</Text>}
    </>
  );
}

export function GroupDirectory() {
  const { controller: c, groups, members, join } = useCommunity();
  const routes = useRoutes();
  const visible = groups.filter(
    (g) =>
      matchesQuery(c.values.groupSearch || '', g.name, g.description) &&
      (!c.values.groupCategory ||
        c.values.groupCategory === 'All' ||
        c.values.groupCategory === g.category),
  );
  return (
    <>
      <Text style={s.heading}>Communities</Text>
      <DirectoryStatus />
      {visible.map((g) => {
        const people = members.filter((m) => m.group_id === g.id);
        const joined = people.some((m) => m.user_id === c.user?.id);
        return (
          <View key={g.id} style={s.groupCard}>
            <Pressable accessibilityRole="button" style={s.author} onPress={() => routes.group(g.id)}>
              <Avatar name={g.name} size={48} />
              <View style={s.flex}>
                <Text style={s.title}>{g.name}</Text>
                <Text style={s.body}>{g.description}</Text>
              </View>
            </Pressable>
            <View style={s.actions}>
              <Text style={s.meta}>
                {people.length} members · {g.category}
              </Text>
              <Button label={joined ? 'Joined' : 'Join'} selected={joined} onPress={() => join(g.id)} />
            </View>
          </View>
        );
      })}
      {!visible.length && <Text style={s.meta}>No matching groups.</Text>}
    </>
  );
}

export function GroupDetail() {
  const { controller: c, groups, members, profiles, join } = useCommunity();
  const group = groups.find((g) => g.id === c.values.groupId);
  const routes = useRoutes();
  if (!group)
    return (
      <>
        <DirectoryStatus />
        <Text style={s.meta}>Select a group from the directory.</Text>
      </>
    );
  const people = members.filter((m) => m.group_id === group.id);
  const joined = people.some((m) => m.user_id === c.user?.id);
  return (
    <>
      <Row title={people.length + ' members · Public group'} onPress={() => c.go('666:3366')} />
      <View style={s.tabs}>
        <Button
          label={joined ? 'Joined' : 'Join group'}
          selected={joined}
          onPress={() => join(group.id)}
        />
        <Button
          label="Invite friends"
          onPress={() =>
            c.run(async () => {
              await shareText('Join ' + group.name + ' in the Ocean Project community.');
            })
          }
        />
      </View>
      <Text style={s.heading}>About</Text>
      <Text style={s.body}>{group.description}</Text>
      <Text style={s.heading}>Recent members</Text>
      {people.slice(0, 4).map((m) => (
        <Row
          key={m.user_id}
          title={profiles.find((p) => p.id === m.user_id)?.display_name || 'Community member'}
          detail={'Joined ' + date(m.joined_at)}
          onPress={() => routes.profile(m.user_id)}
        />
      ))}
      {!people.length && <Text style={s.meta}>Be the first to join this group.</Text>}
    </>
  );
}

export function GroupMembers() {
  const { controller: c, profiles, members, followed, follow } = useCommunity();
  const routes = useRoutes();
  const groupMembers = members
    .filter((m) => m.group_id === c.values.groupId)
    .map((m) => ({ member: m, profile: profiles.find((p) => p.id === m.user_id) }))
    .filter(({ profile }) =>
      matchesQuery(
        c.values.memberSearch || '',
        profile?.display_name || 'Community member',
        profile?.handle,
      ),
    );
  return (
    <>
      <Text style={s.heading}>Members · {groupMembers.length}</Text>
      <DirectoryStatus />
      {groupMembers.map(({ member: m, profile: p }) => (
        <View key={m.user_id} style={s.member}>
          <Pressable
            accessibilityRole="button"
            style={[s.author, s.flex]}
            onPress={() => routes.profile(m.user_id)}
          >
            <Avatar name={p?.display_name || 'Community member'} />
            <Text style={s.title}>{p?.display_name || 'Community member'}</Text>
          </Pressable>
          {m.user_id !== c.user?.id && (
            <Button
              label={followed.includes(m.user_id) ? 'Following' : 'Follow'}
              selected={followed.includes(m.user_id)}
              onPress={() => follow(m.user_id)}
            />
          )}
        </View>
      ))}
      {!groupMembers.length && <Text style={s.meta}>No matching members.</Text>}
    </>
  );
}

export function PublicProfile() {
  const { controller: c, profiles, items, followed, follow } = useCommunity();
  const id = c.values.publicUserId;
  const person = profiles.find((p) => p.id === id);
  const name = person?.display_name || 'Community member';
  const posts = items.filter((i) => i.post.author_id === id);
  if (!id) return <Text style={s.meta}>Select a community member.</Text>;
  return (
    <>
      <View style={s.profile}>
        <Avatar name={name} size={88} />
        <Text style={s.heading}>{name}</Text>
        {!!person?.handle && <Text style={s.meta}>@{person.handle}</Text>}
        {!!person?.location && <Text style={s.body}>{person.location}</Text>}
        {!!person?.bio && <Text style={s.body}>{person.bio}</Text>}
        {id !== c.user?.id && (
          <Button
            label={followed.includes(id) ? 'Following' : 'Follow'}
            selected={followed.includes(id)}
            onPress={() => follow(id)}
          />
        )}
      </View>
      <Text style={s.heading}>Recent posts</Text>
      {posts.map((item) => (
        <PostCard item={item} key={item.post.id} />
      ))}
      {!posts.length && <Text style={s.meta}>No recent posts.</Text>}
    </>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  profile: { alignItems: 'center', gap: 7 },
  initials: { color: colors.navy, fontFamily: 'AfacadFlux_700Bold', fontSize: 14 },
  pill: {
    borderRadius: 18,
    backgroundColor: '#edfbff',
    paddingHorizontal: 13,
    paddingVertical: 7,
    alignItems: 'center',
  },
  active: { backgroundColor: blue },
  pillText: { color: blue, fontFamily: 'AfacadFlux_700Bold', fontSize: 14 },
  activeText: { color: '#fff', fontFamily: 'AfacadFlux_700Bold' },
  row: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: { color: colors.navy, fontFamily: 'AfacadFlux_700Bold', fontSize: 16, lineHeight: 22 },
  heading: {
    color: colors.navy,
    fontFamily: 'AfacadFlux_700Bold',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  body: { color: colors.ink, fontFamily: 'AfacadFlux_400Regular', fontSize: 15, lineHeight: 20 },
  meta: { color: colors.ink, fontFamily: 'AfacadFlux_400Regular', fontSize: 13, lineHeight: 17 },
  card: { borderTopWidth: 1, borderColor: colors.line, paddingVertical: 10, gap: 6 },
  groupCard: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    gap: 8,
  },
  author: { flexDirection: 'row', gap: 9, alignItems: 'center' },
  photo: { width: '100%', borderRadius: 10, marginTop: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 14 },
  iconButton: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    minHeight: 36,
    paddingHorizontal: 5,
  },
  spotlight: { padding: 12, gap: 3, borderTopWidth: 1, borderColor: colors.line },
  eyebrow: { fontSize: 12, fontFamily: 'AfacadFlux_700Bold', color: blue },
  spotlightButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#edfbff',
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  tabs: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  member: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
    padding: 8,
    backgroundColor: colors.surface,
    borderRadius: 22,
  },
  input: { flex: 1, padding: 6, minHeight: 32 },
  send: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: colors.aqua,
  },
  preview: { flex: 1 },
  remove: {
    position: 'absolute',
    right: 2,
    top: 2,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.navy,
  },
});
