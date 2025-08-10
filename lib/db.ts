import * as SQLite from 'expo-sqlite';
import phrases from '../assets/seed/phrases.json';

/**
 * A typed wrapper around SQLite for managing user profiles, vocabulary and
 * session data.  Tables are created on first initialisation and seed
 * phrases are imported automatically.  All functions return Promises
 * for ease of use with async/await.
 */

const DB_NAME = 'translate.db';

/** Open or create the database.  SQLite automatically creates the file if it
 * does not exist.  On web this uses an in‑memory database.
 */
function getDb() {
  return SQLite.openDatabase(DB_NAME);
}

/** Initialise the database: create tables if they do not exist and seed
 * initial data.  Subsequent calls will be fast no‑ops.  Returns a
 * promise that resolves when initialisation completes.
 */
export async function initDb(): Promise<void> {
  const db = getDb();
  await new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      // Create tables
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS user_profile (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          native_lang TEXT,
          target_lang TEXT,
          goal TEXT,
          created_at TEXT
        );`,
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS vocab (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phrase TEXT,
          translation TEXT,
          ipa TEXT,
          tag TEXT,
          added_at TEXT
        );`,
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS spaced_reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          vocab_id INTEGER,
          due_at INTEGER,
          interval INTEGER,
          ease REAL,
          attempts INTEGER,
          correct INTEGER
        );`,
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT,
          started_at INTEGER,
          ended_at INTEGER,
          xp_gained INTEGER
        );`,
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS transcripts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id INTEGER,
          speaker TEXT,
          text TEXT,
          timestamp_ms INTEGER
        );`,
      );
      // Check if vocab table already has entries
      tx.executeSql(
        'SELECT COUNT(*) as count FROM vocab;',
        [],
        (_, { rows }) => {
          const count = (rows as any)._array[0].count as number;
          if (count === 0) {
            // Seed phrases
            phrases.forEach((phrase) => {
              tx.executeSql(
                'INSERT INTO vocab (phrase, translation, ipa, tag, added_at) VALUES (?, ?, ?, ?, ?);',
                [
                  phrase.phrase,
                  phrase.translation,
                  phrase.ipa,
                  phrase.tag,
                  new Date().toISOString(),
                ],
              );
            });
          }
        },
      );
    }, (err) => reject(err), () => resolve());
  });
}

export interface UserProfile {
  id: number;
  native_lang: string;
  target_lang: string;
  goal: string;
  created_at: string;
}

/** Save a user profile to the database.  Returns the inserted ID. */
export async function saveUserProfile(profile: Omit<UserProfile, 'id'>): Promise<number> {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO user_profile (native_lang, target_lang, goal, created_at) VALUES (?, ?, ?, ?);',
        [profile.native_lang, profile.target_lang, profile.goal, profile.created_at],
        (_, result) => resolve(result.insertId as number),
      );
    }, (err) => reject(err));
  });
}

/** Retrieve the most recently created user profile. */
export async function getUserProfile(): Promise<UserProfile | null> {
  const db = getDb();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user_profile ORDER BY id DESC LIMIT 1;',
        [],
        (_, { rows }) => {
          const arr = (rows as any)._array as UserProfile[];
          resolve(arr[0] ?? null);
        },
      );
    }, (err) => reject(err));
  });
}