export const colors = {
  navy: '#0D2B45',
  blue: '#087EA4',
  aqua: '#B9F2F4',
  mint: '#E8FAF7',
  ink: '#17324D',
  muted: '#6E8494',
  line: '#DDEBEF',
  white: '#FFFFFF',
  coral: '#FF7A68',
  positive: '#299B78',
  warning: '#FFB26B'
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
