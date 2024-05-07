import {View, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {handleCreateAccount} from '../handle_code/authHandlle';

export default function RegisterScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const hasErrorEmail = () => email.length > 0 && !email.includes('@');
  const hasErrorPassword = () => password.length > 0 && password.length < 6;
  const hasErrorConfirmPassword = () =>
    confirmPassword.length > 0 && confirmPassword.length < 6;
  const handleRegister = () => {
    if (
      email == '' ||
      fullName == '' ||
      password == '' ||
      confirmPassword == ''
    ) {
      Alert.alert('Không được bỏ trống');
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert('Mật khẩu không trùng khớp');
      return;
    }
    const userData = {
      email: email,
      password: password,
      fullName: fullName,
    };
    handleCreateAccount(userData);
    navigation.goBack();
  };

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
          marginVertical: 30,
        }}
      />
      <TextInput
        mode="outlined"
        label={'Full Name'}
        value={fullName}
        onChangeText={setFullName}
      />
      <HelperText />
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
      <TextInput
        mode="outlined"
        label={'Confirm Password'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={!showPassword ? 'eye' : 'eye-off'}
            onPress={handleIconPress}
          />
        }
      />
      <HelperText type="error" visible={hasErrorConfirmPassword()}>
        Error Password
      </HelperText>
      <Button
        mode="contained"
        buttonColor="blue"
        style={{marginTop: 15}}
        onPress={handleRegister}>
        Create account
      </Button>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Already got an account? </Text>
        <Button onPress={() => navigation.goBack()}>Login</Button>
      </View>
    </View>
  );
}
