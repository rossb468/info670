import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, Alert, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
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
  const [inputText,setInputText] = useState('')

  function handleSubmit(e) {
    const newList = data.concat({
      id: uuid.v4(),
      title: inputText
    });

    setList(newList)
  }

  function showConfirmAlert(id) {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => setList((prevItems) => prevItems.filter((item) => item.id !== id)),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const Item = ({title, id}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
    <View style={styles.container}>
      <Pressable 
        onPress={() => toggleSwitch()}
        onLongPress={() => showConfirmAlert(id)}
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
        disabled={inputText.trim() === ''}
      />
      </View>
    </View>
  )
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

export default MyList;