import React from "react";

import EditorLabel from "../Label";
import EditorOutputButtons from "./Buttons";

import { ScrollView, StyleSheet, View, Text } from "react-native";

type EditorOutputProps = {
  value: string;
  onCopy: () => void;
  onShare: () => void;
};

export default function EditorOutput({
  value,
  onCopy,
  onShare,
}: EditorOutputProps) {
  return (
    <View style={styles.output}>
      <EditorLabel color="#252525" background="#ffc83d" label="Output" />

      <ScrollView style={styles.output__scroll}>
        <Text style={styles.output__text_scroll}>{value}</Text>
      </ScrollView>

      <EditorOutputButtons value={value} onCopy={onCopy} onShare={onShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  output: {
    height: "50%",
    paddingHorizontal: 24,
    backgroundColor: "#ffc83d",
  },
  output__scroll: {
    marginVertical: 16,
  },
  output__text_scroll: {
    color: "#252525",
    fontSize: 17,
  },
});
