import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';

import styles from '../style/Styles';
import auth from '@react-native-firebase/auth';

const Email = ({route, navigation}) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [resetPass, setResetPass] = useState(0);

  useEffect(() => {
    console.log(user);
    if(route.params != null){
      const { resetPass } = route.params;
      setResetPass(resetPass);
    }
  })

  useState(() =>{
    const user = auth().currentUser;
    setUser(user);
  })

  const sendEmail = () => {
    if(resetPass == 0){
      user.sendEmailVerification().then(function() {
        Alert.alert('Aviso!', 'Após confirmar seu email pelo link, é necessário fazer login novamente para confirmar a validação.', [
          {
            text: 'OK',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              }),
          },
        ]);
      }).catch(function(error) {
        // An error happened.
      });
    }else{      
      auth().sendPasswordResetEmail(email).then(function() {
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
      }).catch(function(error) {
        console.log(error);
      });
    }
  }

  if(resetPass == 0){
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  
        <TouchableOpacity style={styles.button} onPress={() => { sendEmail() }}>
          <Text style={styles.buttonTitle}>Confirmar Email</Text>
        </TouchableOpacity>
      </View>
    );
  }else{
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => { sendEmail() }}>
          <Text style={styles.buttonTitle}>Recuperar Senha</Text>
        </TouchableOpacity>
      </View>
    );
  }

};

export default Email;
