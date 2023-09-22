import React from "react";

import EditorLabel from "../Label";

import { useRef, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

type EditorInputProps = {
  value: string;
  onFocus: () => void;
  onChange: (text: string) => void;
};

export default function EditorInput({
  value,
  onFocus,
  onChange,
}: EditorInputProps) {
  const input = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleWrapperPress = () => {
    if (!input.current) {
      return;
    }

    if (focused) {
      input.current.blur();
    } else {
      input.current.focus();
    }
  };

  const handleInputFocus = () => {
    setFocused(true);

    onFocus();
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.input}>
      <EditorLabel color="#fff" background="#252525" label="Input" />

      <TouchableOpacity
        style={styles.input__wrapper}
        onPress={handleWrapperPress}
        activeOpacity={1}
      >
        <TextInput
          ref={input}
          style={styles.input__wrapper__element}
          value={value}
          multiline={true}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onChangeText={onChange}
          placeholder="Type something here..."
          textAlignVertical="top"
          placeholderTextColor="grey"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: "#252525",
  },
  input__wrapper: {
    flex: 1,
    height: 150,
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  input__wrapper__element: {
    color: "#ffffff",
    fontSize: 17,
  },
});
