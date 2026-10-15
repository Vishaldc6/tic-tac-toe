export interface ColorTheme {
  background: string;
  surface: string;
  surfaceElevated: string;
  gridLine: string;
  border: string;

  playerX: string;
  playerO: string;

  winCellBg: string;
  winHighlight: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export const DarkColors: ColorTheme = {
  background: '#121214',
  surface: '#1A1A1E',
  surfaceElevated: '#24242A',
  gridLine: '#2D2D35',
  border: '#2D2D35',

  playerX: '#60A5FA', // Soft Sky Blue
  playerO: '#F87171', // Soft Coral

  winCellBg: '#23232B',
  winHighlight: '#FBBF24',

  textPrimary: '#F4F4F5',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
};

export const LightColors: ColorTheme = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceElevated: '#EEF0F3',
  gridLine: '#D1D5DB',
  border: '#E5E7EB',

  playerX: '#2563EB', // Vibrant Royal Blue
  playerO: '#E11D48', // Vibrant Rose

  winCellBg: '#FEF3C7',
  winHighlight: '#D97706',

  textPrimary: '#18181B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
};

// Default export for backward compatibility
export const Colors = DarkColors;
