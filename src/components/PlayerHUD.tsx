import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

interface PlayerHUDProps {
  currentTurn: "X" | "O";
  scoreX: number;
  scoreO: number;
  scoreTies: number;
}

export const PlayerHUD: React.FC<PlayerHUDProps> = ({
  currentTurn,
  scoreX,
  scoreO,
  scoreTies,
}) => {
  const { colors } = useTheme();
  const isXTurn = currentTurn === "X";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Player X */}
      <View
        style={[
          styles.playerBox,
          isXTurn && { backgroundColor: colors.surfaceElevated },
        ]}
      >
        <View style={styles.playerInfo}>
          <Feather
            name="x"
            size={16}
            color={colors.playerX}
            style={styles.markIcon}
          />
          <Text
            style={[
              styles.playerName,
              { color: isXTurn ? colors.textPrimary : colors.textSecondary },
              isXTurn && styles.playerNameActive,
            ]}
          >
            Player 1
          </Text>
        </View>
        <Text style={[styles.scoreText, { color: colors.textPrimary }]}>
          {scoreX}
        </Text>
      </View>

      {/* Ties in middle */}
      <View style={styles.dividerBox}>
        <Text style={[styles.tieLabel, { color: colors.textMuted }]}>Ties</Text>
        <Text style={[styles.tieScore, { color: colors.textSecondary }]}>
          {scoreTies}
        </Text>
      </View>

      {/* Player O */}
      <View
        style={[
          styles.playerBox,
          !isXTurn && { backgroundColor: colors.surfaceElevated },
        ]}
      >
        <View style={styles.playerInfo}>
          <Feather
            name="circle"
            size={14}
            color={colors.playerO}
            style={styles.markIcon}
          />
          <Text
            style={[
              styles.playerName,
              { color: !isXTurn ? colors.textPrimary : colors.textSecondary },
              !isXTurn && styles.playerNameActive,
            ]}
          >
            Player 2
          </Text>
        </View>
        <Text style={[styles.scoreText, { color: colors.textPrimary }]}>
          {scoreO}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    padding: 6,
    marginHorizontal: 20,
    borderWidth: 1,
  },
  playerBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  markIcon: {
    marginRight: 6,
  },
  playerName: {
    fontSize: 13,
    fontWeight: "500",
  },
  playerNameActive: {
    fontWeight: "600",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "700",
  },
  dividerBox: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
  tieLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  tieScore: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
});
