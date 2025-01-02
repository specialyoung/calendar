/**
 * getter
 */
export const getYear = (date: Date): number => {
  return date.getFullYear();
};

export const getMonth = (date: Date): number => {
  return date.getMonth();
};

export const getDate = (date: Date): number => {
  return date.getDate();
};

export enum Meridiem {
  AM = "AM",
  PM = "PM",
}

export const getHour = (date: Date): { hour: number; meridiem: Meridiem } => {
  const hour = date.getHours();
  return {
    hour: hour - (hour >= 12 ? 12 : 0),
    meridiem: hour >= 12 ? Meridiem.PM : Meridiem.AM,
  };
};

export const getMinutes = (date: Date): number => {
  return date.getMinutes();
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * display
 */
export const toDateString = (date: Date): App.DateString => {
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const dd = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
};

export const getSplittedDateString = (dateString: App.DateString) => {
  return dateString.split("-");
};

export const toDate = (dateString: App.DateString): Date => {
  const [y, m, d] = getSplittedDateString(dateString);
  return new Date(Number(y), Number(m) - 1, Number(d));
};

export const toTimeString = (date: Date): App.TimeString => {
  const hh = `${date.getHours()}`.padStart(2, '0');
  const mm = `${getMinutes(date)}`.padStart(2, '0');
  return `${hh}:${mm}`;
}

export const toDateTime = (timeString: App.TimeString): Date => {
  const [hh, mm] = timeString.split(':');
  const date = new Date();
  date.setHours(Number(hh));
  date.setMinutes(Number(mm));
  return date;
}

/**
 * manipulate
 */
type AddUnit = "year" | "month" | "date";
export const add = (date: Date, value: number, unit: AddUnit): Date => {
  const newDate = new Date(date);

  if (unit === "year") {
    newDate.setFullYear(getYear(date) + value);
  }

  if (unit === "month") {
    newDate.setMonth(getMonth(date) + value);
  }

  if (unit === "date") {
    newDate.setDate(getDate(date) + value);
  }

  return newDate;
};

export const subtract = (date: Date, value: number, unit: AddUnit): Date => {
  const newDate = new Date(date);

  if (unit === "year") {
    newDate.setFullYear(getYear(date) - value);
  }

  if (unit === "month") {
    newDate.setMonth(getMonth(date) - value);
  }

  if (unit === "date") {
    newDate.setDate(getDate(date) - value);
  }

  return newDate;
};

/**
 * compare
 */
type CompareUnit = "year" | "month" | "date" | 'hour' | 'minute' | "all";
export const isSame = (
  dateA: Date,
  dateB: Date,
  unit: CompareUnit,
): boolean => {
  const isSameYear = getYear(dateA) === getYear(dateB);
  if (!isSameYear) return false;
  if (unit === "year") return true;

  const isSameMonth = getMonth(dateA) === getMonth(dateB);
  if (!isSameMonth) return false;
  if (unit === "month") return true;

  const isSameDate = getDate(dateA) === getDate(dateB);
  if (!isSameDate) return false;
  if (unit === "date") return true;

  const isSameHour = getHour(dateA).hour === getHour(dateB).hour;
  if (!isSameHour) return false;
  if (unit === 'hour') return true;

  const isSameMinute = getMinutes(dateA) === getMinutes(dateB);
  if (!isSameMinute) return false;
  if (unit === 'minute') return true;

  return +dateA === +dateB;
};

export const isAfter = (dateA: Date, dateB: Date): boolean => {
  return dateA > dateB;
};

export const isSameOrAfter = (dateA: Date, dateB: Date): boolean => {
  return isSame(dateA, dateB, "all") || isAfter(dateA, dateB);
};
