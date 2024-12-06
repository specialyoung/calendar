import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import NormalText from "./StyledText";
import { Schema } from "@/amplify/data/resource";

type Schedule = Schema['Schedule']['type'];

interface ScheduleItemProps {
  data: Schema['Schedule']['type'];
  onSelectSchedule: (schedule: Schedule) => void;
}
function ScheduleItem({ data, onSelectSchedule }: ScheduleItemProps) {
  const onPress = () => onSelectSchedule(data);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.scheduleItemContainer, { borderColor: data.color }]} >
        <NormalText>
          {data.text} ({data.startTime} ~ {data.endTime})
        </NormalText>
      </View>
    </TouchableOpacity>
  );
}

interface ScheduleListProps {
  list: Array<Schedule> | null;
  onSelectSchedule: (schedule: Schedule) => void;
}
export default function ScheduleList({ list, onSelectSchedule }: ScheduleListProps) {
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => <ScheduleItem data={item} onSelectSchedule={onSelectSchedule} />}
    />
  );
}

const styles = StyleSheet.create({
  scheduleItemContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderLeftWidth: 4,
    borderColor: "white",
    borderStyle: "solid",
  },
});
