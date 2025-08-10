import React from 'react';
import { Tabs } from 'expo-router';

/**
 * The root layout defines the tab structure for the application.
 * Each tab corresponds to one of the major sections of the app:
 * Today, Learn, Speak, Review and Stats.
 */
export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }} initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{ title: 'Today' }}
      />
      <Tabs.Screen
        name="learn/index"
        options={{ title: 'Learn' }}
      />
      <Tabs.Screen
        name="learn/lesson"
        options={{ title: 'Lesson' }}
      />
      <Tabs.Screen
        name="speak/index"
        options={{ title: 'Speak' }}
      />
      <Tabs.Screen
        name="review/index"
        options={{ title: 'Review' }}
      />
      <Tabs.Screen
        name="stats/index"
        options={{ title: 'Stats' }}
      />
    </Tabs>
  );
}