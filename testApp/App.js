import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

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

const MyList = props => {
  const [data, setList] = useState(DATA)

  function handleSubmit(e) {
    const newList = data.concat({
      id: uuid.v4(),
      title: "New Item"
    });

    setList(newList)
  }

  return (
    <View>
      <FlatList
        style={styles.mainList}
        data={data} 
        keyExtractor={item => item.id}
        renderItem = {
          ({item}) => <Item title={item.title} />
          }
      />
      <Button
        id="myButton"
        onPress={() => handleSubmit()}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

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
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
	  fontSize: 32
  }
});
