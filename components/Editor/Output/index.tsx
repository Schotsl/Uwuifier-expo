import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Uwuifier from "uwuifier";

import globals from "../../../variables";
import EditorLabel from "../Label";

type EditorOutputProps = {
  value: string;
};

export default function EditorOutput({ value }: EditorOutputProps) {
  const uwuifier = new Uwuifier();

  return (
    <View style={styles.output}>
      <EditorLabel
        color={globals.colors.grey}
        background={globals.colors.yellow}
        label="Output"
      />

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

    backgroundColor: globals.colors.yellow,
    paddingHorizontal: globals.spacing.editor.vertical,
  },
  output__scroll: {
    minHeight: 150,

    marginVertical: globals.spacing.default,
  },
  output__scroll__text: {
    color: globals.colors.grey,
    fontSize: globals.font.body,
  },
  output_scroll__placeholder: {
    opacity: 0.75,

    color: globals.colors.grey,
    fontSize: globals.font.body,
  },
});
