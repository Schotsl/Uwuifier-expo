import React from 'react';
import supabase from "../../utils/supabase";

import { Image } from 'react-native';
import { useState } from 'react';
import { formatNumber } from '../../helper';
import { useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';

type HeaderProps = {
  offset: number;
}

export default function Header({ offset }: HeaderProps) {
  const [count, setCount] = useState(24956);

  const reference = useRef(offset);

  useEffect(() => {
    reference.current = offset;
  }, [offset]);

  async function subscribeStatistics() {
    supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        table: 'statistics',
        schema: 'public'
      },
      (payload) => {
        setCount(payload.new.uwuified_sentence - reference.current);
      }
    )
    .subscribe()
  }

  async function LoadStatistics() {
    const { data } = await supabase
      .from('statistics')
      .select('uwuified_sentence')
      .single();

    setCount(data?.uwuified_sentence);
  }

  useEffect(() => {
    LoadStatistics();
    subscribeStatistics();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.header__emoji}> 
        <Image source={require('../../assets/emojis/pleading-face.png')} style={{width: 42 , height: 42 }}></Image>
        <Image source={require('../../assets/emojis/backhand-index-pointing-right.png')} style={{width: 42 , height: 42 }}></Image>  
        <Image source={require('../../assets/emojis/backhand-index-pointing-left.png')} style={{width: 42 , height: 42 }}></Image>
      </View>
      
      <Text style={styles.header__title}>
        This month we've 
        <Text style={styles.header__title__bold}> uwuified </Text> 
        over <Text>{formatNumber(count + offset)}</Text> sentences!
      </Text>

      <Text style={styles.header__subtitle}>
        And you're the one to blame for that!
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
    flexDirection: 'row',
  },
  header__title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "400",
  },
  header__title__bold: {
    fontWeight: "700",
  },
  header__subtitle: {
    color: "#ffffff",
    opacity: 0.5,
    fontSize: 22,
    fontWeight: "700",
  },
});
