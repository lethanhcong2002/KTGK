import {View, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import { handleLoginAccount } from '../handle_code/authHandlle';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/authAction';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const hasErrorEmail = () => email.length > 0 && !email.includes('@');
  const hasErrorPassword = () => password.length > 0 && password.length < 6;
  const handleLogin = async () => {
    const userData = await handleLoginAccount(email, password);
    console.log(userData);
    dispatch(loginUser(userData));
    navigation.replace('Home');
  }

  const handleIconPress = () => {
    setShowPassword(prevIsSecure => !prevIsSecure);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <Image
        source={require('../asset/logo_no_bg.png')}
        style={{
          alignSelf: 'center',
          width: '100%',
          height: undefined,
          aspectRatio: 21 / 9,
          resizeMode: 'contain',
          marginVertical: 50,
        }}
      />
      <TextInput
        mode="outlined"
        label={'Email'}
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type="error" visible={hasErrorEmail()}>
        Error Email
      </HelperText>
      <TextInput
        mode="outlined"
        label={'Password'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={!showPassword ? 'eye' : 'eye-off'}
            onPress={handleIconPress}
          />
        }
      />
      <HelperText type="error" visible={hasErrorPassword()}>
        Error Password
      </HelperText>
      <Button
        mode="contained"
        buttonColor="blue"
        style={{marginTop: 15}}
        onPress={handleLogin}>
        Login
      </Button>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Don't have an account? </Text>
        <Button onPress={() => navigation.navigate('Register')}>Sign up</Button>
      </View>
    </View>
  );
}
