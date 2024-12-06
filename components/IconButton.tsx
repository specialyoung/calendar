import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

interface IconButtonProps {
  onPress: TouchableOpacityProps["onPress"];
  iconName: ComponentProps<typeof Ionicons>["name"];
  size?: ComponentProps<typeof Ionicons>["size"];
  color?: ComponentProps<typeof Ionicons>["color"];
}

export default function IconButton({
  iconName,
  onPress,
  color = "coral",
  size = 24,
}: IconButtonProps & TouchableOpacityProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "#f7f7f7",
  },
});
