import React from "react";

import EditorInput from "./Input";
import EditorOutput from "./Output";

import { triggerPlausible } from "../../helper";
import { useState, useRef, useEffect,MutableRefObject } from "react";
import { View, StyleSheet } from "react-native";
import Uwuifier from "../../uwuifier";

export default function Editor() {
  const [typed, setTyped] = useState(false);
  const [input, setText] = useState(
    "Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do."
  );

  const uwuifier = new Uwuifier();

  // We'll use this over-typed ref to store the timeout
  const timeout: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  useEffect(() => {
    // We don't want too send a event when the app starts
    if (!typed) {
      return;
    }

    // Clear any existing timer whenever input changes
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // Set a new timer for 2.5 seconds
    timeout.current = setTimeout(() => {
      triggerPlausible("Uwuified sentence");
    }, 2500);

    // Clear the timer on unmount or if the input changes
    return () => clearTimeout(timeout.current!);
  }, [input]);

  function handleInput(text: string) {
    setTyped(true);
    setText(text);
  }

  function handleFocus() {
    if (typed) {
      return;
    }

    setText("");
  }

  return (
    <View style={styles.editor}>
      <EditorInput
        value={input}
        onFocus={handleFocus}
        onChange={handleInput}  
      />

      <EditorOutput
        value={uwuifier.uwuifySentence(input)}

        onCopy={() => triggerPlausible("Copied sentence")}
        onShare={() => triggerPlausible("Shared sentence")}
      />
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
