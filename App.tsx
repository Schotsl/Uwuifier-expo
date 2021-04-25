import Uwuifier from "uwuifier";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, TextInput, View, Text } from "react-native";

export default function App() {
  const [input, setText] = useState(
    "Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do."
  );
  const uwuifier = new Uwuifier();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.body}>
        <View style={styles.inputs}>
          <View
            style={[
              styles.header,
              {
                borderTopEndRadius: 6,
                borderTopStartRadius: 6,
                backgroundColor: "#252525",
              },
            ]}
          >
            <View style={styles.wrapper}>
              <Text style={[styles.content, { color: "#ffffff" }]}>Input</Text>
              <View
                style={[styles.underline, { backgroundColor: "#ffffff" }]}
              ></View>
            </View>
          </View>

          <View style={[styles.input, { backgroundColor: "#252525" }]}>
            <TextInput
              style={[ styles.input, { color: "#ffffff" }]}
              placeholder="Type something"
              placeholderTextColor="grey"
              onChangeText={(text) => setText(text)}
              multiline={true}
              value={input}
            />
          </View>

          <View style={[styles.header, { backgroundColor: "#ffc83d" }]}>
            <View style={styles.wrapper}>
              <Text style={[styles.content, { color: "#000000" }]}>Output</Text>
              <View
                style={[styles.underline, { backgroundColor: "#000000" }]}
              ></View>
            </View>
          </View>

          <View
            style={[
              styles.input,
              {
                backgroundColor: "#ffc83d",
                borderBottomStartRadius: 6,
                borderBottomEndRadius: 6,
              },
            ]}
          >
            <TextInput
              style={[ styles.input, { color: "#000000" }]}
              placeholder="Read something"
              placeholderTextColor="grey"
              multiline={true}
              editable={false}
              value={uwuifier.uwuifySentence(input)}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: "#303030",
  },
  inputs: {
    height: "100%",
    padding: 20,
  },
  header: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "100%",
    display: "flex",
    fontWeight: "600",
    alignItems: "center",
    textAlignVertical: "center",
  },
  underline: {
    height: 3,
  },
  wrapper: {
    height: "100%",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
});
