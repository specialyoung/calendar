import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function StyledTextInput(props: TextInputProps) {
  return (
    <TextInput
      style={[styles.textInput, props?.readOnly ? styles.readOnly : null]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  readOnly: {
    backgroundColor: "#f1f1f1",
  },
});
