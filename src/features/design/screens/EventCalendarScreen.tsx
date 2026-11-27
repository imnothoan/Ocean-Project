import { useContext, useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { OceanEvent } from '../../../lib/supabase';
import { Interaction } from '../components';
import { calendarMonth } from '../eventDates';

const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const chevron = require('../../../../assets/figma/mobile/6c8b5.svg');
const dayFill = require('../../../../assets/figma/mobile/5624a.svg');
const selectedFill = require('../../../../assets/figma/mobile/d7dcd.svg');
const marker = require('../../../../assets/figma/mobile/5ff95.svg');
const back = require('../../../../assets/figma/mobile/ecd92.svg');
const selectedPhoto = require('../../../../assets/figma/mobile/7e54a.jpg');
const otherPhoto = require('../../../../assets/figma/mobile/5047d.jpg');

type CalendarProps = { events?: OceanEvent[]; onSelectEvent?: (id: string) => void };

export function EventCalendarScreen({ events = [], onSelectEvent }: CalendarProps = {}) {
  const [selected, setSelected] = useState(() => new Date());
  const interaction = useContext(Interaction);
  const { leading, days, markedDays, selectedEvents, otherEvents } = calendarMonth(selected, events);
  const goMonth = (offset: number) =>
    setSelected(new Date(selected.getFullYear(), selected.getMonth() + offset, 1));
  const card = (event: OceanEvent, photo: number) => (
    <Pressable
      key={event.id}
      accessibilityRole="button"
      accessibilityLabel={event.title}
      style={s.card}
      onPress={() => onSelectEvent?.(event.id)}
    >
      <Image source={photo} style={s.photo} contentFit="cover" />
      <Text style={s.eventName}>{event.title}</Text>
      <Text style={s.detail}>
        {new Date(event.event_date).toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })}{' '}
        · {event.location}
      </Text>
    </Pressable>
  );
  return (
    <SafeAreaView testID="frame-258:614" style={s.page}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.header}>
          <Pressable
            style={s.back}
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => interaction.navigate('back', '258:698')}
          >
            <Image source={back} style={s.backIcon} />
          </Pressable>
          <View style={s.titlePill}>
            <Text style={s.title}>Calendar</Text>
          </View>
        </View>
        <View style={s.month}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous month"
            onPress={() => goMonth(-1)}
            style={s.arrow}
          >
            <Image source={chevron} style={s.arrowIcon} />
          </Pressable>
          <Text style={s.monthText}>
            {selected.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next month"
            onPress={() => goMonth(1)}
            style={s.arrow}
          >
            <Image source={chevron} style={[s.arrowIcon, { transform: [{ rotate: '180deg' }] }]} />
          </Pressable>
        </View>
        <View style={s.week}>
          {weekdays.map((day) => (
            <Text key={day} style={s.weekday}>
              {day}
            </Text>
          ))}
        </View>
        <View style={s.grid}>
          {Array.from({ length: leading }, (_, index) => (
            <View key={'blank' + index} style={s.cell} />
          ))}
          {Array.from({ length: days }, (_, index) => {
            const day = index + 1;
            const date = new Date(selected.getFullYear(), selected.getMonth(), day);
            const active = selected.getDate() === day;
            const marked = markedDays.has(day);
            return (
              <Pressable
                key={day}
                style={s.cell}
                accessibilityRole="button"
                accessibilityLabel={
                  date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) +
                  (marked ? ', events scheduled' : '')
                }
                accessibilityState={{ selected: active }}
                onPress={() => setSelected(date)}
              >
                <Image style={s.dayCircle} source={active || marked ? selectedFill : dayFill} />
                <Text style={[s.dayText, (active || marked) && s.white]}>{day}</Text>
                {marked && <Image style={s.marker} source={marker} />}
              </Pressable>
            );
          })}
        </View>
        <View style={s.agenda}>
          <Text style={s.section}>
            {selected.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
          {selectedEvents.length ? (
            selectedEvents.map((event) => card(event, selectedPhoto))
          ) : (
            <Text style={s.empty}>No events scheduled for this day.</Text>
          )}
          <Text style={s.section}>Other events this month</Text>
          {otherEvents.length ? (
            otherEvents.map((event) => card(event, otherPhoto))
          ) : (
            <Text style={s.empty}>No other events scheduled.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const bold = 'AfacadFlux_700Bold';
const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  content: { width: '100%', maxWidth: 600, alignSelf: 'center', paddingBottom: 24 },
  header: { marginTop: 10, alignItems: 'center', justifyContent: 'center', height: 43 },
  back: { position: 'absolute', left: 23, width: 44, height: 44 },
  backIcon: { width: 43, height: 43 },
  titlePill: {
    minWidth: 128,
    height: 43,
    borderRadius: 20,
    backgroundColor: '#a5e0f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontFamily: bold, fontSize: 20, color: '#3f596b' },
  month: {
    marginTop: 17,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  monthText: { fontFamily: bold, fontSize: 23, color: '#202326', minWidth: 200, textAlign: 'center' },
  arrow: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  arrowIcon: { width: 24, height: 24 },
  week: { flexDirection: 'row', marginHorizontal: 4 },
  weekday: { flex: 1, textAlign: 'center', fontSize: 9, color: '#73787d', fontFamily: bold },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4, marginHorizontal: 4 },
  cell: { width: '14.2857%', height: 48, alignItems: 'center', justifyContent: 'center' },
  dayCircle: { position: 'absolute', width: 35, height: 35 },
  dayText: { fontSize: 12, fontFamily: bold, color: '#202326' },
  white: { color: '#fff' },
  marker: { position: 'absolute', width: 4, height: 4, bottom: 0 },
  agenda: { marginHorizontal: 20, marginTop: 15 },
  section: { fontFamily: bold, fontSize: 18, color: '#202326', marginTop: 12, marginBottom: 8 },
  card: { padding: 12, marginBottom: 8, borderRadius: 10, backgroundColor: '#edfbff' },
  photo: { height: 56, width: '100%', borderRadius: 10 },
  eventName: { fontFamily: bold, fontSize: 15, color: '#202326', marginTop: 6 },
  detail: { fontFamily: 'AfacadFlux_400Regular', fontSize: 13, color: '#73787d' },
  empty: { fontFamily: 'AfacadFlux_400Regular', fontSize: 15, color: '#3f596b', paddingVertical: 12 },
});
