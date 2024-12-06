import { View, ViewProps, StyleSheet } from "react-native";
import StyledTextInput from "./StyledTextInput";
import TimePicker from "./TimePicker";
import StyledText from "./StyledText";
import { useEffect, useState } from "react";
import { Schema } from "@/amplify/data/resource";
import { toDateTime } from "@/utils/date";

interface FieldProps {
  label: string;
}
function Field({ label, children }: FieldProps & ViewProps) {
  return (
    <View style={{ paddingVertical: 8, gap: 8 }}>
      <StyledText>{label}</StyledText>
      {children}
    </View>
  );
}

export interface Form {
  text: string;
  color: string;
  startTime: Date;
  endTime: Date;
}

export interface ScheduleFormProps {
  schedule: Schema['Schedule']['type'] | null
  onChangeForm: (form: Form) => void
}

export default function ScheduleForm({
  schedule,
  onChangeForm
}: ScheduleFormProps) {
  const initialTime = new Date();
  const [text, setText] = useState(schedule?.text ?? '');
  const [startTime, setStartTime] = useState<Date>(schedule ? toDateTime(schedule.startTime as App.TimeString) : initialTime);
  const [endTime, setEndTime] = useState<Date>(schedule ? toDateTime(schedule.endTime as App.TimeString) : initialTime);

  useEffect(() => {
    onChangeForm({
      text,
      color: 'coral',
      startTime,
      endTime
    })
  }, [text, startTime, endTime]);
  
  return (
    <View style={styles.formContainer}>
      <Field label="Title">
        <StyledTextInput value={text} onChangeText={setText} />
      </Field>

      <Field label="Start Time">
        <TimePicker initialTime={startTime} onChange={(date) => setStartTime(date)} />
      </Field>

      <Field label="End Time">
        <TimePicker initialTime={endTime} onChange={(date) => setEndTime(date)} />
      </Field>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 8,
    paddingVertical: 16,
  },
  input: {
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
});
