import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/ui/Button';
import { useRouter } from 'expo-router';

/**
 * The Learn screen displays available lessons.  For this initial version
 * there is only a single lesson which corresponds to today's lesson.
 */
export default function LearnScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lessons</Text>
      <Button title="Start Today's Lesson" onPress={() => router.push('/learn/lesson')} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});