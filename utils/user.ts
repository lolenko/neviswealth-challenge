/**
 * Generates initials from a full name.
 * - 'John Doe' -> 'JD'
 * - 'John' -> 'J'
 * - 'John Fitzgerald Kennedy' -> 'JK'
 * - '' -> '?'
 * @param name - Full name of the user.
 * @returns A string with initials.
 */
const getInitialsFromName = (name?: string): string => {
  if (!name) {
    return '?';
  }

  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]);

  if (initials.length === 0) {
    return '?';
  }

  const firstNameInitial = initials[0];
  let lastNameInitial = '';
  if (initials.length > 1) {
    lastNameInitial = initials[initials.length - 1];
  }

  return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
};

const AVATAR_COLORS: readonly string[] = [
  '#f44336', // Red
  '#e91e63', // Pink
  '#9c27b0', // Purple
  '#673ab7', // Deep Purple
  '#3f51b5', // Indigo
  '#2196f3', // Blue
  '#009688', // Teal
  '#4caf50', // Green
  '#ff9800', // Orange
  '#795548', // Brown
];

/**
 * Returns a deterministic color from the palette based on a string.
 * @param str - Input string (e.g., initials).
 * @returns HEX color code.
 */
const getColorFromString = (str?: string): string => {
  if (!str) {
    return AVATAR_COLORS[0];
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash % AVATAR_COLORS.length);

  return AVATAR_COLORS[index];
};

export { getInitialsFromName, getColorFromString };
