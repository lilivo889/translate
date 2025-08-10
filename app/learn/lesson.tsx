import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/ui/Button';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

/**
 * Lesson screen: runs the daily lesson flow.  This scaffold cycles through
 * three simple phases: vocabulary drill, pattern practice and speaking.
 * Each phase displays a message and a button to proceed to the next phase.
 */
const phases = ['Vocabulary Drill', 'Pattern Practice', 'Speaking Session'] as const;
type Phase = typeof phases[number];

export default function LessonScreen() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const currentPhase: Phase = phases[index];
  const { addXp } = useAppStore();

  const handleNext = () => {
    if (index < phases.length - 1) {
      setIndex(index + 1);
    } else {
      // Award some XP for completing the lesson
      addXp(10);
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentPhase}</Text>
      <Text style={styles.description}>
        {index === 0 && 'Practice your vocabulary with flashcards.'}
        {index === 1 && 'Practice building sentences and patterns.'}
        {index === 2 && 'Have a conversation with your AI tutor.'}
      </Text>
      <Button
        title={index < phases.length - 1 ? 'Continue' : 'Finish Lesson'}
        onPress={handleNext}
      />
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});