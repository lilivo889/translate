import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getDueReviews, markReviewCorrect } from '../../lib/spaced';
import Button from '../../components/ui/Button';

interface ReviewItem {
  id: number;
  phrase: string;
  translation: string;
}

/**
 * Review screen: displays vocabulary items that are due for review based on
 * spaced repetition scheduling.  Tapping an item reveals its translation.
 */
export default function ReviewScreen() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Load due items on mount.  In a real app this would query the DB.
    getDueReviews().then(setItems).catch(console.error);
  }, []);

  const handleReveal = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCorrect = (id: number) => {
    markReviewCorrect(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>No reviews due right now. Great job!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleReveal(item.id)}
            style={styles.card}
          >
            <Text style={styles.phrase}>{item.phrase}</Text>
            {revealed[item.id] && <Text style={styles.translation}>{item.translation}</Text>}
            {revealed[item.id] && (
              <Button title="I got it right" onPress={() => handleCorrect(item.id)} />
            )}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  phrase: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  translation: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});