import React, { useState } from 'react';
import { View, Text, Pressable, Image, Alert, TextInput } from 'react-native';
import styles from './Styles'
import EditableField from './EditableField';

export default function Item ({ item, deleteHandler, updateHandler }) {

  return (
    <View style={styles.container}>
      <Pressable
        onLongPress={() => {
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
        style={() => [
          styles.rowItem,
        ]}>
        <EditableField
          fieldKey="date"
          value={item.date}
          onSave={(key, val) => { 
            item[key] = val; 
            updateHandler(item);
          }}
          style={styles.itemTextStyle}
        />
        <EditableField
          fieldKey="description"
          value={item.description}
          onSave={(key, val) => { item[key] = val; 
            updateHandler(item);
          }}
          style={[styles.itemTextStyle, {flex: 1}]}
        />
        <EditableField
          fieldKey="category"
          value={item.category}
          onSave={(key, val) => { item[key] = val; 
            updateHandler(item);
          }}
          style={styles.itemTextStyle}
        />
        <EditableField
          fieldKey="amount"
          value={item.amount}
          onSave={(key, val) => { item[key] = val; 
            updateHandler(item);
          }}
          style={styles.itemTextStyle}
          keyboardType="numeric"
        />
      </Pressable>
    </View>
  )
};
