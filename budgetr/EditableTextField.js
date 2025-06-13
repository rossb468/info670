import { useState } from 'react';
import { Text, TextInput } from 'react-native';

export default function EditableTextField({ fieldKey, value, onSave, style, keyboardType }) {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  return editing ? (
    <TextInput
      style={style}
      value={editedValue}
      onChangeText={setEditedValue}
      onBlur={() => {
        onSave(fieldKey, editedValue);
        setEditing(false);
      }}
      autoFocus
      keyboardType={keyboardType}
    />
  ) : (
    <Text
      style={style}
      onPress={() => {
        setEditedValue(value);
        setEditing(true);
      }}
    >
      {value}
    </Text>
  );
}