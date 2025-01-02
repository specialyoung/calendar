import Calendar from "@/components/Calendar";
import ScheduleList from "@/components/ScheduleList";
import { getMonth, getYear, toDateString } from "@/utils/date";
import { Amplify } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import outputs from '../amplify_outputs.json'
import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import ScheduleFormModal from "@/components/ScheduleFormModal";
import TextButton from "@/components/TextButton";
import IconButton from "@/components/IconButton";

Amplify.configure(outputs);

const client = generateClient<Schema>();
type Schedule = Schema['Schedule']['type'];
type ScheduleTree = Record<string, Array<Schedule>>;

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleTree, setScheduleTree] = useState<ScheduleTree | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
  const schedulesOfSelectedDate = useMemo(() => {
    return scheduleTree?.[toDateString(selectedDate)] ?? null;
  }, [selectedDate, scheduleTree]);

  const onSelectSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setModalVisible(true);
  }

  useEffect(() => {
    const selectedYear = getYear(selectedDate);
    const selectedMonth = `${getMonth(selectedDate) + 1}`.padStart(2, '0');

    const groupByDate = (list: Array<Schedule>) => {
      return list.reduce((result, cur) => {
        result[cur.date] = [...(result[cur.date] ?? []), cur];
        return result;
      }, {} as ScheduleTree);
    };

    const sub = client.models.Schedule.observeQuery({
      filter: {
        date: {
          contains: `${selectedYear}-${selectedMonth}`
        }
      }
    }).subscribe({
      next: ({items}) => {
        const grouped = groupByDate(items)
        setScheduleTree(grouped)
      }
    });

    return () => sub.unsubscribe();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.navigator}>
        <TextButton text="오늘" onPress={() => setSelectedDate(new Date())} />
        <IconButton iconName="add" onPress={() => setModalVisible(true)} />
      </View>
      <Calendar
        selectedDate={selectedDate}
        datesWithSchedules={Object.keys(scheduleTree ?? {})}
        onChangeDate={(date) => setSelectedDate(date)}
      />
      <ScheduleList list={schedulesOfSelectedDate} onSelectSchedule={onSelectSchedule} />
      <ScheduleFormModal
        date={selectedDate}
        schedule={selectedSchedule}
        isShow={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  navigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16
  },
});
