import { getSplittedDateString } from "@/utils/date";
import { FontAwesome } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface CalendarDateCellProps {
  calendarDate: App.CalendarDateObject;
  isToday: boolean;
  isSelectedDate: boolean;
  isDateWithSchedules: boolean;
  onPress: TouchableOpacityProps["onPress"];
}

export default function CalendarDateCell({
  calendarDate,
  isToday,
  isSelectedDate,
  isDateWithSchedules,
  onPress,
}: CalendarDateCellProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isToday ? styles.today : null,
        isSelectedDate ? styles.selectedDate : null,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.dateCellText,
          isToday || isSelectedDate ? styles.whiteText : null,
        ]}
      >
        {calendarDate?.d ?? ''}
      </Text>

      {isDateWithSchedules && (
        <View style={styles.schedulesLength}>
          <FontAwesome name="circle" size={10} color="darkseagreen" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
  },
  whiteText: {
    color: "white",
  },
  dateCellText: {
    textAlign: "center",
    fontSize: 18,
  },
  schedulesLength: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
  },
  schedulesLengthText: {
    color: "white",
    fontWeight: "bold",
  },
  today: {
    backgroundColor: "coral",
    color: "white",
  },
  selectedDate: {
    backgroundColor: "black",
    color: "white",
  },
});
