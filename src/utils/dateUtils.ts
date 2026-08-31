/**
 * Threshold day of the month after which updates are considered to target the upcoming month.
 * From day 28 onwards (the last days of the month), the calendar automatically formats for next month.
 */
export const MONTH_TRANSITION_DAY_THRESHOLD = 28;

/**
 * Gets the target Date object (set to the 1st day of the target month).
 * If the current day is >= MONTH_TRANSITION_DAY_THRESHOLD, it returns the 1st day of next month.
 * Otherwise, it returns the 1st day of the current month.
 */
export const getTargetMenuDate = (baseDate: Date = new Date()): Date => {
  const currentDay = baseDate.getDate();
  if (currentDay >= MONTH_TRANSITION_DAY_THRESHOLD) {
    return new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);
  }
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
};

/**
 * Gets the current day of the month (1-31).
 */
export const getCurrentDay = (baseDate: Date = new Date()): number => baseDate.getDate();

/**
 * Checks if a given day is today (resalta siempre el día actual del mes).
 */
export const isDateToday = (day: number, baseDate: Date = new Date()): boolean => {
  return day === getCurrentDay(baseDate);
};

/**
 * Gets the day of the week index (0=Monday, 6=Sunday) for the first day of the target month.
 */
export const getFirstDayWeekIndex = (baseDate: Date = new Date()): number => {
  const firstDay = getTargetMenuDate(baseDate);
  // getDay() returns 0=Sunday, 1=Monday... we want 0=Monday
  return (firstDay.getDay() + 6) % 7;
};

/**
 * Gets the number of days in the target menu month.
 */
export const getDaysInCurrentMonth = (baseDate: Date = new Date()): number => {
  const targetDate = getTargetMenuDate(baseDate);
  // Setting day to 0 of the following month gives the last day of the target month
  return new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
};

/**
 * Generates an array of length N representing the calendar slots.
 * N = (empty slots before 1st) + (days in month).
 * @param startOffset The number of empty slots before the 1st of the month.
 * @param daysInMonth The number of days in the month.
 */
export const getCalendarSlots = (
  startOffset: number,
  daysInMonth: number
): number[] => {
  return Array.from({ length: startOffset + daysInMonth }, (_, i) => i);
};
