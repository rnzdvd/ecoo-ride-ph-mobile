import AsyncStorage from "@react-native-async-storage/async-storage";

export default class StorageRepository {
  async setItem(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
  }

  async getItem(key: string): Promise<string | undefined> {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }
  }

  async removeItem(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  async multiRemove(keys: string[]): Promise<void> {
    return AsyncStorage.multiRemove(keys);
  }
}
