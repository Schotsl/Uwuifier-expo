import React from "react";

import EditorLabel from "../Label";

import { View, TextInput, StyleSheet } from "react-native";

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
  return (
    <View style={styles.input}>
      <EditorLabel color="#fff" background="#252525" label="Input" />

      <TextInput
        style={styles.input__wrapper__element}
        value={value}
        multiline={true}
        onFocus={onFocus}
        placeholder="Type something here..."
        onChangeText={onChange}
        textAlignVertical="top"
        placeholderTextColor="grey"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: "#252525",
  },
  input__wrapper__element: {
    flex: 1,
    minHeight: 125,
    color: "#ffffff",
    fontSize: 17,
    marginVertical: 16,
    paddingHorizontal: 20,
  },
});
