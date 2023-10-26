import React from "react";
import { StyleSheet, Text, View } from "react-native";

import globals from "../../../variables";

interface EditorLabelProps {
  color: string;
  label: string;
  background: string;
}

export default function EditorLabel({
  color,
  label,
  background,
}: EditorLabelProps) {
  return (
    <View style={[styles.header, { backgroundColor: background }]}>
      <View style={styles.wrapper}>
        <View style={styles.upperline} />

        <Text style={[styles.content, { color }]}>{label}</Text>

        <View style={[styles.underline, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    textAlign: "center",
    fontWeight: "bold",

    fontSize: globals.font.body,
  },
  upperline: {
    height: 3,
  },
  underline: {
    height: 3,
  },
});
