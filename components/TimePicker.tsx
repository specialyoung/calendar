import { getHour, Meridiem } from "@/utils/date";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

interface TimePickerProps {
  initialTime: Date;
  onChange: (date: Date) => void;
}

export default function TimePicker({ initialTime, onChange }: TimePickerProps) {
  const hoursOptions = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutesOptions = [0, 30];
  const meridiemsOptions = [Meridiem.AM, Meridiem.PM];
  
  const { hour, meridiem } = getHour(initialTime);
  const [selectedHour, setSelectedHour] = useState(hour);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedMeridiem, setSelectedMeridiem] = useState<Meridiem>(meridiem);

  useEffect(() => {
    const newDate = new Date();
    
    let hour = selectedHour;
    if ((selectedMeridiem === Meridiem.PM && hour < 12) || (selectedMeridiem === Meridiem.AM && hour === 12)) {
      hour += 12;
    }

    newDate.setHours(hour);
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
