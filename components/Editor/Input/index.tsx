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

      <View style={styles.input__wrapper}>
        <TextInput
          style={styles.input__wrapper__element}
          value={value}
          multiline={true}
          onFocus={onFocus}
          onChangeText={onChange}
          placeholderTextColor="grey"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#252525",
  },
  input__wrapper__element: {
    color: "#ffffff",
    height: 225,
    fontSize: 17,
    marginVertical: 16,
    paddingHorizontal: 20,
  },
});
