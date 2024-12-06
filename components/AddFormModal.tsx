import { useState } from "react";
import { Modal, StyleSheet, View, ViewProps } from "react-native";
import appAlert from "@/utils/alert";
import TextButton from "./TextButton";
import StyledText, { TextType } from "./StyledText";
import StyledTextInput from "./StyledTextInput";
import TimePicker from "./TimePicker";
import { isSameOrAfter, toDateString, toTimeString } from "@/utils/date";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";

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

interface AddFormModalProps {
  date: Date;
  isShow: boolean;
  onClose: () => void;
}

const client = generateClient<Schema>();

export default function AddFormModal({
  date,
  isShow,
  onClose,
}: AddFormModalProps) {
  const now = new Date();
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState(now);
  const [endTime, setEndTime] = useState(now);

  const createSchedule = async () => {
    try {
      const payload = {
        date: toDateString(date),
        text,
        color: 'coral',
        startTime: toTimeString(startTime),
        endTime: toTimeString(endTime)
      }
      console.log(payload)
      await client.models.Schedule.create(payload);
    } catch (error) {
      console.error(error)
    }
  }

  const onPressAddButton = () => {
    if (isSameOrAfter(startTime, endTime)) {
      appAlert({
        title: "이벤트를 저장할 수 없음",
        message: "시작 날짜는 종료 날짜 이전이어야 합니다.",
      });
      return;
    }

    setText("");
    createSchedule();
    onClose();
  };

  return (
    <Modal
      visible={isShow}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.modalNavigator}>
            <TextButton text="취소" onPress={onClose} />
            <StyledText type={TextType.Title}>새로운 이벤트</StyledText>
            <TextButton
              text="추가"
              disabled={text.length === 0}
              onPress={onPressAddButton}
            />
          </View>

          <View style={styles.modalBody}>
            <Field label="Title">
              <StyledTextInput value={text} onChangeText={setText} />
            </Field>

            <Field label="Start Time">
              <TimePicker onChange={(date) => setStartTime(date)} />
            </Field>

            <Field label="End Time">
              <TimePicker onChange={(date) => setEndTime(date)} />
            </Field>
          </View>
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
    position: "absolute",
    bottom: 0,
    padding: 16,
    width: "100%",
    backgroundColor: "white",
    zIndex: 12000,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalNavigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  modalBody: {
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
