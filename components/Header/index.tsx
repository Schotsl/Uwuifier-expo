import React from "react";
import supabase from "../../utils/supabase";
import Uwuifier from "../../utils/uwuifier";

import { Image } from "react-native";
import { useState } from "react";
import { formatNumber } from "../../helper";
import { useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  AppState,
  ActivityIndicator,
} from "react-native";

type HeaderProps = {
  offset: number;
  personal: number;
};

export default function Header({ offset, personal }: HeaderProps) {
  const uwuifier = new Uwuifier();

  const [state, setState] = useState(AppState.currentState);
  const [count, setCount] = useState(24956);

  const [loadingStatistics, setLoadingStatistics] = useState(true);

  const startSentence = uwuifier.uwuifySentence("And ");
  const endSentence = uwuifier.uwuifySentence(" of those were your fault!");

  const reference = useRef(offset);

  useEffect(() => {
    // Adjust the offset to prevent double counting
    reference.current = offset;
  }, [offset]);

  async function subscribeStatistics() {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          table: "statistics",
          schema: "public",
        },
        (payload) => {
          setCount(payload.new.uwuified_sentence - reference.current);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }

  async function LoadStatistics() {
    try {
      const { data } = await supabase
        .from("statistics")
        .select("uwuified_sentence")
        .single();

      setCount(data?.uwuified_sentence);
      setLoadingStatistics(false);
    } catch (error) {
      console.error("Error loading statistics:", error);
    }
  }

  useEffect(() => {
    LoadStatistics();
    subscribeStatistics();
  }, []);

  useEffect(() => {
    if (state === "active") {
      subscribeStatistics();
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

  return (
    <View style={styles.header}>
      <View style={styles.header__emoji}>
        <Image
          source={require("../../assets/emojis/pleading-face.png")}
          style={{ width: 42, height: 42 }}
        ></Image>
        <Image
          source={require("../../assets/emojis/backhand-index-pointing-right.png")}
          style={{ width: 42, height: 42 }}
        ></Image>
        <Image
          source={require("../../assets/emojis/backhand-index-pointing-left.png")}
          style={{ width: 42, height: 42 }}
        ></Image>
      </View>

      <Text style={styles.header__title}>
        This month we've
        <Text style={styles.header__title__bold}> uwuified </Text>
        over {/* If loading is true show indicator, otherwise show text */}
        {loadingStatistics ? (
          <View style={styles.header__title__bold__loader}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        ) : (
          <Text>{formatNumber(count + offset)}</Text>
        )}{" "}
        sentences!
      </Text>

      <Text style={styles.header__subtitle}>
        {startSentence}
        <Text style={styles.header__subtitle__bold}>
          {formatNumber(personal)}
        </Text>
        {endSentence}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 16,
  },
  header__emoji: {
    gap: 8,
    flexDirection: "row",
  },
  header__title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "400",
  },
  header__title__bold: {
    fontWeight: "700",
  },
  header__title__bold__loader: {
    paddingHorizontal: 16,
  },
  header__subtitle: {
    color: "#ffffff",
    opacity: 0.5,
    fontSize: 22,
    fontWeight: "700",
  },
  header__subtitle__bold: {
    fontWeight: "900",
  },
});
