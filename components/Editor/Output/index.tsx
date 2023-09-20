import React from "react";
import Uwuifier from "../../../utils/uwuifier";

import EditorLabel from "../Label";

import { ScrollView, StyleSheet, View, Text } from "react-native";

type EditorOutputProps = {
  value: string;
};

export default function EditorOutput({ value }: EditorOutputProps) {
  const uwuifier = new Uwuifier();

  return (
    <View style={styles.output}>
      <EditorLabel color="#252525" background="#ffc83d" label="Output" />

      <ScrollView style={styles.output__scroll}>
        {value === "" ? (
          <Text style={styles.output_scroll__placeholder}>
            {uwuifier.uwuifySentence("Read something here...")}
          </Text>
        ) : (
          <Text style={styles.output__scroll__text}>{value}</Text>
        )}
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
    minHeight: 150,
    marginVertical: 16,
  },
  output__scroll__text: {
    color: "#252525",
    fontSize: 17,
  },
  output_scroll__placeholder: {
    color: "#252525",
    opacity: 0.75,
    fontSize: 17,
  },
});
