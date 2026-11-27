import { Image } from 'expo-image';
import { supabase } from '../../lib/supabase';
import { fileBytes, pickPhoto } from './media';
import type { ProjectData } from './useProjectData';
import { action, field, required, result, type Controller } from './workflow';

const interests: [string, string][] = [
  ['666:4400', 'Beach cleanup'],
  ['666:4402', 'Wildlife'],
  ['666:4404', 'Zero waste'],
  ['666:4406', 'Education'],
  ['666:4408', 'Recycling'],
];
export const guideNames: Record<string, string> = {
  '269:124': 'Plastic bottle',
  '274:297': 'Green sea turtle',
  '682:5569': '5 easy ways to cut single-use plastic',
};

export function account(c: Controller, data: ProjectData, signIn: () => void) {
  const { id, values: v, binding: b, user } = c;
  const profile = data.profile;
  const name = profile.display_name || (user ? 'Community member' : 'Guest');
  if (id === '666:3592') {
    Object.assign(b.labels, {
      '666:3898': name,
      '666:3897': name[0],
      '666:3960': name[0],
      '666:3899': user ? 'Sign out' : 'Sign in or create an account',
      '666:3961': user ? 'Sign out' : 'Sign in or create an account',
    });
    action(
      c,
      ['666:3899', '666:3961'],
      user
        ? () =>
            c.run(async () => {
              const { error } = await supabase.auth.signOut({ scope: 'local' });
              if (error) throw error;
            })
        : signIn,
    );
    if (!user || user.app_metadata?.role !== 'admin') b.hidden.add('737:908');
    if (data.avatarUrl) {
      for (const n of ['666:3896', '666:3959'])
        b.replacements[n] = (
          <Image
            source={{ uri: data.avatarUrl }}
            style={{ flex: 1, borderRadius: 99 }}
            cachePolicy="memory"
            contentFit="cover"
          />
        );
      for (const n of ['666:3897', '666:3960']) b.hidden.add(n);
    }
  }
  if (id !== '666:4366' || !user) return;
  const cols = { name: 'display_name', handle: 'handle', place: 'location', bio: 'bio' } as const;
  const fields = [
    ['666:4384', 'name', 'Full name'],
    ['666:4387', 'handle', 'Username'],
    ['666:4392', 'place', 'Location'],
    ['666:4395', 'bio', 'Bio'],
  ] as const;
  for (const [node, key, label] of fields)
    field(c, node, 'profile:' + key, label, {
      value: v['profile:' + key] ?? profile[cols[key]] ?? '',
      multiline: key === 'bio',
    });
  b.labels['666:4397'] = (v['profile:bio'] ?? profile.bio).length + ' / 150';
  const selected = (v['profile:interests'] ?? profile.interests.join('|')).split('|').filter(Boolean);
  for (const [node, interest] of interests) {
    b.tint[node] = selected.includes(interest) ? '#0186a8' : '#3f596b';
    action(c, [node], () =>
      c.setValue(
        'profile:interests',
        (selected.includes(interest)
          ? selected.filter((x) => x !== interest)
          : [...selected, interest]
        ).join('|'),
      ),
    );
  }
  b.hidden.add('666:4409');
  b.hidden.add('666:4410');
  b.labels['666:4377'] = name[0];
  if (data.avatarUrl) {
    b.images['666:4376'] = data.avatarUrl;
    b.hidden.add('666:4377');
  }
  action(c, ['666:4381', '666:4376', '666:4378', '666:4379'], () =>
    c.run(async () => {
      const photo = await pickPhoto(false);
      if (!photo) return;
      const bytes = await fileBytes(photo.uri);
      if (!bytes.byteLength || bytes.byteLength > 10485760) throw new Error('Chọn ảnh nhỏ hơn 10 MB.');
      result(
        await supabase.storage
          .from('profile-photos')
          .upload(user.id + '/avatar', bytes, {
            contentType: photo.mime,
            upsert: true,
            cacheControl: '0',
          }),
      );
      c.refresh();
    }, true),
  );
  if (!data.avatarUrl) b.hidden.add('removeAvatar');
  action(c, ['removeAvatar'], () =>
    c.run(async () => {
      result(await supabase.storage.from('profile-photos').remove([user.id + '/avatar']));
      c.refresh();
    }, true),
  );
  action(c, ['666:4411', '666:4412'], () =>
    c.run(async () => {
      const display_name = required(v['profile:name'] ?? profile.display_name, 'Nhập tên hiển thị.');
      const handle = (v['profile:handle'] ?? profile.handle ?? '')
        .trim()
        .replace(/^@/, '')
        .toLowerCase();
      const bio = (v['profile:bio'] ?? profile.bio).trim(),
        location = (v['profile:place'] ?? profile.location).trim();
      if (display_name.length > 80 || bio.length > 150 || location.length > 150)
        throw new Error('Tên tối đa 80 ký tự. Tiểu sử và địa điểm tối đa 150 ký tự.');
      if (handle && !/^[a-z0-9_]{3,30}$/.test(handle))
        throw new Error('Tên người dùng cần 3–30 chữ thường, số hoặc dấu gạch dưới.');
      const saved = await supabase
        .from('ocean_profiles')
        .upsert(
          { id: user.id, display_name, handle: handle || null, bio, location, interests: selected },
          { onConflict: 'id' },
        );
      if (saved.error?.code === '23505') throw new Error('Tên người dùng này đã có người sử dụng.');
      result(saved);
      c.refresh();
      c.go('666:3592');
    }, true),
  );
}
