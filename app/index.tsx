import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

import { Box } from "@/src/components/Box";
import { Header } from "@/src/components/Header";
import { PlayerHUD } from "@/src/components/PlayerHUD";
import { useTheme } from "@/src/context/ThemeContext";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Index() {
  const { width } = useWindowDimensions();
  const { colors, isDark } = useTheme();

  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | "draw" | null>(null);
  const [winningPattern, setWinningPattern] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });

  // Classic 3x3 sizing
  const cellSize = Math.min(100, Math.floor((width - 64) / 3));
  const boardSize = cellSize * 3;

  const checkWinner = (currentBoard: string[]): number[] | null => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return combo;
      }
    }
    return null;
  };

  const handleTilePress = (index: number) => {
    if (board[index] !== "" || winner !== null) return;

    const nextBoard = [...board];
    nextBoard[index] = turn;
    setBoard(nextBoard);

    const winCombo = checkWinner(nextBoard);
    if (winCombo) {
      setWinner(turn);
      setWinningPattern(winCombo);
      setScores((prev) => ({
        ...prev,
        [turn === "X" ? "x" : "o"]: prev[turn === "X" ? "x" : "o"] + 1,
      }));
      return;
    }

    if (nextBoard.every((cell) => cell !== "")) {
      setWinner("draw");
      setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
      return;
    }

    setTurn((prev) => (prev === "X" ? "O" : "X"));
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setWinningPattern(null);
    setTurn(winner === "O" ? "O" : "X");
  };

  const handleResetScores = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setWinningPattern(null);
    setTurn("X");
    setScores({ x: 0, o: 0, ties: 0 });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <Header onResetScores={handleResetScores} />

      {/* Player Score & Turn Capsule */}
      <PlayerHUD
        currentTurn={turn}
        scoreX={scores.x}
        scoreO={scores.o}
        scoreTies={scores.ties}
      />

      {/* Clean Status Message */}
      <View style={styles.statusWrapper}>
        {winner === "X" && (
          <Text style={[styles.statusText, { color: colors.playerX }]}>
            Player 1 won
          </Text>
        )}
        {winner === "O" && (
          <Text style={[styles.statusText, { color: colors.playerO }]}>
            Player 2 won
          </Text>
        )}
        {winner === "draw" && (
          <Text style={[styles.statusText, { color: colors.textPrimary }]}>
            Game ended in a draw
          </Text>
        )}
        {!winner && (
          <Text style={[styles.statusSubtle, { color: colors.textSecondary }]}>
            {turn === "X" ? "Player 1's turn" : "Player 2's turn"}
          </Text>
        )}
      </View>

      {/* Classic 3x3 Grid */}
      <View style={styles.boardContainer}>
        <View
          style={[
            styles.board,
            {
              width: boardSize,
              height: boardSize,
            },
          ]}
        >
          {board.map((val, i) => (
            <Box
              key={i}
              value={val}
              size={cellSize}
              disabled={winner !== null}
              isWinning={winningPattern?.includes(i) ?? false}
              onPress={() => handleTilePress(i)}
              style={[
                i % 3 !== 0 && {
                  borderLeftWidth: 5,
                  borderLeftColor: colors.gridLine,
                },
                i > 2 && {
                  borderTopWidth: 5,
                  borderTopColor: colors.gridLine,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Bottom Action Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.actionButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
          onPress={handlePlayAgain}
        >
          <Feather
            name={winner ? "play" : "rotate-ccw"}
            size={16}
            color={colors.textPrimary}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.actionButtonText, { color: colors.textPrimary }]}>
            {winner ? "Play Again" : "Reset Board"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  statusWrapper: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusSubtle: {
    fontSize: 14,
    fontWeight: "400",
  },
  boardContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 16,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
  },
  bottomControls: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
