import React, { useState } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles'

export default function Item ({ item, deleteHandler }) {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigateToDetail = () => navigation.navigate('Detail', { ...item });
  
  return (
    <View style={styles.container}>
      <Pressable 
      onPress={() => {
        Alert.alert(
          "Delete Transaction",
          "Are you sure you want to delete this transaction?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", style: "destructive", 
                onPress: () => deleteHandler(item) }
            ]
          );
        }}
        style={({ pressed }) => [
          styles.rowItem,
        ]}>
          <Text style={styles.itemTextStyle}>{item.date}</Text>
          <Text style={[styles.itemTextStyle, {flex: 1}]}>{item.description}</Text>
          <Text style={styles.itemTextStyle}>{item.category}</Text>
          <Text style={styles.itemTextStyle}>{item.amount}</Text>
      </Pressable>
    </View>
  )
};
