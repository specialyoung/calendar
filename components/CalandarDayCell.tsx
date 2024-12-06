import { View, Text, StyleSheet } from "react-native";
import CalendarCell from "./CalendarCell";

interface CalendarDayCellProps {
  day: string;
}

export default function CalendarDayCell({ day }: CalendarDayCellProps) {
  return (
    <CalendarCell>
      <Text style={styles.dayCellText}>{day}</Text>
    </CalendarCell>
  );
}

const styles = StyleSheet.create({
  dayCellText: {
    textAlign: "center",
  },
});
