import React from "react";

import EditorLabel from "../Label";

import { View, TextInput, StyleSheet } from "react-native";

type EditorInputProps = {
  value: string;
  onChange: (text: string) => void;
};

export default function EditorInput({
  value,
  onChange,
}: EditorInputProps) {
  return (
    <View>
      <EditorLabel color="#fff" background="#252525" label="Input" />

      <View style={styles.input}>
        <TextInput
          style={styles.input__element}
          value={value}
          multiline={true}
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
  input__element: {
    color: "#ffffff",
    height: 200,
    marginVertical: 16,
    paddingHorizontal: 24,
  },
});
