import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function RootRouter() {
  const userData = useSelector(state => state.auth.userData);
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
      initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        navigation={navigation}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        navigation={navigation}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        navigation={navigation}
        options={{
          title: userData && userData.fullName ? userData.fullName : 'Home',
          headerRight: () => (
            <IconButton
              icon="logout"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
