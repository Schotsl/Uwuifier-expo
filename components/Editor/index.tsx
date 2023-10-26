import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import { View, StyleSheet } from "react-native";

import EditorButtons from "./Buttons";
import EditorInput from "./Input";
import EditorOutput from "./Output";
import plausible from "../../utils/plausible";
import Uwuifier from "../../utils/uwuifier";
import globals from "../../variables";

type EditorProps = {
  onUwuified: () => void;
};

export default function Editor({ onUwuified }: EditorProps) {
  const [output, setOutput] = useState("");
  const [typed, setTyped] = useState(false);
  const [input, setText] = useState(
    "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground.",
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
      // Only increase the counter if the input is not empty
      const inputTrimmed = input.trim();
      const inputLength = inputTrimmed.length;

      if (inputLength > 0) {
        onUwuified();

        plausible("Uwuified sentence");
      }
    }, 1000);

    // Clear the timer on unmount or if the input changes
    return () => clearTimeout(timeout.current!);
  }, [input]);

  useEffect(() => {
    const uwuified = uwuifier.uwuifySentence(input);

    setOutput(uwuified);
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
      <EditorInput value={input} onFocus={handleFocus} onChange={handleInput} />

      <EditorOutput value={output} />

      <EditorButtons
        value={output}
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

    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,

    marginTop: globals.spacing.default / 2,
    borderRadius: globals.radius,
    backgroundColor: globals.colors.yellow,
    marginHorizontal: -globals.spacing.default,
  },
});
