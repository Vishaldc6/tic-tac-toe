import {
  StyleSheet,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/colors";

export const Box = ({
  value,
  onPress,
  disabled,
  style,
}: {
  value: string;
  onPress: () => void;
  disabled: boolean;
  style: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Text style={styles.valueText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 40,
    color: Colors.PRIMARY_TEXT,
    fontWeight: "500",
  },
});
