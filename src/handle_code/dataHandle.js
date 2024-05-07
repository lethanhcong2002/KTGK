import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AddNewExercise = async valueData => {
  try {
    await firestore().collection('Exercise').add(valueData);
    Alert.alert('Exercise added successfully');
  } catch (error) {
    console.error('Error adding exercise: ', error);
    throw error;
  }
};

export function getDataFromFirestore(docId, callback) {
  return firestore()
    .collection('Exercise')
    .where('userId', '==', docId)
    .onSnapshot(
      querySnapshot => {
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id,
          }));
          callback(data);
        } else {
          callback(null);
        }
      },
      error => {
        // Xử lý lỗi nếu có
        console.error('Error getting documents:', error);
        callback(null);
      },
    );
}

