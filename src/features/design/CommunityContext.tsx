import { shareText } from './share';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { Interaction } from './components';
import { result, type Controller } from './workflow';
import type { CommunityItem, Profile } from './data';

type Group = { id: string; name: string; category: string; description: string };
type Member = { group_id: string; user_id: string; joined_at: string };
export type SharedProfile = Profile & { id: string };
type Directory = { groups: Group[]; members: Member[]; followed: string[]; profiles: SharedProfile[] };
const blank: Directory = { groups: [], members: [], followed: [], profiles: [] };
const communityFrames = new Set([
  '101:2769',
  '105:2895',
  '115:422',
  '666:2965',
  '115:2686',
  '119:3037',
  '666:3366',
  '666:4125',
  '666:3173',
]);

type Props = { controller: Controller; items: CommunityItem[]; profile: Profile };
type Social = Props &
  Directory & {
    loading: boolean;
    error: string;
    retry: () => void;
    follow: (id: string) => void;
    join: (id: string) => void;
  };
const Context = createContext<Social | null>(null);

export function CommunityProvider({
  controller,
  items,
  profile,
  children,
}: Props & { children: ReactNode }) {
  const active = communityFrames.has(controller.id);
  const userId = controller.user?.id;
  const [version, setVersion] = useState(0);
  const [state, setState] = useState<{
    directory: Directory;
    owner?: string;
    loading: boolean;
    error: string;
  }>({ directory: blank, loading: true, error: '' });
  const retry = () => setVersion((value) => value + 1);
  useEffect(() => {
    if (!active) return;
    let current = true;
    setState((previous) => ({
      directory: previous.owner === userId ? previous.directory : blank,
      owner: userId,
      loading: true,
      error: '',
    }));
    async function load() {
      const [groups, members, profiles, follows] = await Promise.all([
        supabase
          .from('community_groups')
          .select('id,name,category,description')
          .order('id')
          .then(result),
        supabase
          .from('community_group_members')
          .select('group_id,user_id,joined_at')
          .order('joined_at', { ascending: false })
          .then(result),
        supabase
          .from('ocean_profiles')
          .select('id,display_name,handle,bio,location,interests')
          .order('display_name')
          .then(result),
        userId
          ? supabase
              .from('community_follows')
              .select('followed_id')
              .eq('follower_id', userId)
              .then(result)
          : [],
      ]);
      if (current)
        setState({
          directory: {
            groups: groups ?? [],
            members: members ?? [],
            profiles: profiles ?? [],
            followed: (follows ?? []).map((row) => row.followed_id),
          },
          owner: userId,
          loading: false,
          error: '',
        });
    }
    load().catch(() => {
      if (current)
        setState((previous) => ({
          ...previous,
          loading: false,
          error: 'Could not load the community directory. Tap to retry.',
        }));
    });
    return () => {
      current = false;
    };
  }, [active, userId, version, profile]);

  const directory = state.owner === userId ? state.directory : blank;
  const follow = (id: string) =>
    controller.run(async () => {
      if (!id || id === userId) throw new Error('Select another community member.');
      if (directory.followed.includes(id))
        result(
          await supabase
            .from('community_follows')
            .delete()
            .eq('follower_id', userId!)
            .eq('followed_id', id),
        );
      else {
        const response = await supabase.from('community_follows').insert({ followed_id: id });
        if (response.error?.code !== '23505') result(response);
      }
      retry();
    }, true);
  const join = (id: string) =>
    controller.run(async () => {
      if (directory.members.some((m) => m.group_id === id && m.user_id === userId)) {
        result(
          await supabase
            .from('community_group_members')
            .delete()
            .eq('group_id', id)
            .eq('user_id', userId!),
        );
      } else {
        const response = await supabase.from('community_group_members').insert({ group_id: id });
        if (response.error?.code !== '23505') result(response);
      }
      retry();
    }, true);
  const group = directory.groups.find((g) => g.id === controller.values.groupId);
  const groupSize = directory.members.filter((m) => m.group_id === group?.id).length;
  const bindings = controller.binding;
  const labels = {
    ...bindings.labels,
    '119:3054': group?.name || 'Community',
    '119:3055': group?.description || '',
    '666:3380': group?.name || 'Community',
    '666:3381': groupSize + (groupSize === 1 ? ' member' : ' members') + ' · Public group',
  };
  const invite = () =>
    controller.run(async () => {
      if (group) await shareText('Join ' + group.name + ' in Ocean Project.');
    });
  const actions = { ...bindings.actions, '666:3382': invite, '666:3383': invite };
  return (
    <Context.Provider
      value={{
        controller,
        items,
        profile,
        ...directory,
        loading: state.loading,
        error: state.error,
        retry,
        follow,
        join,
      }}
    >
      <Interaction.Provider value={{ ...bindings, labels, actions }}>{children}</Interaction.Provider>
    </Context.Provider>
  );
}

export function useCommunity() {
  const context = useContext(Context);
  if (!context) throw new Error('Missing CommunityProvider');
  return context;
}
