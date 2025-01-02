import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import NormalText from "./StyledText";
import { Schema } from "@/amplify/data/resource";
import { isAfter, isSame, toTimeString } from "@/utils/date";

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
          {data.text}
        </NormalText>
        <View>
          <NormalText>{toTimeString(new Date(data.startTime))}</NormalText>
          <NormalText color="grey">{toTimeString(new Date(data.endTime))}</NormalText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface ScheduleListProps {
  list: Array<Schedule> | null;
  onSelectSchedule: (schedule: Schedule) => void;
}
export default function ScheduleList({ list, onSelectSchedule }: ScheduleListProps) {
  const sortedList = list?.sort((a, b) => {
    const startTimeObjA = new Date(a.startTime);
    const startTimeObjB = new Date(b.startTime);
    if (isSame(startTimeObjA, startTimeObjB, 'minute')) {
      const endTimeObjA = new Date(a.endTime);
      const endTimeObjB = new Date(b.endTime);
      if (isSame(endTimeObjA, endTimeObjB, 'minute')) {
        return 0;
      } else {
        return isAfter(endTimeObjA, endTimeObjB) ? 1 : -1;
      }
    }
    return isAfter(startTimeObjA, startTimeObjB) ? 1 : -1;
  });

  return (
    <FlatList
      data={sortedList}
      renderItem={({ item }) => <ScheduleItem data={item} onSelectSchedule={onSelectSchedule} />}
    />
  );
}

const styles = StyleSheet.create({
  scheduleItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderLeftWidth: 4,
    borderColor: "white",
    borderStyle: "solid",
  },
});
