import React, { useEffect, useState, useRef, useMemo } from 'react';
import styles from './Styles'
import data from './Data'
import Item from './Item'
import { FlatList, SafeAreaView, View, TextInput, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const STORAGE_KEY = 'transactions';
const today = new Date();
var lastDate = '';

function getLastUsedDate() {
  return lastDate.trim() !== '' ? lastDate : today.toLocaleDateString()
}

function createDefaultTransaction() {
  return {
    id: uuid.v4(),
    date: getLastUsedDate(),
    description: '',
    amount: '',
    category: ''
  }
}
  
export default function HomeScreen() {

  const [transactions, setTransactions] = useState([]);
  const [inputs, setInputs] = useState(createDefaultTransaction);

  const descriptionRef = useRef();
  const amountRef = useRef();
  const categoryRef = useRef();
  const flatListRef = useRef();

  // useEffect(() => {
  //   AsyncStorage.getItem(STORAGE_KEY).then(data => {
  //     if(data) setTransactions(JSON.parse(data));
  //   });
  // }, []);

  useEffect(() => {
    fetch('https://www.cs.drexel.edu/~rb468/api/getTransactions.php')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTransactions(data);
        }
        // Show the response data as a string in an alert
        console.log('----------------------------');
        console.log('FETCH RESULT:', JSON.stringify(data, null, 2));
        console.log('----------------------------');
      })
      .catch(error => {
        console.error('Failed to fetch transactions:', error);
        Alert.alert("Alert");
        setTransactions([{
          id: uuid.v4(),
          date: getLastUsedDate(),
          description: '',
          amount: '',
          category: ''
        }]);
      });
  }, [])

  // useEffect(() => {
  //   AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  //     if (flatListRef.current && transactions.length > 0) {
  //       flatListRef.current.scrollToEnd({ animated: false }); }
  // }, [transactions])

    var monthTotal = useMemo(() =>  {
      if(!transactions.length) return 0;

      const mostRecent = transactions[0];
      const [mMonth, mDay, mYear] = mostRecent.date.split('/').map(Number);
      const mostRecentDate = new Date(mYear, mMonth - 1, mDay);

      return transactions.reduce((sum, t) => {
        const [tMonth, tDay, tYear] = t.date.split('/').map(Number);
        const tDate = new Date(tYear, tMonth - 1, tDay);
        const diffDays = Math.abs((mostRecentDate - tDate) / (1000 * 60 * 60 * 24));
        if (diffDays <= 30) {
          const amt = parseFloat(t.amount);
          return sum + (isNaN(amt) ? 0 : amt);
        }
        return sum;
      }, 0);

  }, [transactions]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({...prev, [field]: value}));
  }

  const handleSubmit = () => {
    const { date = '', description = '', amount = '', category = '' } = inputs;
    if (
      !date.trim() ||
      !description.trim() ||
      !amount.trim() ||
      !category.trim()
    ) {
      return;
    }
    const newTransaction = {
      id: uuid.v4(),
      date,
      description,
      amount,
      category,
    };
    // setTransactions(prev => {
    //   const updated = [newTransaction, ...prev];
    //   updated.sort((a, b) => {
    //     const [aMonth, aDay, aYear] = a.date.split('/').map(Number);
    //     const [bMonth, bDay, bYear] = b.date.split('/').map(Number);
    //     const aDate = new Date(aYear, aMonth - 1, aDay);
    //     const bDate = new Date(bYear, bMonth - 1, bDay);
    //     return aDate - bDate;
    //   });
    //   return updated;
    // })
    fetch('https://www.cs.drexel.edu/~rb468/api/addTransaction.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction)
    })
    .then(response => response.json())
.then(data => {
  if (data.status === 'success') {
    setTransactions(prev => {
      const updated = [newTransaction, ...prev];
        updated.sort((a, b) => {
          const [aMonth, aDay, aYear] = a.date.split('/').map(Number);
          const [bMonth, bDay, bYear] = b.date.split('/').map(Number);
          const aDate = new Date(aYear, aMonth - 1, aDay);
          const bDate = new Date(bYear, bMonth - 1, bDay);
          return aDate - bDate;
        });
      return updated;
    });
    } else {
      Alert.alert('Server error', data.message || 'Unknown error');
    }
    })
    .catch(err => {
      console.error('Failed to submit transaction:', err);
      Alert.alert('Network error', err.message);
    });
    
    setInputs({date: getLastUsedDate(), description: '', amount: '', category: ''});
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        style={styles.mainList}
        data={transactions} 
        keyExtractor={item => item.id}
        renderItem={({item}) => <Item item={item} />}
      />
      <View style={{
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
      }}>
      </View>
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
          value={inputs.date}
          onChangeText={text => handleInputChange('date', text)}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
        />
        <TextInput
          ref={descriptionRef}
          style={[styles.inputTextStyle, { marginRight: 8 }]}
          placeholder="Description"
          value={inputs.description}
          onChangeText={text => handleInputChange('description', text)}
          returnKeyType="next"
          onSubmitEditing={() => amountRef.current.focus()}
        />
        <TextInput
          ref={amountRef}
          style={[styles.inputTextStyle, { marginRight: 8 }]}
          placeholder="Amount"
          keyboardType="numeric"
          value={inputs.amount}
          onChangeText={text => handleInputChange('amount', text)}
          returnKeyType="next"
          onSubmitEditing={() => categoryRef.current.focus()}
        />
        <TextInput
          ref={categoryRef}
          style={styles.inputTextStyle}
          placeholder="Category"
          value={inputs.category}
          onChangeText={text => handleInputChange('category', text)}
          returnKeyType="done"
          onSubmitEditing={handleSubmit} 
          />
      </View>
    </SafeAreaView>
  )
}