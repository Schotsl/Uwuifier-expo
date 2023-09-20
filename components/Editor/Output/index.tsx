import React from "react";

import EditorLabel from "../Label";

import { ScrollView, StyleSheet, View, Text } from "react-native";

type EditorOutputProps = {
  value: string;
};

export default function EditorOutput({ value }: EditorOutputProps) {
  return (
    <View style={styles.output}>
      <EditorLabel color="#252525" background="#ffc83d" label="Output" />

      <ScrollView style={styles.output__scroll}>
        <Text style={styles.output__text_scroll}>{value}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  output: {
    flex: 1,
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
