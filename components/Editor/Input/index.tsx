import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

import globals from "../../../variables";
import EditorLabel from "../Label";

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

    const element = input.current as HTMLElement;

    if (focused) {
      element.blur();
    } else {
      element.focus();
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
      <EditorLabel
        color={globals.colors.white}
        background={globals.colors.grey}
        label="Input"
      />

      <TouchableOpacity
        style={styles.input__wrapper}
        onPress={handleWrapperPress}
        activeOpacity={1}
      >
        <TextInput
          ref={input}
          style={styles.input__wrapper__element}
          value={value}
          multiline
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

    backgroundColor: globals.colors.grey,
  },
  input__wrapper: {
    flex: 1,
    height: 150,

    marginVertical: globals.spacing.default,
    paddingHorizontal: globals.spacing.editor.horizontal,
  },
  input__wrapper__element: {
    color: globals.colors.white,
    fontSize: globals.font.body,
  },
});
