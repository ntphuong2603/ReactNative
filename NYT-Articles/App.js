import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import NYTLogo from './components/NYTLogo';

const Stack=createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='screen'>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Detail' component={DetailScreen} 
          options={{headerShown:true, headerTitle:()=><NYTLogo ratio={55}/>, headerBackTitle:' '}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

