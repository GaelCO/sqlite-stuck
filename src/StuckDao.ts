import {SQLTransaction} from 'expo-sqlite/legacy';
import {getDatabase} from './DatabaseManager';

const TABLE_NAME = 'Stuck';
const COL_ID = 'rowId';
const COL_NAME = 'name';
const COL_CODE = 'code';
const COL_FIRST_FLOAT = 'firstFloat';
const COL_SECOND_FLOAT = 'secondFloat';
export const CREATE_TABLE_STUCK =
  'CREATE TABLE if NOT EXISTS ' +
  TABLE_NAME +
  ' (' +
  COL_ID +
  ' integer primary key not null, ' +
  COL_NAME +
  ' text, ' +
  COL_CODE +
  ' text, ' +
  COL_FIRST_FLOAT +
  ' float, ' +
  COL_SECOND_FLOAT +
  ' float' +
  ');';

export const upsertStuck = (
  tx: SQLTransaction,
  id: number,
  name: string,
  code: string,
  firstFloat: number,
  secondFloat: number,
) => {
  tx.executeSql(
    'INSERT OR REPLACE INTO ' +
      TABLE_NAME +
      ' (' +
      COL_ID +
      ', ' +
      COL_NAME +
      ', ' +
      COL_CODE +
      ', ' +
      COL_FIRST_FLOAT +
      ', ' +
      COL_SECOND_FLOAT +
      ') ' +
      'values (?, ?, ?, ?, ?);',
    [
      id,
      name,
      code,
      firstFloat,
      secondFloat,
    ],
  );
};

export const getStucks = (limit: number | null, callback: Function) => {
  let query ='SELECT * FROM ' + TABLE_NAME + ' order by ' + COL_NAME;
  if (limit) {
    query += ' LIMIT ' + limit?.toString();
  }
  query += ';';
  const db = getDatabase();
  db.readTransaction(tx => {
    tx.executeSql(
      query,
      [],
      (_, {rows: {_array}}) => {
        callback(_array);
      },
      (_, error) => {
        console.log('error execute', error);
        callback([]);
        return true;
      }
    );
  });
};
