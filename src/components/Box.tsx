import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";

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
        style={[
          {
            borderColor: "red",
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 28,
          }}
        >
          {value}
        </Text>
      </TouchableOpacity>
    );
  };