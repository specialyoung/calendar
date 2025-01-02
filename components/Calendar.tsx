import {
  add,
  getDaysInMonth,
  getFirstDayOfMonth,
  getMonth,
  getYear,
  isSame,
  subtract,
} from "@/utils/date";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import CalendarDateCell from "./CalendarDateCell";
import CalendarCell from "./CalendarCell";
import CalendarDayCell from "./CalandarDayCell";
import DateSpinnerModal from "./DateSpinnerModal";

const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toDateStringFromCalendarDate = (calendarDate: App.CalendarDateObject) => {
  const mm = `${calendarDate.m}`.padStart(2, "0");
  const dd = `${calendarDate.d}`.padStart(2, "0");
  return `${calendarDate.y}-${mm}-${dd}`;
};

const toDateFromCalendarDate = (calendarDate: App.CalendarDateObject) => {
  return new Date(calendarDate.y, calendarDate.m - 1, calendarDate.d);
};

const getCalendarDates = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month);
  const dayOfStartDate = getFirstDayOfMonth(year, month);
  const array: Array<Array<null | App.CalendarDateObject>> = Array.from(
    { length: Math.ceil((dayOfStartDate + daysInMonth) / 7) },
    () => Array.from({ length: 7 }, () => null),
  );

  let date = 1;
  for (let i = 0; i < array.length; i++) {
    for (let d = 0; d < array[i].length; d++) {
      if (i === 0 && d < dayOfStartDate) {
        continue;
      }
      if (date > daysInMonth) {
        break;
      }
      array[i][d] = {
        y: year,
        m: month + 1,
        d: date,
      };
      date++;
    }
  }

  return array;
};

export interface CalendarProps {
  selectedDate: Date;
  datesWithSchedules: Array<App.DateString>;
  onChangeDate: (date: Date) => void;
}

export default function Calendar({
  selectedDate,
  datesWithSchedules,
  onChangeDate,
}: CalendarProps) {
  const today = new Date();

  const [dateSpinnerModalVisible, setDateSpinnerModalVisible] = useState(false);

  const selectedYear = getYear(selectedDate);
  const selectedMonth = getMonth(selectedDate);
  const displayMonth = selectedMonth + 1;
  const calendarDates = getCalendarDates(selectedYear, selectedMonth);

  const isToday = (calendarDate: App.CalendarDateObject | null) => {
    if (calendarDate === null) return false;
    return isSame(toDateFromCalendarDate(calendarDate), today, "date");
  };

  const isSelectedDate = (calendarDate: App.CalendarDateObject | null) => {
    if (calendarDate === null) return false;
    return isSame(toDateFromCalendarDate(calendarDate), selectedDate, "date");
  };

  const isDateWithSchedules = (calendarDate: App.CalendarDateObject) => {
    const dateString = toDateStringFromCalendarDate(calendarDate);
    return datesWithSchedules.includes(dateString);
  };

  const onPressDateCell = (calendarDate: App.CalendarDateObject) => {
    onChangeDate(toDateFromCalendarDate(calendarDate));
  };

  const getNextDate = (date: Date) => {
    const newDate = new Date(date);
    if (isSame(today, newDate, "month")) {
      return today;
    }
    newDate.setDate(1);
    return newDate;
  };

  const onCloseDateSpinnerModal = (newDate: Date) => {
    setDateSpinnerModalVisible(false);
    onChangeDate(getNextDate(newDate));
  };

  const onPressPrevButton = () => {
    const newDate = subtract(selectedDate, 1, "month");
    onChangeDate(getNextDate(newDate));
  };

  const onPressNextbutton = () => {
    const newDate = add(selectedDate, 1, "month");
    onChangeDate(getNextDate(newDate));
  };

  const onPressTodayButton = () => {
    onChangeDate(today);
  };

  return (
    <View>
      <DateSpinnerModal
        initialDate={selectedDate}
        visible={dateSpinnerModalVisible}
        onClose={onCloseDateSpinnerModal}
      />

      <View style={styles.calendarNavigator}>
        <IconButton iconName="chevron-back" onPress={onPressPrevButton} />
        <TextButton
          text={`${selectedYear}년 ${displayMonth}월`}
          onPress={() => setDateSpinnerModalVisible(true)}
        />
        <IconButton iconName="chevron-forward" onPress={onPressNextbutton} />
      </View>

      <View style={styles.calendar}>
        <View style={styles.row}>
          {dayOfTheWeek.map((day) => (
            <CalendarDayCell key={day} day={day} />
          ))}
        </View>

        {calendarDates.map((group, index) => (
          <View key={`group.${index}`} style={styles.row}>
            {group.map((calendarDate, index) => (
              <CalendarCell key={`calendarCell.${index}`}>
                {calendarDate ? (
                  <CalendarDateCell
                    calendarDate={calendarDate}
                    isToday={isToday(calendarDate)}
                    isSelectedDate={isSelectedDate(calendarDate)}
                    isDateWithSchedules={isDateWithSchedules(calendarDate)}
                    onPress={() => onPressDateCell(calendarDate)}
                  />
                ) : null}
              </CalendarCell>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarNavigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    paddingVertical: 8,
  },
  calendar: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#efefef",
    borderBottomWidth: 0,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#efefef",
  },
});
