import * as Clipboard from "expo-clipboard";

import Svg from "react-native-svg";
import React from "react";
import Toast from 'react-native-root-toast'

import { Path } from "react-native-svg";
import {
  Text,
  View,
  Share,
  Pressable,
  StyleSheet,
} from "react-native";

interface Props {
  value: string;
  onCopy: () => void;
  onShare: () => void;
}

export default function OutputActions({ value, onCopy, onShare }: Props) {
  async function copyText(message: string) {
    await Clipboard.setStringAsync(message);

    // Since iOS has no support for Toast we'll use a generic Toast library
    Toast.show('Copied to clipboard.', {
      duration: Toast.durations.SHORT,
    });

    onCopy();
  }

  function shareText(message: string) {
    Share.share({ message });

    onShare();
  }

  return (
    <View style={styles.buttons}>
      <Pressable style={styles.buttons__button} onPress={() => shareText(value)}>
        <Svg width="18" height="18" viewBox="0 0 24 24">
          <Path fill="white" fillRule="evenodd" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
        </Svg>
      </Pressable>

      <Pressable style={styles.buttons__button} onPress={() => copyText(value)}>
        <Svg width="18" height="18" viewBox="0 0 24 24">
          <Path fill="white" fillRule="evenodd" d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" />
        </Svg>

        <Text style={styles.buttons__button__text}>Copy text</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    paddingBottom: 24,
  },
  buttons__button: {
    gap: 16,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    backgroundColor: "#252525",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    marginRight: 10,
  },
  buttons__button__text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
