import { FlatList, View, Text, StyleSheet } from "react-native";
import NormalText from "./StyledText";
import { Schema } from "@/amplify/data/resource";

interface ScheduleItemProps {
  data: Schema['Schedule']['type'];
}
function ScheduleItem({ data }: ScheduleItemProps) {
  return (
    <View style={[styles.scheduleItemContainer, { borderColor: data.color }]}>
      <NormalText>
        {data.text} ({data.startTime} ~ {data.endTime})
      </NormalText>
    </View>
  );
}

interface ScheduleListProps {
  list: Array<Schema['Schedule']['type']> | null;
}
export default function ScheduleList({ list }: ScheduleListProps) {
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => <ScheduleItem data={item} />}
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
