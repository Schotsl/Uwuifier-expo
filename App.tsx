import React from "react";

import Header from "./components/Header";
import Editor from "./components/Editor";

import { StatusBar } from "expo-status-bar";
import { triggerPlausible } from "./helper";
import { RootSiblingParent } from 'react-native-root-siblings';
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  triggerPlausible();

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <StatusBar style="light" />

        <SafeAreaView style={styles.body}>
          <ScrollView>
            <View style={styles.body__content}>
              <Header />

              <Editor />
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
