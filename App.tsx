import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import CalculatorScreen from './src/screens/CalculatorScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen options={{
        headerShown: true
      }} name="CalculatorScreen" component={CalculatorScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
 
};

export default App;
