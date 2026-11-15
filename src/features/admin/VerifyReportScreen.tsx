import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing } from '../../theme/tokens';

export function VerifyReportScreen({ onBack }: { onBack: () => void }) {
  const [lesson, setLesson] = useState(1);
  const lessons = [
    { title: 'Lesson 1: Image Check', icon: '▧', items: ['Be clear, not blurry or obscured.', 'Include surrounding context to identify the area.', 'Accurately reflect the pollution status at reporting time.'] },
    { title: 'Lesson 2: Location Check', icon: '⌖', items: ['Cross-reference GPS coordinates with map location.', 'Verify area names, beaches, or landmarks.', 'If discrepancies exist, request confirmation from the reporter.'] },
    { title: 'Lesson 3: Severity Assessment', icon: '▥', items: ['Small Group · Low', 'Event Organization · Medium', 'Use waste types and environmental context together.'] }
  ];
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.topBar}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable><Text style={styles.title}>Verify Report</Text></View>
      <View style={styles.hero}><Text style={styles.badge}>Lesson {lesson.toString().padStart(2, '0')}/03</Text><Text style={styles.heroTitle}>Verify Report</Text><Text style={styles.heroText}>Check images, locations and severity before approving a pollution report.</Text><View style={styles.heroTrack}><View style={[styles.heroFill, { width: `${(lesson / 3) * 100}%` }]} /></View><Text style={styles.heroProgress}>{Math.round((lesson / 3) * 100)}%</Text></View>
      {lessons.map((item, index) => <Pressable key={item.title} onPress={() => setLesson(index + 1)} style={[styles.lesson, lesson === index + 1 && styles.lessonActive]}><View style={styles.icon}><Text style={styles.iconText}>{item.icon}</Text></View><View style={styles.lessonBody}><Text style={styles.lessonTitle}>{item.title}</Text>{item.items.map((text) => <Text key={text} style={styles.item}>•  {text}</Text>)}</View></Pressable>)}
      <View style={styles.note}><Text style={styles.noteText}>Note: Evaluation must consider affected area, waste types, and environmental context, not just overall weight.</Text></View>
      <Pressable onPress={() => lesson < 3 ? setLesson(lesson + 1) : Alert.alert('Review complete', 'The report is ready for the next moderation step.')} style={styles.button}><Text style={styles.buttonText}>{lesson < 3 ? 'Continue Lesson' : 'Complete Review'}</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.white, padding: spacing.lg, paddingBottom: 60 },
  topBar: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.md, paddingTop: spacing.sm },
  back: { alignItems: 'center', backgroundColor: colors.sky, borderRadius: 22, height: 34, justifyContent: 'center', left: 0, position: 'absolute', width: 34 },
  backText: { color: colors.ink, fontSize: 28, lineHeight: 28 }, title: { backgroundColor: colors.sky, borderRadius: 18, color: colors.ink, fontSize: 16, fontWeight: '700', paddingHorizontal: 28, paddingVertical: 8 },
  hero: { backgroundColor: colors.aqua, borderRadius: 18, marginBottom: spacing.md, overflow: 'hidden', padding: 16, position: 'relative' },
  badge: { alignSelf: 'flex-start', backgroundColor: colors.white, borderRadius: 12, color: colors.blue, fontSize: 10, fontWeight: '800', paddingHorizontal: 10, paddingVertical: 5 }, heroTitle: { color: colors.white, fontSize: 20, fontWeight: '800', marginTop: 16 }, heroText: { color: colors.white, fontSize: 11, lineHeight: 15, marginTop: 5, maxWidth: 210 }, heroTrack: { backgroundColor: 'rgba(255,255,255,.45)', borderRadius: 8, height: 6, marginTop: 14, overflow: 'hidden', width: 170 }, heroFill: { backgroundColor: colors.white, bottom: 0, left: 0, position: 'absolute', top: 0 }, heroProgress: { color: colors.white, fontSize: 10, marginLeft: 180, marginTop: -10 },
  lesson: { backgroundColor: colors.white, borderColor: colors.line, borderRadius: 18, borderWidth: 1, flexDirection: 'row', marginBottom: spacing.md, padding: 14 }, lessonActive: { borderColor: colors.aqua, shadowColor: colors.navy, shadowOpacity: 0.1, shadowRadius: 6, elevation: 2 }, icon: { alignItems: 'center', backgroundColor: '#E1FAF3', borderRadius: 12, height: 38, justifyContent: 'center', marginRight: 12, width: 38 }, iconText: { color: colors.positive, fontSize: 18 }, lessonBody: { flex: 1 }, lessonTitle: { color: colors.navy, fontSize: 13, fontWeight: '800', marginBottom: 8 }, item: { color: colors.muted, fontSize: 10, lineHeight: 17 },
  note: { backgroundColor: '#EAF7FF', borderLeftColor: colors.blue, borderLeftWidth: 4, borderRadius: 10, marginTop: -2, padding: 12 }, noteText: { color: colors.blue, fontSize: 11, lineHeight: 16 }, button: { alignItems: 'center', backgroundColor: colors.aqua, borderRadius: 24, marginTop: spacing.lg, padding: 14 }, buttonText: { color: colors.white, fontSize: 16, fontWeight: '800' }
});
