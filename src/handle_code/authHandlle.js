import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

const USERS = firestore().collection('Users');

export const handleCreateAccount = userData => {
  USERS.doc(userData.email).onSnapshot(u => {
    if (!u.exists) {
      auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(() =>
          USERS.doc(userData.email)
            .set(userData)
            .then(() => console.log('Add new customer!')),
        );
    }
  });
};

export const handleLoginAccount = (email, password) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        try {
          const userDataSnapshot = await USERS.doc(email).get();
          const userData = userDataSnapshot.data();
          resolve(userData);
        } catch (error) {
          console.error('Error getting user data:', error);
          Alert.alert(
            'Lỗi',
            'Đã xảy ra lỗi khi lấy dữ liệu người dùng từ Firestore.',
          );
          reject(error);
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert(
          'Lỗi',
          'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.',
        );
        reject(error);
      });
  });
};
