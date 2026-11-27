import type { CommunityItem } from './data';

export function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return (words.length > 1 ? words[0][0]+words[words.length-1][0] : (words[0][0] || '?')).toUpperCase();
}
export function matchesQuery(query: string, ...fields: (string | null | undefined)[]) {
  const normalize = (text: string) => text.normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/gi,'d').toLowerCase();
  return fields.some(field => field != null && normalize(field).includes(normalize(query.trim())));
}
export function postTags(item: CommunityItem) {
  return [...new Set(item.post.body.match(/#[\p{L}\p{M}\p{N}_]+/gu) || [])];
}
export function commentBody(value: string) {
  const body = value.trim();
  if (!body || [...body].length > 2000) throw new Error('Bình luận cần từ 1 đến 2.000 ký tự.');
  return body;
}
