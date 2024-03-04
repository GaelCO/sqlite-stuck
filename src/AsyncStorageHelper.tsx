import AsyncStorage from '@react-native-async-storage/async-storage';

export const DB_VERSION_KEY: string = '@dbVersion_key';

const storeNumberValue = async (key: string, value: number) => {
  await storeValue(key, value?.toString());
};

const storeValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // do nothing on error
  }
};

const getNumberData = async (
  key: string,
  defaultValue: number | null,
): Promise<number | null> => {
  let result;
  try {
    const tmpValue = await AsyncStorage.getItem(key);
    result = tmpValue ? +tmpValue : defaultValue;
  } catch (e) {
    // error reading value
    result = defaultValue;
  }
  return result;
};

export const storeDbVersion = async (value: number) => {
  await storeNumberValue(DB_VERSION_KEY, value);
};

export const getDbVersion = async (): Promise<number | null> => {
  return await getNumberData(DB_VERSION_KEY, null);
};
