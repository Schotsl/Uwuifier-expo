import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  AppState,
  ActivityIndicator,
} from "react-native";
import Uwuifier from "uwuifier";

import { formatNumber } from "../../helper";
import supabase from "../../utils/supabase";
import globals from "../../variables";

type HeaderProps = {
  offset: number;
  personal: number;
};

export default function Header({ offset, personal }: HeaderProps) {
  const uwuifier = new Uwuifier();

  const [count, setCount] = useState(24956);
  const [state, setState] = useState(AppState.currentState);
  const [loading, setLoading] = useState(true);

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

      if (!data) {
        return;
      }

      setCount(data.uwuified_sentence);
      setLoading(false);
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
        />
        <Image
          source={require("../../assets/emojis/backhand-index-pointing-right.png")}
          style={{ width: 42, height: 42 }}
        />
        <Image
          source={require("../../assets/emojis/backhand-index-pointing-left.png")}
          style={{ width: 42, height: 42 }}
        />
      </View>

      <Text style={styles.header__title}>
        This month we've
        <Text style={styles.header__title__bold}> uwuified </Text>
        over {/* If loading is true show indicator, otherwise show text */}
        {loading ? (
          <View style={styles.header__title__bold__loader}>
            <ActivityIndicator size="small" color={globals.colors.white} />
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
    marginBottom: 4,

    gap: globals.spacing.default,
  },
  header__emoji: {
    flexDirection: "row",

    gap: globals.spacing.default / 2,
  },
  header__title: {
    fontWeight: "400",

    color: globals.colors.white,
    fontSize: globals.font.title,
  },
  header__title__bold: {
    fontWeight: "700",
  },
  header__title__bold__loader: {
    paddingHorizontal: globals.spacing.default,
  },
  header__subtitle: {
    opacity: 0.5,
    fontWeight: "700",

    color: globals.colors.white,
    fontSize: globals.font.subtitle,
  },
  header__subtitle__bold: {
    fontWeight: "900",
  },
});
