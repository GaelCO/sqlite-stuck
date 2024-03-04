import {Button, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {getDbVersion} from "./src/AsyncStorageHelper";
import {createOrUpdateDatabase, DB_VERSION} from "./src/DatabaseInitialize";
import {getStucks} from "./src/StuckDao";

export default function App() {

  const [isDatabaseInitializing, setIsDatabaseInitializing] = useState(false);
  const [isStucksLoading, setIsStucksLoading] = useState(false);
  const [nbResult, setNbResult] = useState<number| undefined>(undefined);

  // Launch loading system
  useEffect(() => {
    // create database if not exist
    setIsDatabaseInitializing(false)
    getDbVersion().then((dbVersion: number | null) => {
      if (dbVersion == null || dbVersion < DB_VERSION) {
        createOrUpdateDatabase(dbVersion);
      }
      setIsDatabaseInitializing(false)
    });
  }, []);

  const _callGetStucksMethod = () => {
    setIsStucksLoading(true)
    getStucks(null, (result: any[]) => {
      setNbResult(result.length);
      setIsStucksLoading(false)
    })
  };

  return (
    <View style={styles.container}>
      <Button title='get Data' onPress={_callGetStucksMethod} />
      <Text style={{marginTop: 25}}>
        {isDatabaseInitializing ?
          'Initialization...' :
          (isStucksLoading ?
            'Get data ...' :
            (nbResult ?
              ('nbRows' + nbResult) :
              'you do not get data'
            )
          )
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
