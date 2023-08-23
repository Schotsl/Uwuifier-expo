import React from "react";

import EditorInput from "./Input";
import EditorOutput from "./Output";

import { useState } from "react";
import { View, StyleSheet } from "react-native";

import Uwuifier from "../../uwuifier";

export default function Editor() {
  const [input, setText] = useState(
    "Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do."
  );

  const uwuifier = new Uwuifier();
  
  return (
    <View style={styles.editor}>
      <EditorInput
        value={input}
        onChange={setText}
      />

      <EditorOutput value={uwuifier.uwuifySentence(input)} />
    </View>
  );
}

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    overflow: "hidden",

    marginTop: 12,
    marginHorizontal: -8,
    borderRadius: 32,

    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
});
