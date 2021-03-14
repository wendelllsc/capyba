import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from '../style/Styles';



const Login = ({route, navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(route.params != null){
      const { exit } = route.params;

      if(exit == 1){
        auth().signOut().then(() =>{
          navigation.reset({index: 0, routes: [{name: 'Login'}]})
        })

      }
    }

    if(auth().currentUser){
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    }
  });

  const singin = () => {
    if (email == '' || password == '') {
      Alert.alert('Erro!', 'Preencha os dados.', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        })
        .catch((error) => {
          Alert.alert('Acesso negado!', 'Dados inválidos', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbdbdb',
      }}>
      <View style={{padding: 30, margin: 30}}>
        <Image source={require('../img/capyba.png')} />
      </View>
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
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          alignSelf: 'stretch',
          paddingRight: 30,
        }}>
        <Text
          onPress={() => {
            navigation.navigate('Validar email', { resetPass: 1});
          }}
          style={styles.footerLink}>
          Esqueceu a senha?
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          singin();
          //navigation.reset({index: 0, routes: [{name: 'Home'}]});
        }}>
        <Text style={styles.buttonTitle}>Entrar</Text>
      </TouchableOpacity>
      <View style={{margin: 20}}>
        <Text style={styles.footerText}>
          Não tem conta?{' '}
          <Text
            onPress={() => {
              navigation.navigate('Register');
            }}
            style={styles.footerLink}>
            Criar.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
