import React from 'react';
import { View, TextInput, Keyboard } from 'react-native';

export default function InputControl({ styles, refs, values, onChange, onSubmit }) {
  return (
    <View style={{
      backgroundColor: '#fff',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    }}>
      <TextInput
        style={[styles.inputTextStyle, { marginRight: 8 }]}
        placeholder="Date"
        value={values.date}
        onChangeText={text => onChange('date', text)}
        returnKeyType="next"
        onSubmitEditing={() => refs.descriptionRef.current.focus()}
      />
      <TextInput
        ref={refs.descriptionRef}
        style={[styles.inputTextStyle, { marginRight: 8 }]}
        placeholder="Description"
        value={values.description}
        onChangeText={text => onChange('description', text)}
        returnKeyType="next"
        onSubmitEditing={() => refs.amountRef.current.focus()}
      />
      <TextInput
        ref={refs.amountRef}
        style={[styles.inputTextStyle, { marginRight: 8 }]}
        placeholder="Amount"
        keyboardType="numeric"
        value={values.amount}
        onChangeText={text => onChange('amount', text)}
        returnKeyType="next"
        onSubmitEditing={() => refs.categoryRef.current.focus()}
      />
      <TextInput
        ref={refs.categoryRef}
        style={styles.inputTextStyle}
        placeholder="Category"
        value={values.category}
        onChangeText={text => onChange('category', text)}
        returnKeyType="done"
        onSubmitEditing={() => {
          onSubmit();
          Keyboard.dismiss();
        }}
      />
    </View>
  );
}