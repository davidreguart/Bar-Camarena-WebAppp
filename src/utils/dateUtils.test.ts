import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import {
  getCurrentDay,
  isDateToday,
  getFirstDayWeekIndex,
  getCalendarSlots,
} from './dateUtils';

describe('dateUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('getCurrentDay returns the current day of the month', () => {
    // Mock date to 2026-05-15
    const date = new Date(2026, 4, 15);
    vi.setSystemTime(date);
    expect(getCurrentDay()).toBe(15);
  });

  it('isDateToday returns true if day matches today', () => {
    const date = new Date(2026, 4, 15);
    vi.setSystemTime(date);
    expect(isDateToday(15)).toBe(true);
    expect(isDateToday(16)).toBe(false);
  });

  it('getFirstDayWeekIndex returns correct index', () => {
    // 2026-05-01 is a Friday.
    // Index mapping: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
    const date = new Date(2026, 4, 15); // middle of month
    vi.setSystemTime(date);

    // logic inside: new Date(2026, 4, 1) -> May 1st 2026
    // May 1st 2026 is Friday. getDay()=5. (5+6)%7 = 4.
    expect(getFirstDayWeekIndex()).toBe(4);
  });

  it('getCalendarSlots generates correct array', () => {
    // Start offset 2, 5 days in month -> [0, 1, 2, 3, 4, 5, 6] (length 7)
    const slots = getCalendarSlots(2, 5);
    expect(slots).toHaveLength(7);
    expect(slots).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });
});
