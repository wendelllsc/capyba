import React, {useEffect, useState} from 'react';
import {Text, View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const Restrict = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    setUser(user);
    if (user.emailVerified == false) {
      Alert.alert('Acesso negado!', 'Valide seu email para ter acesso.', [
        {
          text: 'OK',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
        },
      ]);
    }
  });

  return (
    <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
      <Text>Restrict</Text>
    </View>
  );
};

export default Restrict;
