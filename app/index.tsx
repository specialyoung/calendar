import Calendar from "@/components/Calendar";
import ScheduleList from "@/components/ScheduleList";
import { getMonth, getYear, toDateString } from "@/utils/date";
import { Amplify } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import outputs from '../amplify_outputs.json'
import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";

Amplify.configure(outputs);

const client = generateClient<Schema>();
type ScheduleTree = Record<string, Array<Schema['Schedule']['type']>>;

export default function Index() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleTree, setScheduleTree] = useState<ScheduleTree | null>(null);
  const schedulesOfSelectedDate = useMemo(() => {
    return scheduleTree?.[toDateString(selectedDate)] ?? null;
  }, [selectedDate, scheduleTree]);

  useEffect(() => {
    const selectedYear = getYear(selectedDate);
    const selectedMonth = getMonth(selectedDate) + 1;

    const groupByDate = (list: Array<Schema['Schedule']['type']>) => {
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
      <Calendar selectedDate={selectedDate} datesWithSchedules={Object.keys(scheduleTree ?? {})} onChangeDate={(date) => setSelectedDate(date)} />
      <ScheduleList list={schedulesOfSelectedDate} />
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
});
