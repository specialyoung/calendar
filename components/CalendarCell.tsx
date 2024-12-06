import { View, StyleSheet, ViewProps } from "react-native";

export default function CalendarCell({ children }: ViewProps) {
  return <View style={styles.cell}>{children}</View>;
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderStyle: "solid",
    borderColor: "#efefef",
  },
});
