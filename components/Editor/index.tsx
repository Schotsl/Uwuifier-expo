import React from "react";

import Uwuifier from "../../utils/uwuifier";
import plausible from "../../utils/plausible";

import EditorInput from "./Input";
import EditorOutput from "./Output";

import { Keyboard } from "react-native";
import { View, StyleSheet } from "react-native";
import { useState, useRef, useEffect, MutableRefObject } from "react";

type EditorProps = {
  onUwuified: () => void;
};

export default function Editor({ onUwuified }: EditorProps) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState(false);
  const [input, setText] = useState(
    "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground."
  );

  const uwuifier = new Uwuifier();

  // We'll use this over-typed ref to store the timeout
  const timeout: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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

  function handleInput(text: string) {
    setTyped(true);
    setText(text);
  }

  function handleTap() {
    if (visible) {
      setTimeout(() => {
        Keyboard.dismiss();
      }, 250);
    }
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
        onTap={handleTap}
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
