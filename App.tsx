import React from "react";

import Header from "./components/Header";
import Editor from "./components/Editor";

import plausible from "./utils/plausible";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";


export default function App() {
  const [offset, setOffset] = useState(0);

  plausible();

  function handleUwuified() {
    setOffset(offset + 1);
  }

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <StatusBar style="light" />

        <SafeAreaView style={styles.body}>
          <ScrollView>
            <View style={styles.body__content}>
              <Header offset={offset} />

              <Editor onUwuified={handleUwuified} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#303030",
  },
  body__content: {
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
