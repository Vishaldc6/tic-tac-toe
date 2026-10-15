import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "../context/ThemeContext";

interface BoxProps {
  value: string;
  onPress: () => void;
  disabled?: boolean;
  isWinning?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const Box: React.FC<BoxProps> = ({
  value,
  onPress,
  disabled = false,
  isWinning = false,
  size = 100,
  style,
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    if (value) {
      scaleAnim.setValue(0);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 180,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [value, scaleAnim]);

  const handlePress = () => {
    if (disabled || value) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Graceful fallback
    }
    onPress();
  };

  const isX = value === "X";

  return (
    <TouchableOpacity
      activeOpacity={value || disabled ? 1 : 0.6}
      disabled={disabled || !!value}
      onPress={handlePress}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderColor: colors.gridLine,
        },
        isWinning && { backgroundColor: colors.winCellBg },
        style,
      ]}
    >
      {value ? (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {isX ? (
            <Feather
              name="x"
              size={size * 0.52}
              color={isWinning ? colors.winHighlight : colors.playerX}
            />
          ) : (
            <Feather
              name="circle"
              size={size * 0.44}
              color={isWinning ? colors.winHighlight : colors.playerO}
            />
          )}
        </Animated.View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
