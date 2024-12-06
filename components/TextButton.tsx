import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface TextButtonProps {
  text: string;
  disabled?: TouchableOpacityProps["disabled"];
  onPress: TouchableOpacityProps["onPress"];
}

export default function TextButton({
  text,
  disabled = false,
  onPress,
}: TextButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={[styles.buttonText, disabled ? styles.disabledButtonText : null]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "coral",
    fontSize: 18,
  },
  disabledButtonText: {
    color: "lightgrey",
  },
});
