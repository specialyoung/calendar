import { Platform, Alert } from "react-native";

interface AlertParams {
  title: string;
  message: string;
}
export default function appAlert({ title, message }: AlertParams) {
  if (Platform.OS === "web") {
    window.alert(message);
  } else {
    Alert.alert(title, message, [
      {
        text: "확인",
        onPress: () => console.log("cancel"),
        style: "cancel",
      },
    ]);
  }
}
