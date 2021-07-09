import Uwuifier from "uwuifier";

import { Label } from "./components/Label.tsx";
import { Header } from "./components/Header.tsx";
import { Inputs } from "./components/Inputs.tsx";

import React, { useState } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const uwuifier = new Uwuifier();

export default function App() {
  const [input, setText] = useState(
    "Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do.",
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.body}>
        <Header />

        <View style={styles.inputs}>
          <Label
            color="#fff"
            background="#252525"
            label="Input"
            radius={true}
          />

          <View style={[styles.input, { backgroundColor: "#252525" }]}>
            <TextInput
              style={[styles.input, { color: "#ffffff" }]}
              placeholder="Type something"
              placeholderTextColor="grey"
              onChangeText={(text: string) => setText(text)}
              multiline={true}
              value={input}
            />
          </View>

          <Label
            color="#252525"
            background="#ffc83d"
            label="Output"
            radius={false}
          />

          <View
            style={[
              styles.input,
              {
                backgroundColor: "#ffc83d",
                borderBottomEndRadius: 6,
                borderBottomStartRadius: 6,
              },
            ]}
          >
            <ScrollView>
              <Text style={[styles.input, { color: "#000000" }]}>
                {uwuifier.uwuifySentence(input)}
              </Text>
            </ScrollView>

            <Inputs uwuified={uwuifier.uwuifySentence(input)} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    display: "flex",
    backgroundColor: "#303030",
  },
  inputs: {
    flex: 1,
    margin: 20,
    shadowColor: "black",
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
});
