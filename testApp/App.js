import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, Alert, Pressable, Switch, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';

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
  const [selectedItems, setSelectedItems] = useState([])
  const [inputText,setInputText] = useState('')

  function handleSubmit(e) {
    const newList = data.concat({
      id: uuid.v4(),
      title: inputText
    });

    setList(newList)
  }

  function handleRemove(id) {
    const newList = data.filter((item) => item.id !== id);
    setList(newList);
  }

  const Item = ({title, id, checked}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
    <View style={styles.container}>
      <Pressable 
        onPress={() => toggleSwitch()}
        style={({ pressed }) => [
          styles.rowItem,
          { backgroundColor: pressed ? '#FFF' : 'white' }
        ]}
      >
        <Text style={[
          styles.title,
          { color: isEnabled ? '#888' : 'black',
            textDecorationLine: isEnabled ? 'line-through' : 'none',
           }
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
    )
  };

  return (
    <View>
      <FlatList
        style={styles.mainList}
        data={data} 
        keyExtractor={item => item.id}
        renderItem = {
          ({item}) => <Item title={item.title} id={item.id} />
          }
      />
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <TextInput
        style={styles.textInput}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Todo..."
      />
      <Button
        id="myButton"
        onPress={() => handleSubmit()}
        title="Add Item"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      </View>
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
    justifyContent: 'left',
    padding: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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

switchBox: {
  width: 30, // Fixed width
  justifyContent: 'center',
  alignItems: 'center',
},

textBox: {
  width: 270,
  paddingLeft: 20,
  justifyContent: 'center',
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
