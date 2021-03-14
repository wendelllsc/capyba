import React, {useState, useEffect} from 'react';
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

const Profile = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [oldPass, setOldPass] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    setUser(user);
    setEmail(user.email);
    setFullName(user.displayName);
  }, []);

  const updateUser = () => {
    if(fullName == '' ||
    email == '' ||
    password == '' ||
    confirmPassword == ''){
        Alert.alert('Erro!', 'Preencha os dados.', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
    }else{
        if (password != confirmPassword) {
            Alert.alert('Erro!', 'Senhas diferentes.', [
              {
                text: 'OK',
                onPress: () => {},
              },
            ]);
          }
          else{
            var credential = auth.EmailAuthProvider.credential(
                user.email, 
                oldPass
            ); 
            user.reauthenticateWithCredential(credential).then(function() {
                user.updateProfile({
                    displayName: fullName
                })
                user.updateEmail(email)
                user.updatePassword(password)
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  })
            }).catch(function(error) {
              console.log(error)
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
        editable = {false}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Senha atual"
        onChangeText={(text) => setOldPass(text)}
        value={oldPass}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Nova senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Confirmar nova senha"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            updateUser();
        }}>
        <Text style={styles.buttonTitle}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
