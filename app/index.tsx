import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import { Box } from "@/src/components/Box";
import { Colors } from "@/src/constants/colors";

export default function Index() {
  const [turn, setTurn] = useState(1);
  const [matrix, setMatrix] = useState(["", "", "", "", "", "", "", "", ""]);

  useEffect(() => {
    turn <= 10 && checkWin();
  }, [turn]);

  const checkWin = () => {
    if (turn >= 5) {
      const winningPatterns = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [2, 5, 8],
        [1, 4, 7],
        [2, 4, 6],
      ];

      for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (
          matrix[a] === matrix[b] &&
          matrix[b] === matrix[c] &&
          matrix[a] !== ""
        ) {
          Alert.alert("Won", `Player ${matrix[a]} WON !!`);
          setTurn(11);
          return;
        }
      }
      if (turn > 9) {
        Alert.alert("Draw", "Oops! it's a Draw !!");
      }
      // if (
      //   (matrix[0] == "O" && matrix[1] == "O" && matrix[2] == "O") ||
      //   (matrix[0] == "O" && matrix[4] == "O" && matrix[8] == "O") ||
      //   (matrix[0] == "O" && matrix[3] == "O" && matrix[6] == "O") ||
      //   (matrix[3] == "O" && matrix[4] == "O" && matrix[5] == "O") ||
      //   (matrix[6] == "O" && matrix[7] == "O" && matrix[8] == "O") ||
      //   (matrix[2] == "O" && matrix[5] == "O" && matrix[8] == "O") ||
      //   (matrix[1] == "O" && matrix[4] == "O" && matrix[7] == "O") ||
      //   (matrix[2] == "O" && matrix[4] == "O" && matrix[6] == "O")
      // ) {
      //   alert("Player 1 WON!!");
      //   setTurn(10);
      // } else if (
      //   (matrix[0] == "X" && matrix[1] == "X" && matrix[2] == "X") ||
      //   (matrix[0] == "X" && matrix[4] == "X" && matrix[8] == "X") ||
      //   (matrix[0] == "X" && matrix[3] == "X" && matrix[6] == "X") ||
      //   (matrix[3] == "X" && matrix[4] == "X" && matrix[5] == "X") ||
      //   (matrix[6] == "X" && matrix[7] == "X" && matrix[8] == "X") ||
      //   (matrix[2] == "X" && matrix[5] == "X" && matrix[8] == "X") ||
      //   (matrix[1] == "X" && matrix[4] == "X" && matrix[7] == "X") ||
      //   (matrix[2] == "X" && matrix[4] == "X" && matrix[6] == "X")
      // ) {
      //   alert("Player 2 WON!!");
      //   setTurn(10);
      // } else if (turn > 9) {
      //   alert("draw!");
      // }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <Text style={styles.playerText}>{"Player 1: O"}</Text>
        <Text style={styles.playerText}>{"Player 2: X"}</Text>
      </View>
      <Text style={styles.turnText}>
        {"TURN : Player "}
        {turn % 2 ? "1" : "2"}
      </Text>
      <View style={styles.board}>
        {matrix.map((val, i) => (
          <Box
            disabled={turn > 9}
            onPress={() => {
              if (matrix[i] == "") {
                setMatrix((prev) => {
                  prev[i] = turn % 2 ? "O" : "X";
                  return prev;
                });
                setTurn((prv) => prv + 1);
              }
            }}
            style={[
              i % 3 != 0 && {
                borderLeftWidth: 8,
              },
              i > 2 && {
                borderTopWidth: 8,
              },
            ]}
            value={val}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={() => {
          setMatrix(["", "", "", "", "", "", "", "", ""]);
          setTurn(1);
        }}
      >
        <Text style={styles.resetText}>{"RESET"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_BACKGROUND,
  },
  board: {
    flexDirection: "row",
    width: 300,
    height: 300,
    flexWrap: "wrap",
    alignSelf: "center",
    margin: 50,
  },
  playerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  playerText: {
    fontSize: 24,
    color: Colors.PRIMARY_TEXT,
    marginVertical: 30,
    fontWeight: "600",
  },
  turnText: {
    alignSelf: "center",
    fontSize: 18,
    color: Colors.PRIMARY_TEXT,
    fontWeight: "600",
  },
  resetBtn: {
    backgroundColor: Colors.SECONDARY,
    alignItems: "center",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
  },
  resetText: {
    color: Colors.PRIMARY_TEXT,
    fontSize: 18,
    fontWeight: "600",
  },
});
