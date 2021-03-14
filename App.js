import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Login from './src/view/Login';
import Home from './src/view/Home';
import Email from './src/view/Email';
import Restrict from './src/view/Restrict';
import Register from './src/view/Register';
import Profile from './src/view/Profile';

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={Home}/>
      <Drawer.Screen name='Perfil' component={Profile}/>
      <Drawer.Screen name='Restrito' component={Restrict}/>
      <Drawer.Screen name='Validar email' component={Email} />
      <Drawer.Screen name='Sair' component={Login} initialParams={{ exit: 1 }}/>
    </Drawer.Navigator>
  );
}

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={DrawerNavigation} options={{headerShown: false}}/>
        <Stack.Screen name='Validar email' component={Email} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
