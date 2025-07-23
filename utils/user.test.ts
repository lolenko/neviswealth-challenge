import { describe, it, expect } from 'vitest';
import { getInitialsFromName, getColorFromString } from './user';

describe('getInitialsFromName', () => {
  it('should return initials for a full name', () => {
    expect(getInitialsFromName('John Doe')).toBe('JD');
  });

  it('should return a single initial for a single name', () => {
    expect(getInitialsFromName('John')).toBe('J');
  });

  it('should return initials for a name with multiple parts', () => {
    expect(getInitialsFromName('John Fitzgerald Kennedy')).toBe('JK');
  });

  it('should return "?" for an empty string', () => {
    expect(getInitialsFromName('')).toBe('?');
  });

  it('should return "?" for undefined input', () => {
    expect(getInitialsFromName(undefined)).toBe('?');
  });

  it('should handle names with extra spaces', () => {
    expect(getInitialsFromName('  John   Doe  ')).toBe('JD');
  });
});

describe('getColorFromString', () => {
  it('should return a deterministic color for a given string', () => {
    expect(getColorFromString('John Doe')).toBe('#4caf50');
  });

  it('should return the first color in the palette for an empty string', () => {
    expect(getColorFromString('')).toBe('#f44336');
  });

  it('should return the first color in the palette for undefined input', () => {
    expect(getColorFromString(undefined)).toBe('#f44336');
  });

  it('should return the same color for the same input string', () => {
    const color1 = getColorFromString('John Doe');
    const color2 = getColorFromString('John Doe');
    expect(color1).toBe(color2);
  });

  it('should return different colors for different input strings', () => {
    const color1 = getColorFromString('John Doe');
    const color2 = getColorFromString('Jane Doe');
    expect(color1).not.toBe(color2);
  });
});
