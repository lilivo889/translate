import * as SQLite from 'expo-sqlite';

/**
 * Types for spaced repetition items.  Each item corresponds to a vocabulary
 * entry that is due for review along with its translation.  In a more
 * advanced implementation additional metadata (interval, ease, attempts)
 * would be included here.
 */
export interface ReviewItem {
  id: number;
  phrase: string;
  translation: string;
}

/**
 * Return a small list of vocabulary items that are due for review.  This
 * implementation simply selects the first five entries from the vocab
 * table.  Replace this with a true SM‑2 or Leitner scheduling algorithm
 * by reading from the `spaced_reviews` table.
 */
export async function getDueReviews(limit: number = 5): Promise<ReviewItem[]> {
  const db = SQLite.openDatabase('translate.db');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT id, phrase, translation FROM vocab LIMIT ?;',
        [limit],
        (_, { rows }) => {
          const arr = (rows as any)._array as ReviewItem[];
          resolve(arr);
        },
      );
    }, (err) => reject(err));
  });
}

/**
 * Mark a review as correct.  This stub does not update any scheduling
 * information.  In a complete implementation you would update the
 * `spaced_reviews` table and recompute the next due date.
 */
export async function markReviewCorrect(id: number): Promise<void> {
  // No‑op stub.  Extend this to update spaced_reviews entries.
  return Promise.resolve();
}