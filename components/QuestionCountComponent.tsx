import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const QuestionCountComponent = ({ value = 5, setValue }) => {
  const MIN = 5;
  const MAX = 15;

  const isMin = value === MIN;
  const isMax = value === MAX;

  return (
    <View style={styles.container}>

      {/* TOP ROW */}
      <View style={styles.row}>
        
        {/* LEFT SIDE LABEL */}
        <View>
        <Text style={styles.label}>Question Count</Text>
        <Text style={styles.hint}>Min {MIN} • Max {MAX}</Text>
</View>
        {/* RIGHT SIDE COUNTER (centered vertically) */}
        <View style={styles.counterSection}>
          
          <TouchableOpacity
            onPress={() => !isMin && setValue(value - 1)}
            disabled={isMin}
            style={[styles.btn, isMin && styles.disabledBtn]}
          >
            <Text style={[styles.btnText, isMin && styles.disabledText]}>−</Text>
          </TouchableOpacity>

          <Text style={styles.value}>{value}</Text>

          <TouchableOpacity
            onPress={() => !isMax && setValue(value + 1)}
            disabled={isMax}
            style={[styles.btn, isMax && styles.disabledBtn]}
          >
            <Text style={[styles.btnText, isMax && styles.disabledText]}>+</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* Min Max Hint */}
    

    </View>
  );
};

export default QuestionCountComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },

  // Title left, counter right
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // THIS centers the counter vertically
    width: "100%",
    paddingHorizontal: 10,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  counterSection: {
    flexDirection: "row",
    alignItems: "center", // center buttons + number vertically
    backgroundColor: "#eef3ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent:'center'
  },

  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
  },

  disabledBtn: {
    backgroundColor: "#bfc9dd",
  },

  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  disabledText: {
    color: "#eee",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 12,
  },

  hint: {
    marginTop: 6,
    textAlign: "left",
    paddingLeft: 10,
    color: "#777",
    fontSize: 14,
  },
});
