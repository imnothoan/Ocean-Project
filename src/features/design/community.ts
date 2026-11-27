import { createElement } from 'react';
import { PhotoSelection } from './CommunityContent';
import { Share, View } from 'react-native';
import { action, choices, field, required, type Controller } from './workflow';
import type { CommunityItem, Profile } from './data';
import { pickPhoto, publishPost, type Photo } from './media';

export function community(c: Controller, items: CommunityItem[], profile: Profile) {
  const {id,values:v,binding:b} = c;
  const own = profile.display_name || (c.user ? 'Community member' : 'Guest');
  if (id === '101:2769') {
    for (const [label,art,value] of [['101:2783','101:2782','all'],['101:2785','101:2784','following']]) {
      action(c,[label,art],()=>c.setValue('feedFilter',value));
      b.tint[label]=(v.feedFilter || 'all')===value ? '#ffffff' : '#3f596b';
      b.replacements[art]=createElement(View,{style:{flex:1,borderRadius:18,backgroundColor:(v.feedFilter || 'all')===value?'#0186a8':'#f2f4f5'}});
    }
    b.labels['101:2792'] = own[0];
    b.labels['101:2781'] = 'Together for cleaner shores';
    action(c,['101:2790','101:2791','101:2793','101:2794','101:2798'],() => c.go('115:422'));
    action(c,['101:2786'],() => c.go('666:2965'));
  }
  if (id === '115:422') {
    const photos: Photo[] = JSON.parse(v.postPhotos || '[]');
    b.labels['115:447'] = own;
    b.labels['115:446'] = own[0];
    b.labels['115:455'] = photos.length + '/4 photos';
    if (photos.length) b.replacements['115:459'] = createElement(PhotoSelection); else b.hidden.add('115:459');
    b.hidden.add('115:452');
    field(c,'115:451','postBody','What would you like to share?',{multiline:true});
    field(c,'115:486','postLocation','Add a location');
    field(c,'115:494','mention','Mention your cleanup team');
    const topics = [['115:473','115:474','Beach cleanup'],['115:475','115:476','Wildlife'],['115:477','115:478','Zero waste'],['115:479','115:480','Education']];
    for (const [background,label,topic] of topics) {
      action(c,[background,label],() => c.setValue('topic',topic));
      b.tint[label] = (v.topic || 'Beach cleanup') === topic ? '#0186A8' : '#3F596B';
    }
    const photo = (camera: boolean) => c.run(async () => {
      if (photos.length >= 4) throw new Error('Tối đa 4 ảnh.');
      const picked = await pickPhoto(camera);
      if (picked) c.setValue('postPhotos',JSON.stringify([...photos,picked]));
    });
    action(c,['115:460','115:461','115:465'],() => photo(false));
    action(c,['115:466','115:467','115:471'],() => photo(true));
    action(c,['115:502','115:505'],() => c.run(async () => {
      await publishPost(c.user!.id,required(v.postBody,'Nhập nội dung bài viết.'),v.topic || 'Beach cleanup',v.postLocation || '',v.mention || '',photos);
      for (const key of ['postBody','postPhotos','postLocation','mention','postId','topic']) c.setValue(key,'');
      c.refresh();
      c.go('101:2769');
    },true));
  }
  if (id === '666:3173') {
    const item = items.find(x => x.post.id === v.postId);
    const body = item?.post.body || '';
    const caption = v.shareCaption || '';
    const location = item?.post.location || '';
    Object.assign(b.labels,{'666:3182':'Share','666:3189':'COMMUNITY','666:3191':item?.post.topic || 'Ocean Project','666:3192':body.slice(0,45),'666:3193':String(item?.likes || 0),'666:3194':'Likes','666:3195':String(item?.comments.length || 0),'666:3196':'Comments','666:3197':String(item?.post.photo_paths?.length || 0),'666:3198':'Photos','666:3202':caption.length+' / 200','666:3221':'Include author','666:3222':'Credit the author in the shared text','666:3227':location || 'No location on this post','666:3233':'Share to Community'});
    field(c,'666:3201','shareCaption','Add a caption');
    b.fields['666:3201'].update = text => c.setValue('shareCaption',text.slice(0,200));
    const showAuthor = v.shareAuthor !== 'off';
    const showLocation = v.shareLocation === 'on';
    const message = [caption,body,showAuthor && item ? item.profile?.display_name : '',showLocation ? location : ''].filter(Boolean).join('\n');
    b.labels['666:3221'] = (showAuthor ? '✓ ' : '') + 'Include author';
    b.labels['666:3226'] = (showLocation ? '✓ ' : '') + 'Include location';
    action(c,['666:3221','666:3223','666:3224'],() => c.setValue('shareAuthor',showAuthor ? 'off':'on'));
    action(c,['666:3226','666:3228','666:3229'],() => c.setValue('shareLocation',showLocation ? 'off':'on'));
    const send = () => c.run(async () => { await Share.share({message:required(message,'Add a caption to share.')}); });
    // There is no public post permalink; use the device share sheet for external destinations.
    for (const node of ['666:3212','666:3213','666:3215']) b.hidden.add(node);
    action(c,['666:3208','666:3209','666:3211','666:3216','666:3217','666:3219'],send);
    action(c,['666:3204','666:3205','666:3207','666:3230','666:3233'],() => {
      c.setValue('postBody',message); c.setValue('postPhotos','[]'); c.setValue('postLocation',showLocation ? location : '');
      c.setValue('mention',''); c.setValue('topic',item?.post.topic || 'Beach cleanup'); c.go('115:422');
    });
    action(c,['666:3176'],c.back);
  }
  if (id === '666:2965') {
    field(c,'666:2990','search','Search posts, groups or people');
    action(c,['666:2968'],c.back);
  }
  if (id === '105:2895') action(c,['105:2898'],c.back);
  if (id === '666:4125') action(c,['666:4128'],c.back);
  if (id === '115:2686') choices(c,'groupCategory',{'115:2706':'All','115:2708':'Cleanup','115:2710':'Wildlife','115:2712':'Education'});
  if (id === '666:3366') field(c,'666:3387','memberSearch','Search members');
  if (id === '115:2686') field(c,'115:2700','groupSearch','Search groups or causes');
  if (id === '119:3037' || id === '666:3366') action(c,[id === '119:3037' ? '119:3040':'666:3369'],c.back);
}
