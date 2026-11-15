import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEvent, createEventRecap, loadEventMessages, loadEventParticipants, loadEventRecaps, loadEvents, recordEventCheckIn, registerForEvent, sendEventMessage, submitEventFeedback, updateEvent } from '../../lib/supabase';
import { colors, radii, spacing } from '../../theme/tokens';

const eventImage = require('../../../assets/events/my-khe-beach.png');
const sonTraImage = require('../../../assets/events/son-tra-cleanup.png');
const oceanDayImage = require('../../../assets/events/ocean-day.png');
const recapImages = [
  require('../../../assets/events/recap/memory-1.png'),
  require('../../../assets/events/recap/memory-2.png'),
  require('../../../assets/events/recap/memory-3.png'),
  require('../../../assets/events/recap/memory-4.png'),
  require('../../../assets/events/recap/memory-5.png')
];

export function EventCalendarScreen({ onBack }: { onBack: () => void }) {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  return <ScrollView contentContainerStyle={calendarStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Calendar</Text></View>
    <View style={calendarStyles.month}><Text style={calendarStyles.arrow}>‹‹</Text><Text style={calendarStyles.monthTitle}>October 2026</Text><Text style={calendarStyles.arrow}>››</Text></View>
    <View style={calendarStyles.week}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => <Text key={day} style={calendarStyles.weekday}>{day}</Text>)}</View>
    <View style={calendarStyles.grid}>{days.map((day) => <View key={day} style={[calendarStyles.day, [19, 20, 26].includes(day) && calendarStyles.selectedDay]}><Text style={[calendarStyles.dayText, [19, 20, 26].includes(day) && calendarStyles.selectedText]}>{day}</Text></View>)}</View>
    <Text style={calendarStyles.section}>Sunday, October 20</Text>
    <View style={calendarStyles.event}><Image source={eventImage} style={calendarStyles.eventImage} /><Text style={calendarStyles.eventTitle}>My Khe Beach Cleanup</Text><View style={calendarStyles.eventFooter}><Text style={calendarStyles.meta}>6:30 AM · 2 hours · 12 spots left</Text><Text style={calendarStyles.tag}>Cleanup</Text></View></View>
    <Text style={calendarStyles.section}>Other events this month</Text>
    <View style={calendarStyles.event}><Image source={oceanDayImage} style={calendarStyles.eventImage} /><Text style={calendarStyles.eventTitle}>Ocean Awareness Day</Text><View style={calendarStyles.eventFooter}><Text style={calendarStyles.meta}>Oct 26 · 6:00 AM</Text><Text style={calendarStyles.tag}>Community</Text></View></View>
  </ScrollView>;
}

export function EventChecklistScreen({ onBack }: { onBack: () => void }) {
  const [checked, setChecked] = useState([true, false, true, true, false]);
  const items = [['Reusable gloves', 'Protect your hands while collecting'], ['Reusable water bottle', 'Avoid single-use plastic'], ['Sunscreen and a hat', 'Stay protected in the sun'], ['Suitable footwear', 'Never walk barefoot'], ['Fully charged phone', 'For QR check-in and photos']];
  const toggle = (index: number) => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  const prepared = checked.filter(Boolean).length;
  return <ScrollView contentContainerStyle={checklistStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Preparation Checklist</Text><Text style={checklistStyles.next}>›</Text></View>
    <Text style={checklistStyles.heading}>Ready for cleanup day?</Text><Text style={checklistStyles.subtitle}>Check off the items you've prepared.</Text>
    {items.map(([title, description], index) => <Pressable key={title} onPress={() => toggle(index)} style={[checklistStyles.item, checked[index] && checklistStyles.itemChecked]}><View style={[checklistStyles.checkbox, checked[index] && checklistStyles.checkboxChecked]}><Text style={checklistStyles.check}>{checked[index] ? '✓' : ''}</Text></View><View><Text style={[checklistStyles.itemTitle, checked[index] && checklistStyles.itemTitleChecked]}>{title}</Text><Text style={checklistStyles.itemDescription}>{description}</Text></View></Pressable>)}
    <Text style={checklistStyles.progressLabel}>{prepared} of 5 items prepared</Text><View style={checklistStyles.progress}><View style={[checklistStyles.progressFill, { width: `${prepared * 20}%` }]} /></View>
    <View style={checklistStyles.reminder}><Text style={checklistStyles.reminderTitle}>Safety reminder</Text><Text style={checklistStyles.reminderText}>Do not handle sharp objects or medical waste.</Text></View>
    <Pressable onPress={() => prepared === 5 ? onBack() : undefined} style={styles.register}><Text style={styles.registerText}>Complete checklist</Text></Pressable>
  </ScrollView>;
}

export function MyEventScreen({ onBack }: { onBack: () => void }) {
  return <ScrollView contentContainerStyle={myEventStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>My Event</Text></View>
    <Text style={myEventStyles.section}>Your next event</Text>
    <View style={myEventStyles.card}><Image source={eventImage} style={myEventStyles.heroImage} /><View style={myEventStyles.row}><Text style={myEventStyles.title}>My Khe Beach Cleanup</Text><Text style={myEventStyles.status}>Registered</Text></View><Text style={myEventStyles.meta}>Sun, Oct 20 · 6:30 AM · Da Nang</Text><Text style={myEventStyles.link}>View details</Text><Text style={myEventStyles.checklist}>Checklist 3/5</Text><View style={myEventStyles.progress}><View style={myEventStyles.progressFill} /></View></View>
    <Text style={myEventStyles.section}>Recommended for you</Text>
    <View style={myEventStyles.grid}><View style={myEventStyles.smallCard}><Image source={sonTraImage} style={myEventStyles.smallImage} /><Text style={myEventStyles.smallTitle}>Son Tra Cleanup</Text><Text style={myEventStyles.meta}>Oct 19 · 7:00 AM</Text></View><View style={myEventStyles.smallCard}><Image source={oceanDayImage} style={myEventStyles.smallImage} /><Text style={myEventStyles.smallTitle}>Ocean Day</Text><Text style={myEventStyles.meta}>Oct 26 · 6:00 AM</Text></View></View>
    <Text style={myEventStyles.section}>Past activities</Text>
    <View style={myEventStyles.card}><Image source={oceanDayImage} style={myEventStyles.pastImage} /><View style={myEventStyles.row}><Text style={myEventStyles.title}>Son Tra Coastline Cleanup</Text><Text style={myEventStyles.ended}>Ended</Text></View><Text style={myEventStyles.meta}>Sun, Oct 20 · 6:30 AM · Da Nang</Text><Text style={myEventStyles.link}>View details</Text></View>
  </ScrollView>;
}

export function EventCheckInScreen({ onBack }: { onBack: () => void }) {
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [eventId, setEventId] = useState<string | null>(null);
  useEffect(() => { loadEvents().then(({ data }) => setEventId(data?.[0]?.id ?? null)); }, []);
  return <ScrollView contentContainerStyle={checkInStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Check-in</Text><Text style={checkInStyles.menu}>⋮</Text></View>
    <Text style={checkInStyles.title}>My Khe Beach Cleanup</Text><Text style={checkInStyles.meta}>Sunday, Oct 20 · 6:30 AM</Text>
    <Image source={eventImage} style={checkInStyles.image} />
    {submitted ? <View style={checkInStyles.success}><Text style={checkInStyles.successTitle}>Check-in submitted</Text><Text style={checkInStyles.successText}>Your participation has been recorded.</Text></View> : <><TextInput value={code} onChangeText={setCode} placeholder="Enter the check-in code" placeholderTextColor={colors.aqua} style={checkInStyles.input} /><Text style={checkInStyles.help}>Enter the check-in code to receive your certificate at the end of this event</Text><Pressable onPress={async () => { if (!code.trim()) return Alert.alert('Missing code', 'Enter the check-in code first.'); if (!eventId) return Alert.alert('Unavailable', 'The event is not available yet.'); const { error } = await recordEventCheckIn(eventId, code.trim()); if (error) return Alert.alert('Check-in failed', error.message); setSubmitted(true); }} style={styles.register}><Text style={styles.registerText}>Submit</Text></Pressable></>}
  </ScrollView>;
}

export function EventCheckInCompletedScreen({ onBack }: { onBack: () => void }) {
  return <ScrollView contentContainerStyle={completedStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><View style={completedStyles.titleWrap}><Text style={styles.registrationTitle}>Check-in</Text><Text style={completedStyles.completed}>Completed</Text></View><Text style={checkInStyles.menu}>⋮</Text></View>
    <View style={completedStyles.icon}><Text style={completedStyles.tick}>✓</Text></View>
    <Text style={completedStyles.heading}>You're checked in!</Text><Text style={completedStyles.subtitle}>Have a meaningful day by the sea.</Text>
    <View style={completedStyles.card}><Text style={completedStyles.cardTitle}>My Khe Beach Cleanup</Text><Text style={completedStyles.meta}>Checked in at 6:18 AM</Text><View style={completedStyles.divider} /><View style={completedStyles.row}><Text style={completedStyles.meta}>Participant ID</Text><Text style={completedStyles.id}>EVT-2048-AN</Text></View></View>
    <Text style={completedStyles.goalLabel}>Today's goal</Text><View style={completedStyles.goal}><Text style={completedStyles.cardTitle}>Collect and sort waste</Text><Text style={completedStyles.meta}>Together, we can keep the coast clean.</Text></View>
    <Pressable onPress={() => Alert.alert('Certificate', 'Your certificate will be available after the event is completed.')} style={styles.register}><Text style={styles.registerText}>View certificate</Text></Pressable>
  </ScrollView>;
}

export function EventFeedbackScreen({ onBack }: { onBack: () => void }) {
  const [rating, setRating] = useState(4);
  const [enjoyed, setEnjoyed] = useState('Organization');
  const [joinAgain, setJoinAgain] = useState('Definitely');
  const [thoughts, setThoughts] = useState('');
  const [eventId, setEventId] = useState<string | null>(null);
  useEffect(() => { loadEvents().then(({ data }) => setEventId(data?.[0]?.id ?? null)); }, []);
  const submit = () => {
    if (!thoughts.trim()) {
      Alert.alert('Add feedback', 'Please share a short thought before submitting.');
      return;
    }

    if (!eventId) return Alert.alert('Unavailable', 'The event is not available yet.');
    submitEventFeedback(eventId, rating, thoughts.trim(), enjoyed, joinAgain).then(({ error }) => {
      if (error) return Alert.alert('Unable to submit', error.message);
      Alert.alert('Thank you', 'Your feedback helps the community improve.');
      onBack();
    });
  };
  return <ScrollView contentContainerStyle={feedbackStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Event Feedback</Text><Text style={checkInStyles.menu}>⋮</Text></View>
    <Text style={feedbackStyles.heading}>How was your cleanup experience?</Text><Text style={feedbackStyles.subtitle}>Your feedback helps our community improve.</Text>
    <View style={feedbackStyles.stars}>{[1, 2, 3, 4, 5].map((value) => <Pressable key={value} onPress={() => setRating(value)}><Text style={[feedbackStyles.star, value > rating && feedbackStyles.emptyStar]}>★</Text></Pressable>)}</View>
    <Text style={feedbackStyles.section}>What did you enjoy most?</Text><View style={feedbackStyles.options}>{['Organization', 'Teamwork', 'Impact'].map((option) => <Pressable key={option} onPress={() => setEnjoyed(option)} style={[feedbackStyles.option, enjoyed === option && feedbackStyles.optionActive]}><Text style={[feedbackStyles.optionText, enjoyed === option && feedbackStyles.optionTextActive]}>{option}</Text></Pressable>)}</View>
    <Text style={feedbackStyles.section}>Share more thoughts</Text><TextInput value={thoughts} onChangeText={setThoughts} multiline placeholder="What made this event memorable?" placeholderTextColor={colors.muted} style={feedbackStyles.textarea} />
    <Text style={feedbackStyles.section}>Would you join us again?</Text><View style={feedbackStyles.options}>{['Definitely', 'Maybe', 'Next time'].map((option) => <Pressable key={option} onPress={() => setJoinAgain(option)} style={[feedbackStyles.option, joinAgain === option && feedbackStyles.optionActive]}><Text style={[feedbackStyles.optionText, joinAgain === option && feedbackStyles.optionTextActive]}>{option}</Text></Pressable>)}</View>
    <Pressable onPress={submit} style={styles.register}><Text style={styles.registerText}>Submit feedback</Text></Pressable>
  </ScrollView>;
}

export function EventCertificateScreen({ onBack }: { onBack: () => void }) {
  return <ScrollView contentContainerStyle={certificateStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={certificateStyles.titleBar}>Contribution Certificate</Text></View>
    <View style={certificateStyles.certificate}><Text style={certificateStyles.ocean}>OCEAN CARE</Text><View style={certificateStyles.rule} /><Text style={certificateStyles.label}>CERTIFICATE</Text><Text style={certificateStyles.contribution}>OF COMMUNITY CONTRIBUTION</Text><Text style={certificateStyles.badge}>♙</Text><Text style={certificateStyles.presented}>Presented to</Text><Text style={certificateStyles.name}>Trinh Xuan Hoa</Text><Text style={certificateStyles.presented}>For valuable contribution to</Text><Text style={certificateStyles.event}>My Khe Beach Cleanup</Text><Text style={certificateStyles.date}>October 20, 2026</Text><View style={certificateStyles.signatures}><Text style={certificateStyles.signature}>Organizer</Text><Text style={certificateStyles.signature}>Ocean Care</Text></View></View>
    <Text style={certificateStyles.id}>Certificate ID: OC-2026-2048</Text>
    <Pressable onPress={() => Alert.alert('Certificate', 'Certificate download is ready to connect to document storage.')} style={styles.register}><Text style={styles.registerText}>Download certificate</Text></Pressable>
    <Pressable onPress={() => Alert.alert('Share certificate', 'Sharing will be available when the certificate file is generated.')} style={certificateStyles.share}><Text style={certificateStyles.shareText}>Share certificate</Text></Pressable>
  </ScrollView>;
}

export function EventParticipantsScreen({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState('');
  const [people, setPeople] = useState(['Trinh Xuan Hoa', 'Vo Thi C', 'Pham Ngoc Huy Hoan', 'Bui Quoc Khanh', 'Truong Minh Khanh Long', 'Le Duong Yen Quynh', 'Nguyen Van A']);
  useEffect(() => { loadEvents().then(async ({ data }) => { const eventId = data?.[0]?.id; if (!eventId) return; const result = await loadEventParticipants(eventId); if (result.data?.length) setPeople(result.data.map((person) => person.participant_name)); }); }, []);
  return <ScrollView contentContainerStyle={participantsStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Participants</Text></View>
    <Text style={participantsStyles.title}>My Khe Beach Cleanup</Text><Text style={participantsStyles.meta}>12 registered · 30 spots available</Text>
    <TextInput value={query} onChangeText={setQuery} placeholder="Search participants" placeholderTextColor={colors.muted} style={participantsStyles.search} />
    {people.filter((person) => person.toLowerCase().includes(query.toLowerCase())).map((person, index) => <View key={person} style={participantsStyles.person}><View style={participantsStyles.avatar}><Text style={participantsStyles.avatarText}>{person.slice(0, 1)}</Text></View><View style={participantsStyles.copy}><Text style={participantsStyles.name}>{person}</Text><Text style={participantsStyles.role}>{index === 1 ? 'Team lead' : 'Volunteer'}</Text></View><Pressable onPress={() => Alert.alert('Message', `Message composer opened for ${person}.`)} style={participantsStyles.message}><Text style={participantsStyles.messageText}>Message</Text></Pressable></View>)}
    <Pressable onPress={() => Alert.alert('Group chat', 'Opening the event group chat.')} style={styles.register}><Text style={styles.registerText}>Open group chat</Text></Pressable>
    <Pressable onPress={() => Alert.alert('Check-in', 'Opening event check-in.')} style={participantsStyles.checkin}><Text style={participantsStyles.checkinText}>Check-in</Text></Pressable>
  </ScrollView>;
}

export function EventGroupChatScreen({ onBack }: { onBack: () => void }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{ name: 'Vo Thi C', text: 'Remember to bring your gloves!', mine: false }, { name: 'Trinh Xuan Hoa', text: 'All packed and ready 👍', mine: true }, { name: 'Bui Quoc Khanh', text: 'Meet at the east entrance.', mine: false }, { name: 'Trinh Xuan Hoa', text: 'See you all Sunday morning!', mine: true }]);
  const [eventId, setEventId] = useState<string | null>(null);
  useEffect(() => { loadEvents().then(async ({ data }) => { const id = data?.[0]?.id ?? null; setEventId(id); if (!id) return; const result = await loadEventMessages(id); if (result.data?.length) setMessages(result.data.map((item) => ({ name: 'Participant', text: item.body, mine: false }))); }); }, []);
  return <View style={chatStyles.screen}><View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><View><Text style={styles.registrationTitle}>Group Chat</Text><Text style={chatStyles.subtitle}>My Khe Beach Cleanup</Text></View></View><Text style={chatStyles.today}>TODAY</Text><ScrollView contentContainerStyle={chatStyles.messages}>{messages.map((item, index) => <View key={`${item.name}-${index}`} style={[chatStyles.bubble, item.mine && chatStyles.mine]}><Text style={[chatStyles.sender, item.mine && chatStyles.white]}>{item.name}</Text><Text style={[chatStyles.message, item.mine && chatStyles.white]}>{item.text}</Text></View>)}</ScrollView><View style={chatStyles.composer}><TextInput value={message} onChangeText={setMessage} placeholder="Type a message..." placeholderTextColor={colors.muted} style={chatStyles.input} /><Pressable onPress={async () => { if (!message.trim()) return; const text = message.trim(); if (eventId) { const result = await sendEventMessage(eventId, text); if (result.error) return Alert.alert('Unable to send', result.error.message); } setMessages((current) => [...current, { name: 'Trinh Xuan Hoa', text, mine: true }]); setMessage(''); }} style={chatStyles.send}><Text style={chatStyles.sendText}>➤</Text></Pressable></View></View>;
}

export function EventRecapScreen({ onBack }: { onBack: () => void }) {
  const [recap, setRecap] = useState('');
  useEffect(() => { loadEvents().then(async ({ data }) => { const eventId = data?.[0]?.id; if (!eventId) return; const result = await loadEventRecaps(eventId); if (result.data?.[0]) setRecap(result.data[0].body); }); }, []);
  return <ScrollView contentContainerStyle={recapStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Event Recap</Text></View>
    <Text style={recapStyles.title}>My Khe Beach Cleanup</Text><Text style={recapStyles.meta}>Oct 20 · 6:30 AM · Cleanup</Text>
    <View style={recapStyles.overview}><Text style={recapStyles.overviewTitle}>Overview</Text><View style={recapStyles.metrics}>{[['136 kg', 'Waste collected'], ['87 kg', 'Recyclable waste'], ['24', 'Participants'], ['3', 'Hour duration']].map(([value, label]) => <View key={label} style={recapStyles.metric}><Text style={recapStyles.value}>{value}</Text><Text style={recapStyles.label}>{label}</Text></View>)}</View></View>
    {recap ? <View style={recapStyles.liveRecap}><Text style={recapStyles.liveRecapTitle}>Organizer update</Text><Text style={recapStyles.liveRecapText}>{recap}</Text></View> : null}<Text style={recapStyles.memories}>Some memories...</Text>{recapImages.map((image, index) => <Image key={index} source={image} style={[recapStyles.memory, index % 2 === 1 && recapStyles.memoryOffset]} />)}
    <Pressable onPress={() => Alert.alert('Certificate', 'Opening your contribution certificate.')} style={styles.register}><Text style={styles.registerText}>View Certificate</Text></Pressable>
    <Pressable onPress={() => Alert.alert('Feedback', 'Opening event feedback.')} style={recapStyles.feedback}><Text style={recapStyles.feedbackText}>Add feedback</Text></Pressable>
  </ScrollView>;
}

export function EventSearchFilterScreen({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState('Cleanup');
  const [date, setDate] = useState('Weekend');
  const [difficulty, setDifficulty] = useState('Easy');
  return <ScrollView contentContainerStyle={filterStyles.screen}>
    <Text style={filterStyles.heading}>Filters</Text>
    <Text style={filterStyles.label}>Category</Text><View style={filterStyles.options}>{['Cleanup', 'Education', 'Conservation'].map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[filterStyles.option, category === item && filterStyles.active]}><Text style={[filterStyles.optionText, category === item && filterStyles.activeText]}>{item}</Text></Pressable>)}</View>
    <Text style={filterStyles.label}>Date</Text><View style={filterStyles.options}>{['Today', 'Weekend', 'This month'].map((item) => <Pressable key={item} onPress={() => setDate(item)} style={[filterStyles.option, date === item && filterStyles.active]}><Text style={[filterStyles.optionText, date === item && filterStyles.activeText]}>{item}</Text></Pressable>)}</View>
    <Text style={filterStyles.label}>Distance <Text style={filterStyles.value}>Within 25 km</Text></Text><View style={filterStyles.slider}><View style={filterStyles.sliderFill} /><View style={filterStyles.knob} /></View>
    <Text style={filterStyles.label}>Difficulty</Text><View style={filterStyles.options}>{['Easy', 'Moderate', 'Advanced'].map((item) => <Pressable key={item} onPress={() => setDifficulty(item)} style={[filterStyles.option, difficulty === item && filterStyles.active]}><Text style={[filterStyles.optionText, difficulty === item && filterStyles.activeText]}>{item}</Text></Pressable>)}</View>
    <Text style={filterStyles.label}>Sort by</Text><View style={filterStyles.select}><Text style={filterStyles.optionText}>Nearest to me</Text><Text>⌄</Text></View>
    <View style={filterStyles.actions}><Pressable onPress={onBack} style={filterStyles.cancel}><Text style={filterStyles.cancelText}>Cancel</Text></Pressable><Pressable onPress={onBack} style={styles.register}><Text style={styles.registerText}>Apply</Text></Pressable></View>
  </ScrollView>;
}

export function EventAdminScreen({ onBack, mode }: { onBack: () => void; mode: 'home' | 'manage' | 'approve' | 'recap' }) {
  const [approved, setApproved] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [recapBody, setRecapBody] = useState('');
  const [eventId, setEventId] = useState<string | null>(null);
  const candidates = ['Nguyen Minh Anh', 'Le Hoang Nam', 'Pham Thu Ha'];
  useEffect(() => { loadEvents().then(({ data }) => setEventId(data?.[0]?.id ?? null)); }, []);
  const title = mode === 'home' ? 'Organizer dashboard' : mode === 'manage' ? 'Manage event' : mode === 'approve' ? 'Approve participants' : 'Post event recap';
  return <ScrollView contentContainerStyle={adminStyles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>{title}</Text></View>
    <View style={adminStyles.hero}><Text style={adminStyles.eyebrow}>MY KHE BEACH CLEANUP</Text><Text style={adminStyles.heroTitle}>Sunday, October 20 · 6:30 AM</Text><Text style={adminStyles.heroMeta}>12 registered · 30 spots · Da Nang</Text></View>
    {mode === 'home' && <><Text style={adminStyles.section}>Today at a glance</Text><View style={adminStyles.metrics}>{[['12', 'Participants'], ['3', 'Pending'], ['136 kg', 'Impact target']].map(([value, label]) => <View key={label} style={adminStyles.metric}><Text style={adminStyles.metricValue}>{value}</Text><Text style={adminStyles.metricLabel}>{label}</Text></View>)}</View><Pressable onPress={() => Alert.alert('Event management', 'Choose an organizer action from the event menu.')} style={styles.register}><Text style={styles.registerText}>Open event management</Text></Pressable></>}
    {mode === 'manage' && <><Text style={adminStyles.section}>Event actions</Text>{['Edit event details', 'Approve participants', 'Post event recap', 'Review impact metrics'].map((item) => <Pressable key={item} onPress={() => Alert.alert(item, 'This action is ready for organizer review.')} style={adminStyles.action}><Text style={adminStyles.actionText}>{item}</Text><Text style={adminStyles.chevron}>›</Text></Pressable>)}</>}
    {mode === 'approve' && <><Text style={adminStyles.section}>Pending requests</Text>{candidates.map((person) => { const isApproved = approved.includes(person); return <View key={person} style={adminStyles.person}><View style={adminStyles.avatar}><Text style={adminStyles.avatarText}>{person[0]}</Text></View><Text style={adminStyles.personName}>{person}</Text><Pressable onPress={() => setApproved((current) => isApproved ? current.filter((name) => name !== person) : [...current, person])} style={[adminStyles.approve, isApproved && adminStyles.approved]}><Text style={adminStyles.approveText}>{isApproved ? 'Approved' : 'Approve'}</Text></Pressable></View>; })}<Text style={adminStyles.helper}>{approved.length} participant{approved.length === 1 ? '' : 's'} approved</Text></>}
    {mode === 'recap' && <><Text style={adminStyles.section}>Share the impact</Text><TextInput value={recapBody} onChangeText={setRecapBody} multiline placeholder="Tell volunteers what they achieved together..." placeholderTextColor={colors.muted} style={adminStyles.textarea} /><Pressable onPress={async () => { if (!recapBody.trim()) return Alert.alert('Add a recap', 'Write a short update before publishing.'); if (!eventId) return Alert.alert('Unavailable', 'The event is not available yet.'); const result = await createEventRecap(eventId, recapBody.trim()); if (result.error) return Alert.alert('Unable to publish', result.error.message); setPublished(true); }} style={styles.register}><Text style={styles.registerText}>{published ? 'Recap published' : 'Publish event recap'}</Text></Pressable>{published && <View style={adminStyles.success}><Text style={adminStyles.successText}>Your recap is now visible to participants.</Text></View>}</>}
  </ScrollView>;
}

export function EditEventScreen({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState('My Khe Beach Cleanup');
  const [location, setLocation] = useState('My Khe Beach, Da Nang');
  const [capacity, setCapacity] = useState('30');
  const [eventId, setEventId] = useState<string | null>(null);
  useEffect(() => { loadEvents().then(({ data }) => setEventId(data?.[0]?.id ?? null)); }, []);
  return <ScrollView contentContainerStyle={createStyles.screen}><View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Edit Event</Text></View><Text style={createStyles.heading}>Update event details</Text><Text style={createStyles.subtitle}>Keep volunteers informed when plans change.</Text><Text style={createStyles.label}>Event name</Text><TextInput value={title} onChangeText={setTitle} style={createStyles.input} /><Text style={createStyles.label}>Location</Text><TextInput value={location} onChangeText={setLocation} style={createStyles.input} /><Text style={createStyles.label}>Capacity</Text><TextInput value={capacity} onChangeText={setCapacity} keyboardType="number-pad" style={createStyles.input} /><View style={createStyles.notice}><Text style={createStyles.noticeTitle}>Important</Text><Text style={createStyles.noticeText}>Registered participants will receive a notification when you save these changes.</Text></View><Pressable onPress={async () => { if (!eventId) return Alert.alert('Unavailable', 'The event is not available yet.'); const { error } = await updateEvent(eventId, { title, location, capacity: Number(capacity) || 30 }); if (error) return Alert.alert('Unable to save', error.message); Alert.alert('Saved', 'Event details have been updated.'); }} style={styles.register}><Text style={styles.registerText}>Save changes</Text></Pressable></ScrollView>;
}

export function CreateEventScreen({ onBack, step = 1 }: { onBack: () => void; step?: number }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Cleanup');
  const [bankCode, setBankCode] = useState('');
  const [account, setAccount] = useState('');
  const [holder, setHolder] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [items, setItems] = useState(['Gloves', 'Reusable water bottle', 'Hat / sunscreen']);
  useEffect(() => { AsyncStorage.getItem('ocean.eventDraft').then((raw) => { if (!raw) return; try { const draft = JSON.parse(raw) as Partial<{ name: string; description: string; type: string; bankCode: string; account: string; holder: string; date: string; location: string; items: string[] }>; if (draft.name) setName(draft.name); if (draft.description) setDescription(draft.description); if (draft.type) setType(draft.type); if (draft.bankCode) setBankCode(draft.bankCode); if (draft.account) setAccount(draft.account); if (draft.holder) setHolder(draft.holder); if (draft.date) setDate(draft.date); if (draft.location) setLocation(draft.location); if (draft.items) setItems(draft.items); } catch { Alert.alert('Draft unavailable', 'The saved event draft could not be restored.'); } }); }, []);
  const submit = () => {
    if (step === 3 ? !bankCode || !account || !holder : step === 2 ? !date.trim() || !location.trim() : !name.trim()) {
      Alert.alert('Missing information', 'Complete the required fields before continuing.');
      return;
    }

    AsyncStorage.setItem('ocean.eventDraft', JSON.stringify({ name, description, type, bankCode, account, holder, date, location, items })).then(() => Alert.alert('Saved', 'Event draft saved locally for the next step.')).catch(() => Alert.alert('Unable to save', 'The event draft could not be saved.'));
  };
  if (step === 2) return <ScrollView contentContainerStyle={createStyles.screen}><View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Create Event</Text></View><Text style={createStyles.step}>Step 2 of 4</Text><View style={createStyles.progress}><View style={[createStyles.progressFill, { width: '50%' }]} /></View><Text style={createStyles.heading}>Set the place and time</Text><Text style={createStyles.subtitle}>Clear details help people join with ease.</Text><Text style={createStyles.label}>Location</Text><Pressable onPress={() => setLocation(location ? '' : 'My Khe Beach, Da Nang')} style={createStyles.selectInput}><Text style={createStyles.selectText}>{location || 'My Khe Beach, Da Nang'}</Text></Pressable><View style={createStyles.mapPreview}><Text style={createStyles.mapRoad}>▱  ───  ▱  ───  ▱</Text><Text style={createStyles.mapWater}>≈ ≈ ≈ ≈ ≈</Text><View style={createStyles.mapMarker}><Text style={createStyles.mapMarkerText}>●</Text></View><Text style={createStyles.mapPlace}>My Khe Beach</Text></View><Text style={createStyles.label}>Event date</Text><Pressable onPress={() => setDate(date ? '' : 'Oct 20, 2026')} style={createStyles.selectInput}><Text style={createStyles.selectText}>{date || 'Oct 20, 2026'}</Text><Text>⌄</Text></Pressable><Text style={createStyles.label}>Start time</Text><Pressable onPress={() => setDate(date.includes('6:30') ? 'Oct 20, 2026' : 'Oct 20, 2026 · 6:30 AM')} style={createStyles.selectInput}><Text style={createStyles.selectText}>{date.includes('6:30') ? '6:30 AM' : '6:30 AM'}</Text><Text>⌄</Text></Pressable><Text style={createStyles.label}>Duration</Text><Pressable onPress={() => undefined} style={createStyles.selectInput}><Text style={createStyles.selectText}>2 hours</Text><Text>⌄</Text></Pressable><Pressable onPress={submit} style={styles.register}><Text style={styles.registerText}>Continue</Text></Pressable></ScrollView>;
  if (step === 3) return <ScrollView contentContainerStyle={createStyles.screen}><View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Create Event</Text></View><Text style={createStyles.step}>Step 3 of 4</Text><View style={createStyles.progress}><View style={[createStyles.progressFill, { width: '75%' }]} /></View><Text style={createStyles.heading}>Create a Donation Campaign</Text><View style={createStyles.card}><Text style={createStyles.label}>Bank code</Text><TextInput value={bankCode} onChangeText={setBankCode} placeholder="eg. 970422" style={createStyles.input} /><Text style={createStyles.label}>Account number</Text><TextInput value={account} onChangeText={setAccount} placeholder="eg. 1234567890" style={createStyles.input} /><Text style={createStyles.label}>Account holder name</Text><TextInput value={holder} onChangeText={setHolder} placeholder="eg. NGUYEN VAN A" style={createStyles.input} /><View style={createStyles.qr}><Text style={createStyles.qrTitle}>Generated QR code preview</Text><View style={createStyles.qrContent}><View><Text style={createStyles.qrBrand}>✣ MB</Text><Text style={createStyles.qrName}>TRINH XUAN HOA</Text><Text style={createStyles.qrAccount}>03*****344</Text><Pressable onPress={() => Alert.alert('QR preview', 'The QR code is generated from the bank details.')} style={createStyles.qrButton}><Text style={createStyles.qrButtonText}>▣  Quét QR</Text></Pressable></View><Text style={createStyles.qrPattern}>▦</Text></View><Text style={createStyles.qrHelp}>ⓘ No QR upload needed. The app generates it from your bank code, account number and name.</Text></View></View><Pressable onPress={submit} style={styles.register}><Text style={styles.registerText}>Continue</Text></Pressable><Pressable onPress={onBack} style={createStyles.skip}><Text style={createStyles.skipText}>Skip</Text></Pressable></ScrollView>;
  if (step === 4) return <ScrollView contentContainerStyle={createStyles.screen}><View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Create Event</Text></View><Text style={createStyles.step}>Step 4 of 4</Text><View style={createStyles.progress}><View style={[createStyles.progressFill, { width: '100%' }]} /></View><Text style={createStyles.heading}>Help everyone prepare</Text><Text style={createStyles.subtitle}>Let volunteers know what to bring.</Text><Text style={createStyles.label}>Maximum participants</Text><View style={createStyles.selectInput}><Text style={createStyles.selectText}>30 people</Text></View><Text style={createStyles.label}>Items to bring</Text>{items.map((item, index) => <View key={item} style={createStyles.itemRow}><View><Text style={createStyles.itemTitle}>{item}</Text><Text style={createStyles.itemMeta}>{index === 0 ? 'Required' : 'Recommended'}</Text></View><Pressable onPress={() => setItems((current) => current.filter((value) => value !== item))}><Text style={createStyles.delete}>⌫</Text></Pressable></View>)}<Pressable onPress={() => setItems((current) => [...current, 'Fully charged phone'])} style={createStyles.addItem}><Text style={createStyles.addItemText}>⊕  Add more items</Text></Pressable><View style={createStyles.safety}><Text style={createStyles.safetyTitle}>Safety notes</Text><View style={createStyles.safetyInner}><Text style={createStyles.safetyText}>Avoid sharp objects and hazardous waste.</Text></View></View><Pressable onPress={async () => { const { error } = await createEvent({ title: name || 'Beach cleanup day', description: description || 'Community ocean care event', event_date: date ? new Date(date).toISOString() : new Date(Date.now() + 86400000 * 7).toISOString(), location: location || 'My Khe Beach, Da Nang', capacity: 30 }); if (error) Alert.alert('Unable to publish', error.message); else { await AsyncStorage.removeItem('ocean.eventDraft'); Alert.alert('Preview ready', 'Your event is ready to preview.'); } }} style={styles.register}><Text style={styles.registerText}>Preview event</Text></Pressable></ScrollView>;
  return <ScrollView contentContainerStyle={createStyles.screen}><View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Create Event</Text></View><Text style={createStyles.step}>Step {step} of 4</Text><View style={createStyles.progress}><View style={[createStyles.progressFill, { width: `${step * 25}%` }]} /></View><Text style={createStyles.heading}>Start with an idea</Text><Text style={createStyles.subtitle}>Share the basics with your community.</Text><Text style={createStyles.label}>Event name</Text><TextInput value={name} onChangeText={setName} placeholder="e.g. Beach cleanup day" style={createStyles.input} /><Text style={createStyles.label}>Activity type</Text><View style={filterStyles.options}>{['Cleanup', 'Education', 'Rescues'].map((item) => <Pressable key={item} onPress={() => setType(item)} style={[filterStyles.option, type === item && filterStyles.active]}><Text style={[filterStyles.optionText, type === item && filterStyles.activeText]}>{item}</Text></Pressable>)}</View><Text style={createStyles.label}>Event image</Text><Image source={eventImage} style={createStyles.eventImage} /><Text style={createStyles.label}>Description</Text><TextInput value={description} onChangeText={setDescription} multiline placeholder="Goals and activity details..." style={[createStyles.input, createStyles.multiline]} /><Pressable onPress={submit} style={styles.register}><Text style={styles.registerText}>Continue</Text></Pressable></ScrollView>;
}

export function EventsHomeScreen({ onOpenDetail }: { onOpenDetail: () => void }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [events, setEvents] = useState<Array<{ id: string; title: string; event_date: string; location: string; capacity: number }>>([]);

  useEffect(() => {
    loadEvents().then(({ data }) => {
      if (data) setEvents(data);
    });
  }, []);

  const featured = events[0];
  const visibleEvents = events.filter((event) => {
    const matchesQuery = `${event.title} ${event.location}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === 'All' || event.title.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesQuery && matchesFilter;
  });

  return (
    <ScrollView contentContainerStyle={homeStyles.screen} showsVerticalScrollIndicator={false}>
      <View style={homeStyles.searchRow}>
        <TextInput value={query} onChangeText={setQuery} placeholder="Event name or location..." placeholderTextColor={colors.muted} style={homeStyles.search} />
        <Pressable style={homeStyles.filter} onPress={() => setActiveFilter(activeFilter === 'All' ? 'Cleanup' : 'All')}><Text style={homeStyles.filterText}>≡</Text></Pressable>
      </View>
      <Pressable onPress={onOpenDetail} style={homeStyles.featured}>
        <View style={homeStyles.featuredTop}><Text style={homeStyles.eyebrow}>FEATURED EVENT</Text><Text style={homeStyles.spots}>12 spots left</Text></View>
        <Image source={eventImage} style={homeStyles.featuredImage} />
        <Text style={homeStyles.eventTitle}>My Khe Beach Cleanup</Text>
        <Text style={homeStyles.meta}>Sun, Oct 20 · 6:30 AM · Da Nang</Text>
      </Pressable>
      <View style={homeStyles.sectionHeader}><Text style={homeStyles.section}>Discover events</Text><Text style={homeStyles.link}>View all</Text></View>
      <View style={homeStyles.filters}>{['All', 'Cleanup', 'Education', 'Rescues'].map((filter) => <Pressable key={filter} onPress={() => setActiveFilter(filter)} style={[homeStyles.chip, activeFilter === filter && homeStyles.chipActive]}><Text style={[homeStyles.chipText, activeFilter === filter && homeStyles.chipTextActive]}>{filter}</Text></Pressable>)}</View>
      <View style={homeStyles.eventGrid}>
        {(visibleEvents.length ? visibleEvents.slice(0, 2) : [
          { id: 'son-tra', title: 'Son Tra Cleanup', event_date: '2026-10-19T07:00:00Z', location: 'Da Nang', capacity: 12 },
          { id: 'ocean-day', title: 'Ocean Day', event_date: '2026-10-26T06:00:00Z', location: 'Da Nang', capacity: 24 }
        ]).map((event, index) => <Pressable key={event.id} onPress={onOpenDetail} style={homeStyles.eventCard}><Image source={index === 0 ? sonTraImage : oceanDayImage} style={homeStyles.cardImage} /><Text style={homeStyles.cardTitle}>{event.title}</Text><Text style={homeStyles.meta}>Oct {index === 0 ? '19' : '26'} · {index === 0 ? '7:00' : '6:00'} AM</Text><View style={homeStyles.badge}><Text style={homeStyles.badgeText}>{event.capacity} people</Text></View></Pressable>)}
      </View>
      <View style={homeStyles.sectionHeader}><Text style={homeStyles.section}>Donation Campaigns</Text><Text style={homeStyles.link}>View all</Text></View>
      {[['12', 'Protect Phu Quoc Coral Reef', '$14,400 of $20,000 (72%)'], ['24', 'Nha Trang Coastline Cleanup', '$4,500 of $10,000 (45%)']].map(([days, title, amount]) => <View key={title} style={homeStyles.campaign}><View style={homeStyles.days}><Text style={homeStyles.daysNumber}>{days}</Text><Text style={homeStyles.daysText}>Days left</Text></View><View><Text style={homeStyles.cardTitle}>{title}</Text><Text style={homeStyles.meta}>{amount}</Text></View></View>)}
    </ScrollView>
  );
}

export function EventDetailScreen({ onBack }: { onBack: () => void }) {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [eventId, setEventId] = useState<string | null>(null);
  useEffect(() => {
    loadEvents().then(({ data }) => setEventId(data?.[0]?.id ?? null));
  }, []);
  if (registrationOpen) {
    return <EventRegistrationScreen eventId={eventId} onBack={() => setRegistrationOpen(false)} onRegistered={() => { setRegistered(true); setRegistrationOpen(false); }} />;
  }
  async function register() {
    if (!eventId) {
      Alert.alert('Registration unavailable', 'No event is currently available.');
      return;
    }
    const result = await registerForEvent(eventId, 'Hoan', 'hoan@example.com');
    if (result.error) {
      Alert.alert('Registration unavailable', result.error.message);
      return;
    }
    setRegistered(true);
  }
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.title}>Event Detail</Text><Text style={styles.menu}>⋮</Text></View>
      <Image source={eventImage} style={styles.image} />
      <Text style={styles.heading}>My Khe Beach Cleanup</Text>
      <Text style={styles.subtitle}>A morning for a cleaner coastline.</Text>
      <View style={styles.infoCard}><Text style={styles.infoTitle}>◷   Sunday, Oct 20 · 6:30 AM</Text><Text style={styles.infoText}>⌖   My Khe Beach, Da Nang</Text></View>
      <Text style={styles.section}>About this event</Text>
      <Text style={styles.body}>Join us to collect, sort, and document waste to help protect marine ecosystems.</Text>
      <Text style={styles.section}>Donation campaign</Text>
      <View style={styles.progress}><View style={styles.progressFill} /></View>
      <Text style={styles.body}>$161.00 / $225.00</Text>
      <Text style={styles.section}>Organized by</Text>
      <View style={styles.organizer}><View style={styles.organizerAvatar}><Text>🌊</Text></View><View><Text style={styles.infoTitle}>Ocean Care Vietnam</Text><Text style={styles.body}>Verified community organizer</Text></View></View>
      <Text style={styles.infoTitle}>12 / 30 participants</Text>
      <View style={styles.progress}><View style={[styles.progressFill, { width: '40%' }]} /></View>
      <Pressable onPress={() => registered ? undefined : setRegistrationOpen(true)} style={styles.register}><Text style={styles.registerText}>{registered ? 'Registered' : 'Register for event'}</Text></Pressable>
    </ScrollView>
  );
}

function EventRegistrationScreen({ eventId, onBack, onRegistered }: { eventId: string | null; onBack: () => void; onRegistered: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [help, setHelp] = useState('Collect waste');
  const confirm = async () => {
    if (!eventId || !name.trim() || !email.includes('@') || !phone.trim()) {
      Alert.alert('Missing information', 'Please complete your name, email, and phone number.');
      return;
    }
    const result = await registerForEvent(eventId, name.trim(), email.trim());
    if (result.error) {
      Alert.alert('Registration unavailable', result.error.message);
      return;
    }
    onRegistered();
  };
  return <ScrollView contentContainerStyle={styles.screen}>
    <View style={styles.top}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.registrationTitle}>Event Registration</Text></View>
    <View style={styles.registrationEvent}><Text style={styles.heading}>My Khe Beach Cleanup</Text><Text style={styles.subtitle}>Oct 20 · 6:30 AM · Da Nang</Text></View>
    <Text style={styles.section}>Participant information</Text>
    <Text style={styles.fieldLabel}>Full name</Text><TextInput value={name} onChangeText={setName} placeholder="Trinh Xuan Hoa" style={styles.registrationInput} />
    <Text style={styles.fieldLabel}>Email address</Text><TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="trinhxuanhoa@email.com" style={styles.registrationInput} />
    <Text style={styles.fieldLabel}>Phone number</Text><TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+84 9xx xxx xxx" style={styles.registrationInput} />
    <Text style={styles.section}>How would you like to help?</Text>
    <View style={styles.helpRow}>{['Collect waste', 'Sort recyclables', 'Take photos'].map((option) => <Pressable key={option} onPress={() => setHelp(option)} style={[styles.helpOption, help === option && styles.helpOptionActive]}><Text style={[styles.helpText, help === option && styles.helpTextActive]}>{option}</Text></Pressable>)}</View>
    <Pressable onPress={confirm} style={styles.register}><Text style={styles.registerText}>Confirm registration</Text></Pressable>
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 60 },
  top: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.lg, paddingTop: spacing.sm },
  back: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 22, height: 43, justifyContent: 'center', left: 0, position: 'absolute', width: 43 },
  backText: { color: colors.ink, fontSize: 32, lineHeight: 32 },
  title: { backgroundColor: colors.sky, borderRadius: 20, color: colors.ink, fontSize: 18, fontWeight: '800', paddingHorizontal: 23, paddingVertical: 11 },
  menu: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 22, color: colors.ink, fontSize: 26, height: 43, justifyContent: 'center', paddingBottom: 8, position: 'absolute', right: 0, textAlign: 'center', width: 43 },
  image: { borderRadius: 10, height: 185, width: '100%' },
  heading: { color: colors.navy, fontSize: 22, fontWeight: '800', marginTop: spacing.md },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 6 },
  infoCard: { borderColor: colors.line, borderRadius: 14, borderWidth: 1, marginTop: spacing.md, padding: spacing.lg },
  infoTitle: { color: colors.navy, fontSize: 14, fontWeight: '800', marginBottom: 8 },
  infoText: { color: colors.muted, fontSize: 14 },
  section: { color: colors.navy, fontSize: 14, fontWeight: '800', marginTop: spacing.lg, marginBottom: 8 },
  body: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  progress: { backgroundColor: '#C9D8E0', borderRadius: 4, height: 5, marginTop: 6, overflow: 'hidden' },
  progressFill: { backgroundColor: colors.mint, borderRadius: 4, height: 5, width: '72%' },
  organizer: { alignItems: 'center', flexDirection: 'row', marginBottom: spacing.lg },
  organizerAvatar: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 17, height: 34, justifyContent: 'center', marginRight: 9, width: 34 },
  register: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 14, marginTop: spacing.xxl, padding: 16 },
  registerText: { color: colors.white, fontSize: 15, fontWeight: '800' }
  ,registrationTitle: { backgroundColor: colors.sky, borderRadius: 20, color: colors.ink, fontSize: 18, fontWeight: '800', paddingHorizontal: 28, paddingVertical: 11 },
  registrationEvent: { backgroundColor: '#EDFBFF', borderColor: '#C9D5DE', borderRadius: 12, borderWidth: 1, marginBottom: 8, padding: 14 },
  fieldLabel: { color: colors.muted, fontSize: 14, fontWeight: '800', marginBottom: 6, marginTop: 10 },
  registrationInput: { borderColor: colors.line, borderRadius: 12, borderWidth: 1, color: colors.navy, fontSize: 14, padding: 14 },
  helpRow: { flexDirection: 'row', gap: 7 },
  helpOption: { backgroundColor: '#F1F3F4', borderRadius: 18, paddingHorizontal: 11, paddingVertical: 9 },
  helpOptionActive: { backgroundColor: colors.aqua },
  helpText: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  helpTextActive: { color: colors.white }
});

const homeStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 110 },
  searchRow: { alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: spacing.lg, paddingTop: spacing.sm },
  search: { borderColor: colors.line, borderRadius: 22, borderWidth: 1, color: colors.muted, flex: 1, fontSize: 12, paddingHorizontal: 15, paddingVertical: 11 },
  filter: { alignItems: 'center', borderColor: colors.line, borderRadius: 22, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  filterText: { color: colors.ink, fontSize: 20 },
  featured: { backgroundColor: '#EDFBFF', borderColor: '#C9D5DE', borderRadius: 10, borderWidth: 1, padding: 14 },
  featuredTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 9 },
  eyebrow: { color: colors.ink, fontSize: 9, fontWeight: '800' },
  spots: { backgroundColor: colors.mint, borderRadius: 8, color: colors.ink, fontSize: 10, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 3 },
  featuredImage: { borderRadius: 9, height: 96, width: '100%' },
  eventTitle: { color: colors.navy, fontSize: 15, fontWeight: '800', marginTop: 10 },
  meta: { color: colors.ink, fontSize: 11, marginTop: 5 },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 18 },
  section: { color: colors.navy, fontSize: 16, fontWeight: '800' },
  link: { color: colors.ink, fontSize: 11, fontWeight: '800' },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  chip: { backgroundColor: '#F1F3F4', borderRadius: 18, paddingHorizontal: 15, paddingVertical: 8 },
  chipActive: { backgroundColor: colors.aqua },
  chipText: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  chipTextActive: { color: colors.white },
  eventGrid: { flexDirection: 'row', gap: 12 },
  eventCard: { backgroundColor: '#EDFBFF', borderColor: '#C9D5DE', borderRadius: 14, borderWidth: 1, flex: 1, padding: 9 },
  cardImage: { borderRadius: 9, height: 68, width: '100%' },
  cardTitle: { color: colors.navy, fontSize: 12, fontWeight: '800', marginTop: 8 },
  badge: { alignSelf: 'flex-end', backgroundColor: colors.mint, borderRadius: 8, marginTop: 6, paddingHorizontal: 7, paddingVertical: 3 },
  badgeText: { color: colors.ink, fontSize: 9, fontWeight: '800' },
  campaign: { alignItems: 'center', borderColor: colors.line, borderRadius: 14, borderWidth: 1, flexDirection: 'row', marginBottom: 10, padding: 10 },
  days: { alignItems: 'center', backgroundColor: '#EDFBFF', borderRadius: 10, marginRight: 13, paddingHorizontal: 12, paddingVertical: 8 },
  daysNumber: { color: colors.navy, fontSize: 16, fontWeight: '800' },
  daysText: { color: colors.ink, fontSize: 8, marginTop: 2 }
});

const calendarStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  month: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22, marginTop: 16 },
  monthTitle: { color: colors.navy, fontSize: 20, fontWeight: '800' },
  arrow: { color: colors.navy, fontSize: 20, fontWeight: '800' },
  week: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  weekday: { color: colors.muted, fontSize: 8, textAlign: 'center', width: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-start' },
  day: { alignItems: 'center', backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 19, borderWidth: 1, height: 36, justifyContent: 'center', width: 36 },
  selectedDay: { backgroundColor: colors.aqua, borderColor: colors.aqua },
  dayText: { color: colors.navy, fontSize: 11, fontWeight: '800' },
  selectedText: { color: colors.white },
  section: { color: colors.navy, fontSize: 15, fontWeight: '800', marginBottom: 10, marginTop: 32 },
  event: { backgroundColor: '#EDFBFF', borderColor: '#C9D5DE', borderRadius: 14, borderWidth: 1, padding: 11 },
  eventImage: { borderRadius: 9, height: 56, width: '100%' },
  eventTitle: { color: colors.navy, fontSize: 13, fontWeight: '800', marginTop: 9 },
  eventFooter: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  meta: { color: colors.muted, fontSize: 11 },
  tag: { backgroundColor: colors.mint, borderRadius: 15, color: colors.ink, fontSize: 10, fontWeight: '800', paddingHorizontal: 14, paddingVertical: 8 }
});

const checklistStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  next: { backgroundColor: colors.sky, borderRadius: 22, color: colors.ink, fontSize: 28, height: 43, lineHeight: 38, position: 'absolute', right: 0, textAlign: 'center', width: 43 },
  heading: { color: colors.navy, fontSize: 23, fontWeight: '800', marginTop: 16 },
  subtitle: { color: colors.muted, fontSize: 14, marginBottom: 18, marginTop: 5 },
  item: { alignItems: 'center', borderColor: colors.line, borderRadius: 13, borderWidth: 1, flexDirection: 'row', marginBottom: 9, padding: 13 },
  itemChecked: { backgroundColor: '#EDFBFF', borderColor: colors.mint },
  checkbox: { alignItems: 'center', borderColor: colors.line, borderRadius: 6, borderWidth: 1, height: 24, justifyContent: 'center', marginRight: 13, width: 24 },
  checkboxChecked: { backgroundColor: colors.mint, borderColor: colors.mint },
  check: { color: colors.white, fontSize: 16, fontWeight: '800' },
  itemTitle: { color: colors.muted, fontSize: 15, fontWeight: '800' },
  itemTitleChecked: { color: '#0186A8' },
  itemDescription: { color: colors.muted, fontSize: 12, marginTop: 3 },
  progressLabel: { color: colors.muted, fontSize: 14, fontWeight: '800', marginTop: 10 },
  progress: { backgroundColor: '#C9D8E0', borderRadius: 4, height: 5, marginTop: 6, overflow: 'hidden' },
  progressFill: { backgroundColor: colors.mint, height: 5 },
  reminder: { backgroundColor: '#FFF0D0', borderColor: colors.warning, borderRadius: 13, borderWidth: 1, marginTop: 26, padding: 14 },
  reminderTitle: { color: colors.coral, fontSize: 15, fontWeight: '800' },
  reminderText: { color: colors.coral, fontSize: 12, marginTop: 7 }
});

const myEventStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  section: { color: colors.navy, fontSize: 17, fontWeight: '800', marginBottom: 8, marginTop: 16 },
  card: { backgroundColor: '#EDFBFF', borderColor: '#C9D5DE', borderRadius: 12, borderWidth: 1, marginBottom: 12, padding: 14 },
  heroImage: { borderRadius: 9, height: 116, width: '100%' },
  pastImage: { borderRadius: 9, height: 116, width: '100%' },
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 },
  title: { color: colors.navy, flex: 1, fontSize: 16, fontWeight: '800' },
  status: { backgroundColor: colors.mint, borderRadius: 7, color: colors.ink, fontSize: 10, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 3 },
  ended: { backgroundColor: colors.coral, borderRadius: 7, color: colors.white, fontSize: 10, fontWeight: '800', paddingHorizontal: 12, paddingVertical: 3 },
  link: { alignSelf: 'flex-end', color: colors.navy, fontSize: 11, fontWeight: '800', marginTop: -14 },
  checklist: { color: colors.muted, fontSize: 12, fontWeight: '800', marginTop: 16 },
  progress: { backgroundColor: '#C9D8E0', borderRadius: 4, height: 5, marginTop: 6, overflow: 'hidden' },
  progressFill: { backgroundColor: colors.mint, height: 5, width: '60%' },
  grid: { flexDirection: 'row', gap: 12 },
  smallCard: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 13, borderWidth: 1, flex: 1, padding: 9 },
  smallImage: { borderRadius: 8, height: 60, width: '100%' },
  smallTitle: { color: colors.navy, fontSize: 12, fontWeight: '800', marginTop: 7 },
  meta: { color: colors.muted, fontSize: 11, marginTop: 5 }
});

const checkInStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  menu: { backgroundColor: colors.sky, borderRadius: 22, color: colors.ink, fontSize: 26, height: 43, lineHeight: 34, position: 'absolute', right: 0, textAlign: 'center', width: 43 },
  title: { color: colors.navy, fontSize: 23, fontWeight: '800', marginTop: 26, textAlign: 'center' },
  meta: { color: colors.muted, fontSize: 14, marginTop: 5, textAlign: 'center' },
  image: { borderRadius: 10, height: 245, marginTop: 32, width: '100%' },
  input: { borderColor: colors.aqua, borderRadius: 20, borderWidth: 1, color: colors.navy, fontSize: 14, fontWeight: '800', marginTop: 30, padding: 14 },
  help: { color: '#A3A7A9', fontSize: 14, lineHeight: 22, marginHorizontal: 20, marginTop: 34 },
  success: { alignItems: 'center', backgroundColor: '#EDFBFF', borderColor: colors.mint, borderRadius: 14, borderWidth: 1, marginTop: 30, padding: 18 },
  successTitle: { color: colors.positive, fontSize: 17, fontWeight: '800' },
  successText: { color: colors.muted, fontSize: 13, marginTop: 6 }
});

const completedStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  titleWrap: { alignItems: 'center' },
  completed: { color: colors.ink, fontSize: 9, marginTop: -4 },
  icon: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 57, height: 114, justifyContent: 'center', marginTop: 50, alignSelf: 'center', width: 114 },
  tick: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 40, color: colors.white, fontSize: 48, height: 80, lineHeight: 72, textAlign: 'center', width: 80 },
  heading: { color: colors.navy, fontSize: 24, fontWeight: '800', marginTop: 25, textAlign: 'center' },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 8, textAlign: 'center' },
  card: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 14, borderWidth: 1, marginTop: 46, padding: 15 },
  cardTitle: { color: colors.navy, fontSize: 15, fontWeight: '800' },
  meta: { color: colors.muted, fontSize: 13, marginTop: 7 },
  divider: { backgroundColor: colors.line, height: 1, marginTop: 10 },
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  id: { color: '#0186A8', fontSize: 13, fontWeight: '800' },
  goalLabel: { color: colors.navy, fontSize: 17, fontWeight: '800', marginTop: 30 },
  goal: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 14, borderWidth: 1, marginTop: 10, padding: 15 }
});

const feedbackStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  heading: { color: colors.navy, fontSize: 21, fontWeight: '800', marginTop: 34, textAlign: 'center' },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 9, textAlign: 'center' },
  stars: { flexDirection: 'row', justifyContent: 'center', marginTop: 29 },
  star: { color: '#FDBB59', fontSize: 30, marginHorizontal: 5 },
  emptyStar: { color: '#A3A7A9' },
  section: { color: colors.navy, fontSize: 15, fontWeight: '800', marginBottom: 9, marginTop: 30 },
  options: { flexDirection: 'row', gap: 8 },
  option: { backgroundColor: '#F1F3F4', borderRadius: 18, flex: 1, paddingHorizontal: 8, paddingVertical: 9 },
  optionActive: { backgroundColor: colors.aqua },
  optionText: { color: colors.muted, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  optionTextActive: { color: colors.white },
  textarea: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 12, borderWidth: 1, color: colors.navy, height: 128, padding: 14, textAlignVertical: 'top' }
});

const certificateStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  titleBar: { backgroundColor: colors.sky, borderRadius: 20, color: colors.ink, fontSize: 17, fontWeight: '800', paddingHorizontal: 26, paddingVertical: 11 },
  certificate: { backgroundColor: '#EDFBFF', borderColor: colors.mint, borderRadius: 4, borderWidth: 1, marginTop: 20, padding: 18, alignItems: 'center' },
  ocean: { color: colors.muted, fontSize: 16, fontWeight: '800', marginTop: 24 },
  rule: { backgroundColor: colors.aqua, height: 1, marginVertical: 7, width: '70%' },
  label: { color: colors.muted, fontSize: 16, fontWeight: '800', marginTop: 24 },
  contribution: { color: '#0186A8', fontSize: 17, fontWeight: '800', marginTop: 7, textAlign: 'center' },
  badge: { alignItems: 'center', backgroundColor: colors.warning, borderColor: '#0186A8', borderRadius: 32, borderWidth: 1, color: '#0186A8', fontSize: 32, height: 64, lineHeight: 55, marginTop: 28, textAlign: 'center', width: 64 },
  presented: { color: colors.muted, fontSize: 13, marginTop: 22 },
  name: { color: '#0186A8', fontSize: 24, fontWeight: '800', marginTop: 6 },
  event: { color: '#0186A8', fontSize: 13, fontWeight: '800', marginTop: 5 },
  date: { color: colors.muted, fontSize: 12, marginTop: 34 },
  signatures: { borderTopColor: colors.aqua, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 24, paddingTop: 8, width: '72%' },
  signature: { color: colors.muted, fontSize: 11 },
  id: { color: '#0186A8', fontSize: 12, fontWeight: '800', marginVertical: 16, textAlign: 'center' },
  share: { alignItems: 'center', borderColor: colors.aqua, borderRadius: 14, borderWidth: 1, padding: 15 },
  shareText: { color: colors.aqua, fontSize: 15, fontWeight: '800' }
});

const participantsStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  title: { color: colors.navy, fontSize: 22, fontWeight: '800', marginTop: 22, textAlign: 'center' },
  meta: { color: colors.muted, fontSize: 13, marginTop: 6, textAlign: 'center' },
  search: { backgroundColor: '#F1F3F4', borderRadius: 12, color: colors.navy, marginTop: 15, padding: 12 },
  person: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: 11 },
  avatar: { alignItems: 'center', backgroundColor: colors.sky, borderColor: colors.aqua, borderRadius: 19, borderWidth: 1, height: 38, justifyContent: 'center', width: 38 },
  avatarText: { color: colors.ink, fontWeight: '800' },
  copy: { flex: 1, marginLeft: 12 },
  name: { color: colors.navy, fontSize: 15, fontWeight: '800' },
  role: { color: colors.muted, fontSize: 12, marginTop: 3 },
  message: { borderColor: colors.aqua, borderRadius: 16, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 7 },
  messageText: { color: '#0186A8', fontSize: 11, fontWeight: '800' },
  checkin: { alignItems: 'center', borderColor: colors.aqua, borderRadius: 14, borderWidth: 1, marginTop: 9, padding: 15 },
  checkinText: { color: colors.aqua, fontSize: 15, fontWeight: '800' }
});

const chatStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, flex: 1, padding: spacing.lg },
  subtitle: { color: colors.ink, fontSize: 9, textAlign: 'center' },
  today: { color: colors.muted, fontSize: 11, fontWeight: '800', marginTop: 18, textAlign: 'center' },
  messages: { gap: 14, paddingBottom: 20, paddingTop: 14 },
  bubble: { alignSelf: 'flex-start', backgroundColor: '#F1F3F4', borderColor: colors.line, borderRadius: 13, borderWidth: 1, maxWidth: '78%', padding: 11 },
  mine: { alignSelf: 'flex-end', backgroundColor: colors.aqua, borderColor: colors.aqua },
  sender: { color: colors.muted, fontSize: 13, fontWeight: '800' },
  message: { color: colors.navy, fontSize: 13, marginTop: 3 },
  white: { color: colors.white },
  composer: { alignItems: 'center', borderColor: colors.line, borderRadius: 24, borderWidth: 1, flexDirection: 'row', marginBottom: 20, padding: 5 },
  input: { color: colors.navy, flex: 1, paddingHorizontal: 12 },
  send: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 18, height: 34, justifyContent: 'center', width: 34 },
  sendText: { color: colors.white, fontSize: 16 }
});

const recapStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 60 },
  title: { color: colors.navy, fontSize: 20, fontWeight: '800', marginTop: 22, textAlign: 'center' },
  meta: { color: colors.muted, fontSize: 11, marginTop: 5, textAlign: 'center' },
  overview: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 13, borderWidth: 1, marginTop: 10, padding: 10 },
  overviewTitle: { color: colors.ink, fontSize: 16, fontWeight: '800', textAlign: 'center' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginTop: 8 },
  metric: { alignItems: 'center', backgroundColor: '#CCF1E5', borderColor: colors.aqua, borderRadius: 10, borderWidth: 1, paddingVertical: 13, width: '48%' },
  value: { color: colors.aqua, fontSize: 20, fontWeight: '800' },
  label: { color: colors.muted, fontSize: 9, marginTop: 5 },
  memories: { color: colors.ink, fontSize: 18, fontWeight: '800', marginBottom: 10, marginTop: 30, textAlign: 'center' },
  liveRecap: { backgroundColor: '#EDFBFF', borderColor: colors.mint, borderRadius: 13, borderWidth: 1, marginTop: 18, padding: 14 },
  liveRecapTitle: { color: colors.navy, fontSize: 14, fontWeight: '800' },
  liveRecapText: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 7 },
  memory: { borderColor: colors.aqua, borderRadius: 11, borderWidth: 1, height: 150, marginBottom: 18, width: '88%' },
  memoryOffset: { alignSelf: 'flex-end' },
  feedback: { alignItems: 'center', borderColor: colors.aqua, borderRadius: 14, borderWidth: 1, padding: 15 },
  feedbackText: { color: colors.aqua, fontSize: 15, fontWeight: '800' }
});

const filterStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: spacing.lg, paddingBottom: 28 },
  heading: { color: colors.navy, fontSize: 20, fontWeight: '800', marginBottom: 15 },
  label: { color: colors.navy, fontSize: 15, fontWeight: '800', marginTop: 16 },
  value: { color: colors.ink, fontSize: 11, marginLeft: 8 },
  options: { flexDirection: 'row', gap: 8, marginTop: 8 },
  option: { backgroundColor: '#F1F3F4', borderRadius: 18, flex: 1, paddingHorizontal: 10, paddingVertical: 9 },
  active: { backgroundColor: colors.aqua },
  optionText: { color: colors.ink, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  activeText: { color: colors.white },
  slider: { backgroundColor: '#E6ECEF', height: 5, marginTop: 13, position: 'relative' },
  sliderFill: { backgroundColor: colors.aqua, height: 5, width: '60%' },
  knob: { backgroundColor: colors.white, borderColor: '#0186A8', borderRadius: 11, borderWidth: 2, height: 20, left: '56%', position: 'absolute', top: -8, width: 20 },
  select: { alignItems: 'center', borderColor: colors.line, borderRadius: 10, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, padding: 13 },
  actions: { flexDirection: 'row', gap: 8, justifyContent: 'flex-end', marginTop: 30 },
  cancel: { borderColor: '#0186A8', borderRadius: 10, borderWidth: 1, paddingHorizontal: 22, paddingVertical: 12 },
  cancelText: { color: '#0186A8', fontWeight: '800' }
});

const createStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 90 },
  step: { color: colors.muted, fontSize: 13, fontWeight: '800', marginTop: 15 },
  progress: { backgroundColor: colors.line, height: 4, marginTop: 7 },
  progressFill: { backgroundColor: colors.mint, height: 4 },
  heading: { color: colors.navy, fontSize: 23, fontWeight: '800', marginTop: 20 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5 },
  label: { color: colors.muted, fontSize: 13, fontWeight: '800', marginBottom: 7, marginTop: 18 },
  input: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 11, borderWidth: 1, color: colors.navy, padding: 13 },
  eventImage: { borderRadius: 11, height: 150, width: '100%' },
  selectInput: { alignItems: 'center', backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 11, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 14 },
  selectText: { color: colors.muted, fontSize: 14 },
  mapPreview: { backgroundColor: '#8DD8E7', borderRadius: 11, height: 150, marginTop: 12, overflow: 'hidden', padding: 15, position: 'relative' },
  mapRoad: { color: '#D5DCE1', fontSize: 22, marginTop: 18 },
  mapWater: { bottom: 20, color: '#E8FAFC', fontSize: 22, position: 'absolute', right: 12 },
  mapMarker: { alignItems: 'center', backgroundColor: colors.coral, borderColor: colors.white, borderRadius: 13, borderWidth: 2, height: 26, justifyContent: 'center', left: '50%', position: 'absolute', top: 62, width: 26 },
  mapMarkerText: { color: colors.white, fontSize: 12 },
  mapPlace: { color: colors.coral, fontSize: 10, fontWeight: '800', left: '56%', position: 'absolute', top: 68 },
  multiline: { height: 118, textAlignVertical: 'top' },
  card: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 13, borderWidth: 1, marginTop: 8, padding: 12 },
  review: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 13, borderWidth: 1, marginTop: 18, padding: 16 },
  reviewLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', marginTop: 8 },
  reviewValue: { color: colors.navy, fontSize: 15, fontWeight: '700', marginTop: 3 },
  qr: { backgroundColor: '#EAF6FF', borderRadius: 12, marginTop: 20, padding: 12 },
  qrTitle: { color: colors.navy, fontSize: 14, fontWeight: '800', textAlign: 'center' },
  qrContent: { alignItems: 'center', backgroundColor: '#DDF3FF', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 10 },
  qrBrand: { color: '#1728C9', fontSize: 20, fontWeight: '800' },
  qrName: { color: '#1728C9', fontSize: 10, marginTop: 12 },
  qrAccount: { color: colors.navy, fontSize: 13, marginTop: 6 },
  qrButton: { backgroundColor: '#2026D8', borderRadius: 15, marginTop: 12, paddingHorizontal: 15, paddingVertical: 7 },
  qrButtonText: { color: colors.white, fontSize: 10, fontWeight: '800' },
  qrPattern: { backgroundColor: colors.white, color: colors.navy, fontSize: 62, height: 100, lineHeight: 88, textAlign: 'center', width: 100 },
  qrHelp: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 12 },
  skip: { alignItems: 'center', borderColor: colors.aqua, borderRadius: 12, borderWidth: 1, marginTop: 8, padding: 14 },
  skipText: { color: colors.aqua, fontSize: 15, fontWeight: '800' },
  notice: { backgroundColor: '#FFF5DD', borderColor: colors.warning, borderRadius: 12, borderWidth: 1, marginTop: 20, padding: 13 },
  noticeTitle: { color: colors.coral, fontSize: 13, fontWeight: '800' },
  noticeText: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  itemRow: { alignItems: 'center', backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 11, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, padding: 12 },
  itemTitle: { color: '#0186A8', fontSize: 14, fontWeight: '800' },
  itemMeta: { color: colors.muted, fontSize: 12, marginTop: 3 },
  delete: { color: colors.coral, fontSize: 19 },
  addItem: { alignItems: 'center', alignSelf: 'center', borderColor: colors.aqua, borderRadius: 18, borderWidth: 1, marginTop: 5, paddingHorizontal: 20, paddingVertical: 8 },
  addItemText: { color: colors.aqua, fontSize: 12, fontWeight: '800' },
  safety: { backgroundColor: '#FFF0D0', borderColor: '#EFC984', borderRadius: 10, borderWidth: 1, marginTop: 22, padding: 12 },
  safetyTitle: { color: colors.coral, fontSize: 14, fontWeight: '800' },
  safetyInner: { borderColor: colors.warning, borderRadius: 7, borderWidth: 1, marginTop: 8, padding: 10 },
  safetyText: { color: colors.coral, fontSize: 12 }
});

const adminStyles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 100 },
  hero: { backgroundColor: colors.navy, borderRadius: 16, marginTop: 20, padding: 18 },
  eyebrow: { color: colors.mint, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: colors.white, fontSize: 19, fontWeight: '800', marginTop: 10 },
  heroMeta: { color: '#C4D8DF', fontSize: 12, marginTop: 7 },
  section: { color: colors.navy, fontSize: 17, fontWeight: '800', marginBottom: 10, marginTop: 24 },
  metrics: { flexDirection: 'row', gap: 8 },
  metric: { backgroundColor: '#EDFBFF', borderColor: colors.line, borderRadius: 12, borderWidth: 1, flex: 1, padding: 12 },
  metricValue: { color: colors.aqua, fontSize: 19, fontWeight: '800' },
  metricLabel: { color: colors.muted, fontSize: 11, marginTop: 4 },
  action: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16 },
  actionText: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  chevron: { color: colors.aqua, fontSize: 24 },
  person: { alignItems: 'center', borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', paddingVertical: 12 },
  avatar: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 20, height: 40, justifyContent: 'center', width: 40 },
  avatarText: { color: colors.navy, fontWeight: '800' },
  personName: { color: colors.ink, flex: 1, fontSize: 14, fontWeight: '700', marginLeft: 12 },
  approve: { backgroundColor: colors.aqua, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8 },
  approved: { backgroundColor: colors.mint },
  approveText: { color: colors.white, fontSize: 11, fontWeight: '800' },
  helper: { color: colors.muted, fontSize: 12, marginTop: 14 },
  textarea: { borderColor: colors.line, borderRadius: 12, borderWidth: 1, color: colors.navy, height: 150, padding: 14, textAlignVertical: 'top' },
  success: { backgroundColor: '#E8FAF7', borderRadius: 12, marginTop: 14, padding: 14 },
  successText: { color: '#299B78', fontSize: 13, fontWeight: '700' }
});
