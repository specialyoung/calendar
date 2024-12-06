declare namespace App {
  interface TimeObject {
    h: number;
    m: number;
  }

  interface ScheduleObject {
    text: string;
    color: string;
    startTime: TimeObject;
    endTime: TimeObject;
  }

  type FullScheduleObject = ScheduleObject & { date: Date };

  type DateString = string;
  type TimeString = `${string}:${string}`;
  type CalendarDateObject = {
    y: number
    m: number
    d: number
  }
}
