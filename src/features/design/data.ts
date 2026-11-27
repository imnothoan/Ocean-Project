import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';

export type Profile = {
  display_name: string;
  handle: string | null;
  bio: string;
  location: string;
  public_ranking?: boolean;
  interests: string[];
};
export const emptyProfile: Profile = {
  display_name: '',
  handle: null,
  bio: '',
  location: '',
  interests: [],
};
export type Post = {
  id: string;
  author_id: string;
  body: string;
  topic: string;
  created_at: string;
  location: string;
  mention: string;
  photo_paths?: string[];
};
export type Comment = { id: string; body: string; author_id: string; created_at: string };
export type CommunityItem = {
  post: Post;
  profile: Profile | null;
  likes: number;
  liked: boolean;
  comments: Comment[];
};
export async function fetchProfile(session: Session | null) {
  if (!session) return emptyProfile;
  const { data, error } = await supabase
    .from('ocean_profiles')
    .select('display_name,handle,bio,location,interests,public_ranking')
    .eq('id', session.user.id)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile | null) ?? emptyProfile;
}
export async function fetchFeed(session: Session | null) {
  const posts = await supabase
    .from('community_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(30);
  if (posts.error) throw posts.error;
  const rows: Post[] = posts.data ?? [];
  if (!rows.length) return [];
  const ids = rows.map((row) => row.id);
  const [profiles, likes, comments] = await Promise.all([
    supabase
      .from('ocean_profiles')
      .select('id,display_name,handle,bio,location,interests')
      .in('id', [...new Set(rows.map((p) => p.author_id))]),
    supabase.from('post_likes').select('user_id,post_id').in('post_id', ids),
    supabase
      .from('post_comments')
      .select('id,body,author_id,created_at,post_id')
      .in('post_id', ids)
      .order('created_at', { ascending: false }),
  ]);
  for (const result of [profiles, likes, comments]) if (result.error) throw result.error;
  return rows.map(
    (post) =>
      ({
        post,
        profile: profiles.data?.find((p) => p.id === post.author_id) ?? null,
        likes: likes.data?.filter((x) => x.post_id === post.id).length ?? 0,
        liked: !!likes.data?.some((x) => x.post_id === post.id && x.user_id === session?.user.id),
        comments: comments.data?.filter((x) => x.post_id === post.id) ?? [],
      }) as CommunityItem,
  );
}
