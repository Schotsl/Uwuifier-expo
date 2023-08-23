import React from 'react';

import EditorLabel from '../Label';
import EditorOutputButtons from './Buttons';

import { ScrollView, StyleSheet, View, Text } from 'react-native';

type EditorOutputProps = {
  value: string;
  onCopy: () => void;
  onShare: () => void;
}

export default function EditorOutput({ value, onCopy, onShare }: EditorOutputProps) {
  return (
    <View>
      <EditorLabel color="#252525" background="#ffc83d" label="Output" />

      <View style={styles.output}>
        <ScrollView style={styles.output__text}>
          <Text>
            { value }
          </Text>
        </ScrollView>
        
        <EditorOutputButtons
          value={value} 
          onCopy={onCopy}
          onShare={onShare}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  output: {
    paddingHorizontal: 24,
    backgroundColor: "#ffc83d"
  },
  output__text: {
    color: "#252525",
    height: 200,
    fontSize: 16,
    marginVertical: 16,
  },
});