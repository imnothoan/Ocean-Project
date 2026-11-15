export const colors = {
  navy: '#091727',
  blue: '#3DAEBC',
  aqua: '#43C4D6',
  mint: '#76D0C1',
  sky: '#A5E0F2',
  ink: '#3F596B',
  muted: '#7B92A1',
  line: '#D7E1E6',
  surface: '#F2F4F5',
  white: '#FFFFFF',
  coral: '#FD7B59',
  positive: '#299B78',
  warning: '#FEC968'
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999
} as const;

export const typography = {
  eyebrow: { fontSize: 11, fontWeight: '800' as const, letterSpacing: 1.4 },
  body: { fontSize: 14, lineHeight: 21 },
  caption: { fontSize: 12, lineHeight: 18 },
  title: { fontSize: 28, fontWeight: '800' as const, letterSpacing: -0.5 },
  section: { fontSize: 18, fontWeight: '800' as const }
} as const;

export const shadow = {
  card: {
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2
  }
} as const;
