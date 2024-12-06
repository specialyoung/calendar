import { StyleSheet, Text, TextProps } from "react-native";

export enum TextType {
  Text = "text",
  Title = "title",
  SubTitle = "subtitle",
}

interface StyledTextProps {
  type?: TextType;
}

export default function StyledText({
  type = TextType.Text,
  children,
  ...rest
}: StyledTextProps & Omit<TextProps, "style">) {
  return (
    <Text
      style={[
        styles.text,
        type === TextType.SubTitle ? styles.subtitle : null,
        type === TextType.Title ? styles.title : null,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  subtitle: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
