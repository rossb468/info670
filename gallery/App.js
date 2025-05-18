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
  const [data, setList] = useState(DATA)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}
         options={({ navigation }) => ({
          headerShown: true, 
          headerRight: () => (
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person-circle-outline" size={24} color="#007AFF" />
              <Text style={{ fontSize: 16, color: '#007AFF', marginLeft: 4 }}>Profile</Text>
            </TouchableOpacity>
        )})} />
        <Stack.Screen name="Detail" component={DetailScreen} 
          options={({ navigation }) => ({
          headerShown: true, 
          headerRight: () => (
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person-circle-outline" size={24} color="#007AFF" />
              <Text style={{ fontSize: 16, color: '#007AFF', marginLeft: 4 }}>Profile</Text>
            </TouchableOpacity>
        )})} />
        <Stack.Screen name="Profile" component={ProfileScreen} 
            options={({ navigation }) => ({
            headerShown: true,
            presentation: 'modal',
            headerRight: () => (
              <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 16, color: '#007AFF' }}>Done</Text>
              </TouchableOpacity>
            )})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
