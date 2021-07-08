import React from "react";

import { StyleSheet, Text, View } from "react-native";

interface Props {
  color: string;
  label: string;
  background: string;
}

export const Label = (props: Props) => {
  return (
    <View
      style={[
        styles.header,
        {
          borderTopEndRadius: 6,
          borderTopStartRadius: 6,
          backgroundColor: props.background,
        },
      ]}
    >
      <View style={styles.wrapper}>
        <Text style={[styles.content, { color: props.color }]}>
          {props.label}
        </Text>
        <View
          style={[styles.underline, { backgroundColor: props.color }]}
        >
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  wrapper: {
    height: "100%",
    justifyContent: "center",
  },
  underline: {
    height: 3,
  },
});
