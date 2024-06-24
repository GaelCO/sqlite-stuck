import {SQLTransaction} from 'expo-sqlite/legacy';
import {getDatabase} from './DatabaseManager';
import {CREATE_TABLE_STUCK, upsertStuck} from "./StuckDao";
import {storeDbVersion} from "./AsyncStorageHelper";

export const DB_VERSION = 1;

export const createOrUpdateDatabase = (oldVersion: number | null) => {
  const db = getDatabase();
  db.transaction(
    tx => {
      if (oldVersion == null) {
        // create db if db does not exist
        createInitialDatabase(tx);
        initFakeData(tx);
      }
    },
    undefined,
    async () => {
      await storeDbVersion(DB_VERSION);
    },
  );
}

const createInitialDatabase = (tx: SQLTransaction) => {
  // locations
  tx.executeSql(CREATE_TABLE_STUCK);
}

const initFakeData = (tx: SQLTransaction) => {
  // locations
  for (let i = 0; i <= 50000; i++) {
    upsertStuck(tx, i, 'fakeName' + i.toString(), 'fakeCode', 0.121545151515815, -45454.121515112)
  }
}

