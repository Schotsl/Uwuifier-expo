import React, { useState } from 'react';
import Uwuifier from 'uwuifier';
import { StyleSheet, SafeAreaView, TextInput } from 'react-native';

export default function App() {
  const [input, setText] = useState("Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do.");
  const uwuifier = new Uwuifier();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
      style={styles.textArea}
      placeholder="Type something"
      placeholderTextColor="grey"
      onChangeText={text => setText(text)}
      multiline={true}
      value={input}
    />
      <TextInput
      style={styles.textArea}
      placeholder="Read something"
      placeholderTextColor="grey"
      multiline={true}
      editable={false}
      value={uwuifier.uwuifySentence(input)}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textArea: {
    flex: 1,
    margin: 25,
    padding: 15,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'grey',
  },
});
