import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import styles from '../style/Styles';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    if (
      fullName == '' ||
      email == '' ||
      password == '' ||
      confirmPassword == ''
    ) {
      Alert.alert('Erro!', 'Preencha os dados.', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    } else {
      if (password != confirmPassword) {
        Alert.alert('Erro!', 'Senhas diferentes.', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      } else {
         auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            res.user.updateProfile({
                displayName: fullName
              })
            navigation.reset({index: 0, routes: [{name: 'Home'}]});
          })
          .catch((error) => {
            if (error.code == 'auth/email-already-in-use') {
              Alert.alert('Erro!', 'Email já cadastrado', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
            } else if (error.code == 'auth/weak-password') {
              Alert.alert('Erro!', 'Senha precisa ter mais que 6 digitos.', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
            } else {
              Alert.alert('Erro!', 'Dados inválidos', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
            }
          });
      }
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{padding: 30, margin: 30}}>
        <Image source={require('../img/capyba.png')} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Confirmar senha"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          registerUser();
        }}>
        <Text style={styles.buttonTitle}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
