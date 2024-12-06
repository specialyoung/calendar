import { getHour, Meridiem } from "@/utils/date";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

interface TimePickerProps {
  onChange: (date: Date) => void;
}

export default function TimePicker({ onChange }: TimePickerProps) {
  const hoursOptions = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutesOptions = [0, 30];
  const meridiemsOptions = [Meridiem.AM, Meridiem.PM];
  const now = new Date();

  const { hour, meridiem } = getHour(now);
  const [selectedHour, setSelectedHour] = useState(hour);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedMeridiem, setSelectedMeridiem] = useState<Meridiem>(meridiem);

  useEffect(() => {
    const newDate = new Date();
    newDate.setHours(
      selectedHour + (selectedHour > 12 && selectedMeridiem === Meridiem.PM ? 12 : 0),
    );
    newDate.setMinutes(selectedMinutes);
    onChange(newDate);
  }, [selectedHour, selectedMinutes, selectedMeridiem]);

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={`${selectedHour}`}
        onValueChange={(value) => setSelectedHour(Number(value))}
      >
        {hoursOptions.map((hour) => (
          <Picker.Item key={hour} value={hour} label={`${hour}`} />
        ))}
      </Picker>
      <Picker
        style={styles.picker}
        selectedValue={`${selectedMinutes}`}
        onValueChange={(value) => setSelectedMinutes(Number(value))}
      >
        {minutesOptions.map((minute) => (
          <Picker.Item key={minute} value={minute} label={`${minute}`} />
        ))}
      </Picker>
      <Picker
        style={styles.picker}
        selectedValue={selectedMeridiem}
        onValueChange={(value) => setSelectedMeridiem(value)}
      >
        {meridiemsOptions.map((meridiem) => (
          <Picker.Item key={meridiem} value={meridiem} label={`${meridiem}`} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  picker: {
    flex: 1,
  },
});
