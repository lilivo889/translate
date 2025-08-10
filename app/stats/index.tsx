import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '../../store/useAppStore';

/**
 * Stats screen: displays high‑level statistics about the user's study
 * habits such as total XP and streak.  This can later be expanded to
 * include charts and historical data.
 */
export default function StatsScreen() {
  const { xp, streak } = useAppStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Stats</Text>
      <Text style={styles.stat}>Total XP: {xp}</Text>
      <Text style={styles.stat}>Current Streak: {streak} days</Text>
      <Text style={styles.note}>More detailed charts coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  stat: {
    fontSize: 18,
    marginBottom: 12,
  },
  note: {
    fontSize: 14,
    color: '#888',
    marginTop: 12,
  },
});