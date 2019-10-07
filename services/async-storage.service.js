import { AsyncStorage } from "react-native";

export default class AsyncStorageService {
  static _storeData = async value => {
    try {
      await AsyncStorage.setItem("@USER_PROFILE", value);
    } catch (error) {
      // Error saving data
    }
  };

  static _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@USER_PROFILE");
      if (value !== null) {
        // We have data!!
        console.log("valor", value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  static clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {}
  };

  static listAll = async () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          console.log("valores", key, value);
        });
      });
    });
  };
}
