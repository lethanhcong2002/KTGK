import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Text, Button} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {AddNewExercise, getDataFromFirestore} from '../handle_code/dataHandle';
import {useSelector} from 'react-redux';

export default function HomeScreen() {
  const [value, setValue] = useState('');
  const [bodyData, setBodyData] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  useEffect(() => {
    const docId = userData.email;
    getDataFromFirestore(docId, async data => {
      setBodyData(data);
    });
  }, [userData]);
  const handleAddNew = () => {
    const newData = {title: value, userId: userData.email};
    AddNewExercise(newData);
    setValue('');
  };
  return (
    <View style={{margin: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          mode="outlined"
          value={value}
          onChangeText={setValue}
          style={{flex: 4, borderRadius: 0, height: 50}}
        />
        <Button
          mode="contained"
          style={{flex: 1, borderRadius: 0, height: 50}}
          buttonColor="blue"
          onPress={handleAddNew}>
          ADD
        </Button>
      </View>
      <FlatList
        style={{marginTop: 10}}
        data={bodyData}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                {index}. {item.title}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
