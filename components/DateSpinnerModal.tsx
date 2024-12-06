import { Modal, ModalProps, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { getMonth, getYear } from "@/utils/date";
import TextButton from "./TextButton";
import { Picker } from "@react-native-picker/picker";
import StyledText from "./StyledText";

interface DateSpinnerModalProps {
  initialDate: Date;
  visible: ModalProps["visible"];
  onClose: (date: Date) => void;
}
export default function DateSpinnerModal({
  initialDate,
  visible,
  onClose,
}: DateSpinnerModalProps) {
  const [selectedYear, setSelectedYear] = useState(getYear(initialDate));
  const [selectedMonth, setSelectedMonth] = useState(getMonth(initialDate));

  const yearOptions = Array.from(
    { length: getYear(initialDate) - 2000 + 1 },
    (_, index) => 2000 + index,
  );
  const monthOptions = Array.from({ length: 12 }, (_, index) => index);

  const onRequestClose = () => {
    onClose(new Date(selectedYear, selectedMonth, 1));
  };

  useEffect(() => {
    if (visible) {
      setSelectedYear(getYear(initialDate));
      setSelectedMonth(getMonth(initialDate));
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.modalNavigator}>
            <TextButton text="완료" onPress={onRequestClose} />
          </View>

          <StyledText>Year</StyledText>

          <Picker
            selectedValue={selectedYear}
            onValueChange={(value) => setSelectedYear(value)}
          >
            {yearOptions.map((year) => (
              <Picker.Item key={year} label={`${year}`} value={year} />
            ))}
          </Picker>

          <StyledText>Month</StyledText>

          <Picker
            selectedValue={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            {monthOptions.map((month) => (
              <Picker.Item
                key={month + 1}
                label={`${month + 1}`}
                value={month}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    gap: 8,
    position: "absolute",
    bottom: 0,
    padding: 24,
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "white",
    zIndex: 12000,
  },
  modalNavigator: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
});
