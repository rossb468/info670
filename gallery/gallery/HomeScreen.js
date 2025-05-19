import React from 'react';
import styles from './Styles'
import data from './Data'
import Item from './Item'
import { FlatList, SafeAreaView } from 'react-native';
  
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.mainList}
        data={data} 
        keyExtractor={item => item.id}
        renderItem={({item}) => <Item item={item} />}
      />
    </SafeAreaView>
  )
  }
