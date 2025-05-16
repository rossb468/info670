import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles'
import { imageMap } from './Data'

export default function Item ({ item }) {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigateToDetail = () => navigation.navigate('Detail', { ...item });

  return (
    <View style={styles.container}>
      <Pressable 
        onPress={navigateToDetail}
        style={({ pressed }) => [
          styles.rowItem,
        ]}>
        <Image
          source={imageMap[item.imageKey]}
          style={{ width: 'auto', height: 300, aspectRatio: 1 }}
          resizeMode='contain'
        />
        <Text style={[
          styles.title,
          { color: isEnabled ? '#888' : 'black',
            textDecorationLine: isEnabled ? 'line-through' : 'none',
          }
        ]}>
          {item.title}
        </Text>
      </Pressable>
    </View>
  )
};
