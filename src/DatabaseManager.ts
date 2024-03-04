import * as SQLite from 'expo-sqlite';

const DB_NAME = 'testStuck.db';

let db: SQLite.SQLiteDatabase | null;

export function getDatabase() {
  if (!db) {
    db = SQLite.openDatabase(DB_NAME);
  }
  return db;
}
