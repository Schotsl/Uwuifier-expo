import Uwuifier from "uwuifier";
import Clipboard from "expo-clipboard";

import Svg, { Path } from "react-native-svg";
import React, { useState } from "react";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  Text,
  View,
  Share,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
} from "react-native";

export default function App() {
  const [input, setText] = useState(
    "Hey! This site can help you make any old boring text nice and uwu. We can't imagine anyone would actually use this, but you gotta do what you gotta do."
  );
  const uwuifier = new Uwuifier();

  const copyText = () => {
    const uwuified = uwuifier.uwuifySentence(input);
    Clipboard.setString(uwuified);
    ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
  };

  const shareText = () => {
    const uwuified = uwuifier.uwuifySentence(input);
    Share.share({ message: uwuified });
  };

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
              style={[styles.input, { color: "#ffffff" }]}
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
            <ScrollView>
              <Text style={[styles.input, { color: "#000000" }]}>
                {uwuifier.uwuifySentence(input)}
              </Text>
            </ScrollView>

            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, { marginRight: 10 }]}
                onPress={shareText}
              >
                <Svg
                  style={styles.svg}
                  width="25"
                  height="36"
                  viewBox="0 0 25 36"
                >
                  <Path
                    fill="white"
                    fillRule="evenodd"
                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                  />
                </Svg>
              </Pressable>

              <Pressable
                style={[styles.button, { flex: 1 }]}
                onPress={copyText}
              >
                <Svg
                  style={styles.svg}
                  width="25"
                  height="36"
                  viewBox="0 0 25 36"
                >
                  <Path
                    fill="white"
                    fillRule="evenodd"
                    d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                  />
                </Svg>
                <Text style={[styles.text]}>Copy to clipboard</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    padding: 20,
    backgroundColor: "#303030",
  },
  inputs: {
    height: "100%",
  },
  header: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "100%",
    display: "flex",
    fontWeight: "bold",
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
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  buttons: {
    height: 45,
    display: "flex",
    marginTop: 10,
    marginBottom: 0,
    flexDirection: "row",
  },
  button: {
    display: "flex",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#252525",
  },
  text: {
    color: "#ffffff",
    display: "flex",
    fontSize: 16,
    marginTop: -2,
    flexDirection: "column",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  svg: {
    margin: 10,
  },
});
