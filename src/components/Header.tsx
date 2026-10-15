import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onResetScores: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onResetScores }) => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Shunya Chokadi
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Tic Tac Toe
        </Text>
      </View>

      <View style={styles.actionsRow}>
        {/* Theme Toggle Button */}
        <TouchableOpacity
          activeOpacity={0.65}
          onPress={toggleTheme}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[
            styles.iconButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
          accessibilityLabel="Toggle Theme"
        >
          <Feather
            name={isDark ? "sun" : "moon"}
            size={17}
            color={isDark ? "#FBBF24" : colors.textPrimary}
          />
        </TouchableOpacity>

        {/* Reset Scores Button */}
        <TouchableOpacity
          activeOpacity={0.65}
          onPress={onResetScores}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[
            styles.iconButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
          accessibilityLabel="Reset Scores"
        >
          <Feather name="rotate-ccw" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  titleGroup: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
    letterSpacing: 0.2,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
