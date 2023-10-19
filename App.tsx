import React from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import globals from "./variables";

import Header from "./components/Header";
import Editor from "./components/Editor";
import plausible from "./utils/plausible";

import { BannerAd } from "react-native-google-mobile-ads";
import { StatusBar } from "expo-status-bar";
import { AdsConsent } from "react-native-google-mobile-ads";

import { RootSiblingParent } from "react-native-root-siblings";
import { useState, useEffect } from "react";
import {
  View,
  Keyboard,
  Platform,
  AppState,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

import * as StoreReview from "expo-store-review";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://08376e96bda4c0bd109533f41aed58a2@o4505897577414656.ingest.sentry.io/4505897580888064",
});

export default function App() {
  const date = Date.now();

  const [size, setSize] = useState("200x300");
  const [last, setLast] = useState(date);
  const [state, setState] = useState(AppState.currentState);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [personal, setPersonal] = useState(0);

  useEffect(() => {
    const { width } = Dimensions.get("window");

    // Subtract 64 from width to account for the padding
    const adWidth = Math.floor(width - 64);
    const adHeight = Math.floor(adWidth / 6);
    const adSize = `${adWidth}x${adHeight}`;

    setSize(adSize);
  }, []);

  useEffect(() => {
    // Offset's can only be generated by writing a sentence so we can increment the personal count
    setPersonal((prevPersonal) => prevPersonal + 1);

    const personalIncreased = personal + 1;

    if (personalIncreased == 25) plausible("Uwuified 25 sentences");
    if (personalIncreased == 50) plausible("Uwuified 50 sentences");
    if (personalIncreased == 100) plausible("Uwuified 100 sentences");
    if (personalIncreased == 250) plausible("Uwuified 250 sentences");
    if (personalIncreased == 500) plausible("Uwuified 500 sentences");
  }, [offset]);

  useEffect(() => {
    if (loading) {
      return;
    }

    const value = JSON.stringify(personal);

    try {
      AsyncStorage.setItem("counter", value);
    } catch (error) {
      console.error("Error saving personal data:", error);
    }
  }, [personal]);

  async function loadPersonal() {
    try {
      const personalRaw = await AsyncStorage.getItem("counter");
      const personalParsed = personalRaw ? JSON.parse(personalRaw) : 0;

      setPersonal(personalParsed);
      setLoading(false);
    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }

  async function loadConsent() {
    await AdsConsent.requestInfoUpdate();
    await AdsConsent.loadAndShowConsentFormIfRequired();
  }

  async function attemptReview() {
    const shownRaw = await AsyncStorage.getItem("shown");
    const shownParsed = shownRaw ? JSON.parse(shownRaw) : false;

    if (personal < 50 || shownParsed) {
      return;
    }

    try {
      AsyncStorage.setItem("shown", JSON.stringify(true));
    } catch (error) {
      console.error("Error saving shown data:", error);
    }

    try {
      await StoreReview.requestReview();
    } catch (error) {
      console.error("Error showing review:", error);
    }
  }

  useEffect(() => {
    loadConsent();
    loadPersonal();

    // Send a generic page view
    plausible();
  }, []);

  useEffect(() => {
    if (loading === false) {
      attemptReview();
    }
  }, [loading]);

  useEffect(() => {
    const current = Date.now();
    const difference = current - last;

    if (state === "background") {
      setLast(current);
    } else if (state === "active") {
      attemptReview();

      // If the app was in the background for more than 30 minutes
      if (difference > 1800000) {
        plausible();
      }
    }
  }, [state]);

  useEffect(() => {
    const listener = AppState.addEventListener("change", (state) =>
      setState(state)
    );

    return () => {
      listener.remove();
    };
  }, []);

  function handleUwuified() {
    setOffset(offset + 1);
  }

  function handleDismiss() {
    Keyboard.dismiss();
  }

  return (
    <RootSiblingParent>
      <StatusBar style="light" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scroll}>
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <View
            style={[
              styles.scroll__body,
              { paddingTop: Constants.statusBarHeight },
            ]}
          >
            <View style={styles.scroll__body__content}>
              <Header offset={offset} personal={personal} />

              <View style={styles.scroll__body__content__ad}>
                <View style={styles.scroll__body__content__ad__wrapper}>
                  <BannerAd
                    size={size}
                    unitId={
                      Platform.OS === "ios"
                        ? "ca-app-pub-4498280233730795/2148935080"
                        : "ca-app-pub-4498280233730795/9069566658"
                    }
                    requestOptions={{
                      keywords: [
                        "uwu",
                        "owo",
                        "cute",
                        "anime",
                        "kawaii",
                        "uwuify",
                        "owoify",
                        "uwuifier",
                        "owoifier",
                        "emoticons",
                      ],
                    }}
                  />
                </View>
                <View style={styles.scroll__body__content__ad__cover}>
                  <ActivityIndicator
                    size={"small"}
                    color={globals.colors.white}
                  />
                </View>
              </View>

              <Editor onUwuified={handleUwuified} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  scroll: {
    minHeight: "100%",

    backgroundColor: globals.colors.background,
  },
  scroll__body: {
    flex: 1,

    backgroundColor: globals.colors.background,
  },
  scroll__body__content: {
    flex: 1,

    gap: globals.spacing.default,
    paddingVertical: globals.spacing.default,
    paddingHorizontal: globals.spacing.default * 2,
  },
  scroll__body__content__ad: {
    overflow: "hidden",
    position: "relative",

    borderRadius: globals.spacing.default / 2,
  },
  scroll__body__content__ad__wrapper: {
    zIndex: 1,
  },
  scroll__body__content__ad__cover: {
    width: "100%",
    height: "100%",
    opacity: 0.75,
    position: "absolute",
    justifyContent: "center",

    backgroundColor: globals.colors.grey,
  },
});
