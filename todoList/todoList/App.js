
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, Alert, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import uuid from 'react-native-uuid';
import MyList from './MyList'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default function App() {

  return (
      <SafeAreaView style={styles.container}>
        <MyList data={DATA} />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   mainList: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'left',
    padding: 10,
  },
  title: {
	  fontSize: 24
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    maxHeight: 60,
  },

textInput: {
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 8,
  fontSize: 18,
  width: 270,
  paddingLeft: 5,
  paddingTop: 5,
  paddingBottom: 5,
  justifyContent: 'center',
},
});
