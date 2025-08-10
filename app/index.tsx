import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/ui/Button';
import { useAppStore } from '../store/useAppStore';
import { initDb } from '../lib/db';

/**
 * Today screen: shows a summary of the user's progress and
 * provides quick access to their next lesson or speaking session.
 */
export default function TodayScreen() {
  const router = useRouter();
  const { xp, streak } = useAppStore();

  // Initialise the database on first mount.  This will create tables and
  // import seed data if necessary.  In a real app you might move this to
  // a higher level so it runs only once.
  useEffect(() => {
    initDb().catch((err) => console.warn('DB initialisation failed', err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>XP: {xp} | Streak: {streak} days</Text>
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button title="Start Lesson" onPress={() => router.push('/learn/lesson')} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Start Speaking" onPress={() => router.push('/speak')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
  },
  buttonWrapper: {
    marginBottom: 12,
  },
});