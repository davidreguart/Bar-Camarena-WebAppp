import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import {
  getCurrentDay,
  isDateToday,
  getFirstDayWeekIndex,
  getDaysInCurrentMonth,
  getCalendarSlots,
  getTargetMenuDate,
  MONTH_TRANSITION_DAY_THRESHOLD,
} from './dateUtils';

describe('dateUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getTargetMenuDate', () => {
    it('returns current month if day is before the last days threshold (< 28)', () => {
      // 2026-08-15 (August 15, 2026) -> Month 7 (August)
      const date = new Date(2026, 7, 15);
      vi.setSystemTime(date);

      const target = getTargetMenuDate();
      expect(target.getFullYear()).toBe(2026);
      expect(target.getMonth()).toBe(7); // August
      expect(target.getDate()).toBe(1);
    });

    it('returns next month if day is in the last days of month (>= 28, e.g. Aug 31, 2026)', () => {
      // 2026-08-31 (August 31, 2026) -> Month 8 (September)
      const date = new Date(2026, 7, 31);
      vi.setSystemTime(date);

      const target = getTargetMenuDate();
      expect(target.getFullYear()).toBe(2026);
      expect(target.getMonth()).toBe(8); // September
      expect(target.getDate()).toBe(1);
    });

    it('handles year transition when in late December', () => {
      // 2026-12-31 (December 31, 2026) -> Month 0 (January 2027)
      const date = new Date(2026, 11, 31);
      vi.setSystemTime(date);

      const target = getTargetMenuDate();
      expect(target.getFullYear()).toBe(2027);
      expect(target.getMonth()).toBe(0); // January
      expect(target.getDate()).toBe(1);
    });
  });

  describe('getCurrentDay and isDateToday', () => {
    it('returns the current day of the month', () => {
      const date = new Date(2026, 4, 15);
      vi.setSystemTime(date);
      expect(getCurrentDay()).toBe(15);
    });

    it('isDateToday highlights the matching day number', () => {
      const date = new Date(2026, 4, 15);
      vi.setSystemTime(date);
      expect(isDateToday(15)).toBe(true);
      expect(isDateToday(16)).toBe(false);
    });
  });

  describe('getFirstDayWeekIndex', () => {
    it('returns correct index for middle of month (e.g. May 2026)', () => {
      // May 1st 2026 is Friday. Index: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
      const date = new Date(2026, 4, 15);
      vi.setSystemTime(date);
      expect(getFirstDayWeekIndex()).toBe(4);
    });

    it('returns Tuesday (index 1) on August 31, 2026 for upcoming September 2026', () => {
      // September 1, 2026 is Tuesday. (2 + 6) % 7 = 1
      const date = new Date(2026, 7, 31);
      vi.setSystemTime(date);
      expect(getFirstDayWeekIndex()).toBe(1); // Tuesday
    });
  });

  describe('getDaysInCurrentMonth', () => {
    it('returns 30 days for September when checked on August 31, 2026', () => {
      const date = new Date(2026, 7, 31);
      vi.setSystemTime(date);
      expect(getDaysInCurrentMonth()).toBe(30);
    });

    it('returns 31 days for August when checked on August 15, 2026', () => {
      const date = new Date(2026, 7, 15);
      vi.setSystemTime(date);
      expect(getDaysInCurrentMonth()).toBe(31);
    });
  });

  describe('getCalendarSlots', () => {
    it('generates 31 slots for September starting on Tuesday (1 offset + 30 days)', () => {
      // Start offset 1 (Tuesday), 30 days in month -> 31 slots total
      const slots = getCalendarSlots(1, 30);
      expect(slots).toHaveLength(31);
      expect(slots[0]).toBe(0); // empty slot for Monday
      expect(slots[1]).toBe(1); // day 1 (Tuesday)
      expect(slots[30]).toBe(30); // day 30 (Wednesday)
    });
  });
});
