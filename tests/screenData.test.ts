import { describe, expect, it } from 'vitest';
import { eventStart, calendarMonth } from '../src/features/design/eventDates';
import { dayStreak, levelFor } from '../src/features/design/activity';
import { mapItems } from '../src/features/design/mapResults';
import { reportCsv, reportHtml } from '../src/features/design/reportFileContent';
import { recoveryProof } from '../src/features/auth/recovery';
import type { OceanReport, OceanEvent } from '../src/lib/supabase';

describe('screen data', () => {
  it('rejects rolled dates and invalid times', () => {
    expect(() => eventStart('2025-02-29', '08:00')).toThrow();
    expect(() => eventStart('2028-02-29', '24:00')).toThrow();
    expect(eventStart('2028-02-29', '08:00').getDate()).toBe(29);
  });
  it('groups calendar events by the selected local day and month', () => {
    const event = (id: string, date: string): OceanEvent => ({
      id,
      title: id,
      description: '',
      location: 'Harbor',
      event_date: date,
      capacity: 0,
    });
    const day = new Date(2028, 1, 29);
    const groups = calendarMonth(day, [
      event('next', '2028-03-01T01:00'),
      event('earlier', '2028-02-01T08:00'),
      event('selected', '2028-02-29T22:00'),
    ]);
    expect(groups.days).toBe(29);
    expect(groups.selectedEvents.map((e) => e.id)).toEqual(['selected']);
    expect(groups.otherEvents.map((e) => e.id)).toEqual(['earlier']);
  });
  it('filters mapped reports by distance, severity and text without guessing named coordinates', () => {
    const report: OceanReport = {
      id: 'near',
      owner_id: 'u',
      category: 'pollution',
      title: 'Harbor plastic',
      location: '16.055, 108.245',
      created_at: '2026-10-01',
      status: 'submitted',
      details: { severity: 'High', waste: 'Plastic' },
    };
    const results = mapItems(
      [
        report,
        { ...report, id: 'far', location: '18, 108' },
        { ...report, id: 'place', location: 'Harbor' },
      ],
      [],
      { mapOrigin: report.location, mapSearch: 'plastic', mapRadius: '1', mapSeverity: 'Urgent' },
    );
    expect(results.map((r) => r.id)).toEqual(['near']);
    expect(results[0].distance).toBe(0);
  });
  it('counts consecutive active days across months and ignores reward redemption', () => {
    const act = (date: string, points: number) => ({ title: 'Activity', date, points });
    expect(
      dayStreak(
        [act('2026-10-31T12:00', 10), act('2026-11-01T15:00', 10), act('2026-11-02T08:00', -300)],
        new Date('2026-11-02T12:00'),
      ),
    ).toBe(2);
    expect(levelFor(3000).name).toBe('Planet Protector');
    expect(levelFor(2999).remaining).toBe(1);
  });
  it('accepts recovery codes and the exact project recovery link', () => {
    const host = 'https://ocean.example';
    expect(recoveryProof('123456', 'student@example.invalid', host)).toMatchObject({ token: '123456' });
    expect(recoveryProof(host + '/auth/v1/verify?type=recovery&token=fixture_7', '', host)).toEqual({
      type: 'recovery',
      token_hash: 'fixture_7',
    });
    expect(() =>
      recoveryProof('https://other.example/auth/v1/verify?type=recovery&token=fixture_7', '', host),
    ).toThrow();
  });
  it('escapes markup, spreadsheet formulas and CSV quotes in exported report text', () => {
    expect(reportHtml('Ocean <class>', [['', '<text>&', '']])).toContain('&lt;text&gt;&amp;');
    expect(reportCsv([['2026-11-26', '=SUM(1,2)', 'said "hi"']])).toContain(
      '"\'=SUM(1,2)","said ""hi"""',
    );
  });
});
