import { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from './HomeScreen'
import DetailScreen from './DetailScreen'
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}
         options={({ navigation }) => ({
          headerShown: true })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
