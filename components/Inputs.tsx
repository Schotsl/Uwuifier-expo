import * as Clipboard from 'expo-clipboard';
import React from "react";

import Svg, { Path } from "react-native-svg";

import {
  Pressable,
  Share,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";

const copyText = (message: string) => {
  Clipboard.setString(message);
  ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
};

const shareText = (message: string) => {
  Share.share({ message });
};

interface Props {
  uwuified: string;
}

export const Inputs = (props: Props) => {
  return (
    <View style={styles.buttons}>
      <Pressable
        style={[styles.button, { marginRight: 10 }]}
        onPress={() => shareText(props.uwuified)}
      >
        <Svg
          style={[styles.svg, { marginLeft: 14, marginRight: 12 }]}
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <Path
            fill="white"
            fillRule="evenodd"
            d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
          />
        </Svg>
      </Pressable>

      <Pressable
        style={[styles.button, { flex: 1 }]}
        onPress={() => copyText(props.uwuified)}
      >
        <Svg style={[styles.svg]} width="18" height="18" viewBox="0 0 24 24">
          <Path
            fill="white"
            fillRule="evenodd"
            d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"
          />
        </Svg>
        <View style={[styles.divider]}></View>
        <Text style={[styles.text]}>Copy to clipboard</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    height: 45,
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
  },
  button: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",

    borderRadius: 5,
    backgroundColor: "#252525",

    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    color: "#ffffff",
    fontSize: 16,
    textAlignVertical: "center",
  },
  divider: {
    width: 1,
    margin: 10,
    height: 18,

    marginLeft: 0,
    backgroundColor: "#fff",
  },
  svg: {
    margin: 13,
  },
});
