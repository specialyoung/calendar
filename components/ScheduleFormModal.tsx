import { useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import appAlert from "@/utils/alert";
import TextButton from "./TextButton";
import StyledText, { TextType } from "./StyledText";
import { isSameOrAfter, toDateString, toTimeString } from "@/utils/date";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import ScheduleForm, { Form, ScheduleFormProps } from "./ScheduleForm";

interface ScheduleFormModalProps {
  date: Date;
  schedule: ScheduleFormProps["schedule"];
  isShow: boolean;
  onClose: () => void;
}

const client = generateClient<Schema>();

export default function ScheduleFormModal({
  date,
  schedule,
  isShow,
  onClose,
}: ScheduleFormModalProps) {
  const [formValues, setFormValues] = useState<Form | null>(null);
  const isUpdate = !!schedule;

  const createSchedule = async (formValues: Form) => {
    try {
      const payload = {
        date: toDateString(date),
        text: formValues.text,
        color: formValues.color,
        startTime: formValues.startTime.toISOString(),
        endTime: formValues.endTime.toISOString(),
      };
      await client.models.Schedule.create(payload);
    } catch (error) {
      console.error("createSchedule: ", error);
    }
  };

  const updateSchedule = async ({
    schedule,
    formValues,
  }: {
    schedule: Schema["Schedule"]["type"];
    formValues: Form;
  }) => {
    try {
      const payload = {
        ...schedule,
        startTime: formValues.startTime.toISOString(),
        endTime: formValues.endTime.toISOString(),
      };
      await client.models.Schedule.update(payload);
    } catch (error) {
      console.error("updateSchedule: ", error);
    }
  };

  const submit = (formValues: Form) => {
    if (isUpdate) {
      return updateSchedule({ schedule, formValues });
    }
    return createSchedule(formValues);
  };

  const onPressSubmitButton = async () => {
    if (!formValues) return;

    if (formValues.text.length === 0) {
      appAlert({
        title: "이벤트를 저장할 수 없음",
        message: "이벤트 내용을 입력해 주세요.",
      });
      return;
    }

    if (isSameOrAfter(formValues.startTime, formValues.endTime)) {
      appAlert({
        title: "이벤트를 저장할 수 없음",
        message: "시작 날짜는 종료 날짜 이전이어야 합니다.",
      });
      return;
    }

    await submit(formValues);
    onClose();
  };

  const onChangeForm = (formValues: Form) => {
    setFormValues(formValues);
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
            <StyledText type={TextType.Title}>
              {isUpdate ? "이벤트 편집" : "새로운 이벤트"}
            </StyledText>
            <TextButton
              text={isUpdate ? "수정" : "추가"}
              disabled={!formValues}
              onPress={onPressSubmitButton}
            />
          </View>
          <ScrollView style={styles.scrollContainer}>
            <ScheduleForm schedule={schedule} onChangeForm={onChangeForm} />
          </ScrollView>
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
    // top: 0,
    height: "90%",
    width: "100%",
    backgroundColor: "white",
    zIndex: 12000,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  scrollContainer: {
    padding: 16,
  },
  modalNavigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
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
