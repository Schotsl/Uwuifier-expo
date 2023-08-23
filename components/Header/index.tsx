import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.header__emoji}>🥺👉👈</Text>
      
      <Text style={styles.header__title}>
        This month we've 
        <Text style={styles.header__title__bold}> uwuified </Text> 
        over 29,049 sentences!
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
    fontSize: 32,
  },
  header__title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "400",
  },
  header__title__bold: {
    fontWeight: "700",
  },
  header__subtitle: {
    color: "#ffffff",
    opacity: 0.5,
    fontSize: 24,
    fontWeight: "700",
  },
});
