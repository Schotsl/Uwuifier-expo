import React from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "./components/Header";
import Editor from "./components/Editor";
import plausible from "./utils/plausible";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { useState, useEffect } from "react";

import * as StoreReview from "expo-store-review";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://acadd9a0860971ccb67c8b0b06552cc6@o4505897577414656.ingest.sentry.io/4505897580888064",
});

export default function App() {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [personal, setPersonal] = useState(0);

  useEffect(() => {
    // Offset's can only be generated by writing a sentence so we can increment the personal count
    setPersonal((prevPersonal) => prevPersonal + 1);

    if (personal == 50) plausible("Uwuified 50 sentences");
    if (personal == 100) plausible("Uwuified 100 sentences");
    if (personal == 250) plausible("Uwuified 250 sentences");
    if (personal == 500) plausible("Uwuified 500 sentences");
  }, [offset]);

  useEffect(() => {
    if (loading) {
      return;
    }

    const value = JSON.stringify(personal);

    try {
      AsyncStorage.setItem("personal", value);
    } catch (error) {
      console.error("Error saving personal data:", error);
    }
  }, [personal]);

  async function loadPersonal() {
    try {
      const rawPersonal = await AsyncStorage.getItem("personal");
      const rawShown = await AsyncStorage.getItem("shown");

      const parsedPersonal = rawPersonal ? JSON.parse(rawPersonal) : 0;
      const parsedShown = rawShown ? JSON.parse(rawShown) : false;

      setPersonal(parsedPersonal);
      setLoading(false);

      if (parsedPersonal < 100 || parsedShown) {
        return;
      }

      // Prevent the popup from showing again
      AsyncStorage.setItem("shown", JSON.stringify(true));

      showReview();
    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }

  async function showReview() {
    try {
      await StoreReview.requestReview();
    } catch (error) {
      console.error("Error showing review:", error);
    }
  }

  useEffect(() => {
    // Load the personal counter
    loadPersonal();

    // Send a generic page view
    plausible();
  }, []);

  function handleUwuified() {
    setOffset(offset + 1);
  }

  return (
    <RootSiblingParent>
      <StatusBar style="light" />

      <View style={[styles.body, { paddingTop: Constants.statusBarHeight }]}>
        <View style={styles.body__content}>
          <Header offset={offset} personal={personal} />

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
