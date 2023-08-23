import React from "react";

import Uwuifier from "../../utils/uwuifier";
import plausible from "../../utils/plausible";

import EditorInput from "./Input";
import EditorOutput from "./Output";

import { View, StyleSheet } from "react-native";
import { useState, useRef, useEffect,MutableRefObject } from "react";

type EditorProps = {
  onUwuified: () => void;
};

export default function Editor({ onUwuified }: EditorProps) {
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

    // Set a new timer for 1 second
    timeout.current = setTimeout(() => {
      onUwuified();

      plausible("Uwuified sentence");
    }, 1000);

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

        onCopy={() => plausible("Copied sentence")}
        onShare={() => plausible("Shared sentence")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#ffc83d",

    marginTop: 12,
    marginHorizontal: -16,
    borderRadius: 32,

    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
});
