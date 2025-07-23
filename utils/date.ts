type DateFormat = 'short-month-year';

const formatDateShortMonthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
}).format;

/**
 * Formats a date into a short month and year format (e.g., "Jan 2023").
 *
 * @param {Date | number} date - The date to format, either as a `Date` object or a timestamp.
 * @param {DateFormat} format - The desired format. Currently supports 'short-month-year'.
 * @returns {string} The formatted date string.
 */
const formatDate = (date: Date | number, format: DateFormat) => {
  switch (format) {
    case 'short-month-year':
      return formatDateShortMonthYear(date);
  }
};

/**
 * Calculates the length of a period between two dates in the specified unit.
 *
 * @param {Date} startDate - The start date of the period.
 * @param {Date} endDate - The end date of the period.
 * @param {'days' | 'weeks' | 'months' | 'years'} unit - The unit of time to calculate the period length in.
 * @returns {number} The length of the period in the specified unit.
 */
const getPeriodLength = (
  startDate: Date,
  endDate: Date,
  unit: 'days' | 'weeks' | 'months' | 'years',
): number => {
  const msInDay = 1000 * 60 * 60 * 24;

  switch (unit) {
    case 'days':
      return Math.ceil((endDate.getTime() - startDate.getTime()) / msInDay);
    case 'weeks':
      return Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (msInDay * 7),
      );
    case 'months':
      return (
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) +
        1
      );
    case 'years':
      return (
        endDate.getFullYear() -
        startDate.getFullYear() +
        (endDate.getMonth() >= startDate.getMonth() ? 1 : 0)
      );
  }
};

export { formatDate, getPeriodLength };
