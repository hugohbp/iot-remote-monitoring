import { firebaseDatabase } from "../utils/firebase";

export default class FirebaseService {
  static getDataList = (nodePath, callback, size = 10) => {
    let query = firebaseDatabase.ref(nodePath).limitToLast(size);
    query.on("value", dataSnapshot => {
      let items = [];
      dataSnapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item["key"] = childSnapshot.key;
        items.push(item);
      });
      callback(items);
    });

    return query;
  };

  static writeUserData = (path, name, email, imageUrl) => {
    firebaseDatabase.ref("/" + 555).set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  };

  static saveUser = user => {
    firebaseDatabase.ref("/users/" + user.telefone).set({
      name: user.name,
      email: user.email
    });
  };

  static saveRating = (user, rate) => {
    firebaseDatabase.ref("/ratings/" + new Date()).set({
      user: user.telefone,
      rate: rate
    });
  };

  static saveBudget = (user, budget) => {
    firebaseDatabase.ref("/budgets/" + new Date()).set({
      user: user.telefone,
      budget: budget
    });
  };

  static getLastInformationFromSensors = () => {
    var objectReturn;

    firebaseDatabase
      .ref("dados/sensors/")
      .orderByKey()
      .limitToLast(1)
      .on("child_added", snap => {
        console.log("teste", snap.val());
        // objectReturn = snap.val();
        return snap.val();
      });

    //return objectReturn;
  };
}
