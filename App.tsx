import React from "react";
import Constants from "expo-constants";

import Header from "./components/Header";
import Editor from "./components/Editor";

import plausible from "./utils/plausible";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import { ScrollView, StyleSheet, View } from "react-native";

import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://acadd9a0860971ccb67c8b0b06552cc6@o4505897577414656.ingest.sentry.io/4505897580888064",
});

export default function App() {
  const [offset, setOffset] = useState(0);

  plausible();

  function handleUwuified() {
    setOffset(offset + 1);
  }

  return (
    <RootSiblingParent>
      <StatusBar style="light" />

      <View style={[styles.body, { paddingTop: Constants.statusBarHeight }]}>
        <View style={styles.body__content}>
          <Header offset={offset} />

          <Editor onUwuified={handleUwuified} />
        </View>
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#303030",
  },
  body__content: {
    gap: 16,
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
