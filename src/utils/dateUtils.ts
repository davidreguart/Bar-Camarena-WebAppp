/**
 * Gets the current day of the month (1-31).
 */
export const getCurrentDay = (): number => new Date().getDate();

/**
 * Checks if a given day is today.
 */
export const isDateToday = (day: number): boolean => day === getCurrentDay();

/**
 * Gets the day of the week index (0=Monday, 6=Sunday) for the first day of the current month.
 */
export const getFirstDayWeekIndex = (): number => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // getDay() returns 0=Sunday, 1=Monday... we want 0=Monday
  return (firstDayOfMonth.getDay() + 6) % 7;
};

/**
 * Gets the number of days in the current month.
 */
export const getDaysInCurrentMonth = (): number => {
  const now = new Date();
  // Setting day to 0 of the next month gives us the last day of the current month
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
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
