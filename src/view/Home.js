import React from 'react';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const Home = () => {
    return(
        <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
            <Text>Home</Text>
        </View>
    );
}

export default Home;