import { describe, it, expect } from 'vitest';
import { formatDate, getPeriodLength } from './date';

describe('formatDate', () => {
  it('should format a date as "short-month-year"', () => {
    const date = new Date('2023-01-15');
    const result = formatDate(date, 'short-month-year');
    expect(result).toBe('Jan 2023');
  });

  it('should handle timestamps correctly', () => {
    const timestamp = new Date('2023-01-15').getTime();
    const result = formatDate(timestamp, 'short-month-year');
    expect(result).toBe('Jan 2023');
  });
});

describe('getPeriodLength', () => {
  it('should calculate the period length in days', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-10');
    const result = getPeriodLength(startDate, endDate, 'days');
    expect(result).toBe(9);
  });

  it('should calculate the period length in weeks', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-15');
    const result = getPeriodLength(startDate, endDate, 'weeks');
    expect(result).toBe(2);
  });

  it('should calculate the period length in months', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-03-01');
    const result = getPeriodLength(startDate, endDate, 'months');
    expect(result).toBe(3);
  });

  it('should calculate the period length in years', () => {
    const startDate = new Date('2020-01-01');
    const endDate = new Date('2023-01-01');
    const result = getPeriodLength(startDate, endDate, 'years');
    expect(result).toBe(4);
  });
});
