import React, { useEffect, useState, useRef, useMemo } from 'react';
import styles from './Styles'
import data from './Data'
import Item from './Item'
import { FlatList, SafeAreaView, View, TextInput, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { fetchTransactions, postTransaction } from './API';
import InputControl from './InputControl'
import { InteractionManager } from 'react-native';

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

function sortTransactions(transactions) {
  return transactions.slice().sort((a, b) => {
    const [aMonth, aDay, aYear] = a.date.split('/').map(Number);
    const [bMonth, bDay, bYear] = b.date.split('/').map(Number);
    const aDate = new Date(aYear, aMonth - 1, aDay);
    const bDate = new Date(bYear, bMonth - 1, bDay);
    return aDate - bDate;
  });
}

async function loadData() {
  try {
    const data = await fetchTransactions();

    // Do some validate to ensure we're getting valid data
    if (Array.isArray(data) && 
        data.every(transaction =>
          transaction &&
          typeof transaction.id === 'string' &&
          typeof transaction.date === 'string' &&
          typeof transaction.description === 'string' &&
          (typeof transaction.amount === 'number' || typeof transaction.amount === 'string') &&
          typeof transaction.category === 'string'
        )
      ) {
        // On success
        return data;
      } else {
        console.error('Invalid transaction data format:', data);
      }
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
  }
}

async function handleSubmit(transaction, setTransactions) {
    try {
      const response = await postTransaction(transaction);
      console.log(response);
      if(response.status === 200) {
        setTransactions(prev => sortTransactions([transaction, ...prev]));
      }
      else {
        console.error("Server error", response.status || "Unknown error");
      }
    }
    catch (error) {
      console.error("Failed to submit transaction:", error);
    }
  }
  
export default function HomeScreen() {

  const [date, setDate] = useState(getLastUsedDate());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const [transactions, setTransactions] = useState([]);

  const descriptionRef = useRef();
  const amountRef = useRef();
  const categoryRef = useRef();
  const flatListRef = useRef();

  useEffect(() => {
    loadData().then(data => setTransactions(data));
  }, []);

  const createTransactionFromInput = () => {
    if (!date.trim() || !description.trim() ||!amount.trim() ||!category.trim()) 
    {
      return null;
    }

    return {
      id: uuid.v4(),
      date,
      description,
      amount,
      category,
    }
  }

  const submitTransaction = () => {
    const transaction = createTransactionFromInput();
    if(transaction) {
      handleSubmit(transaction, setTransactions);
    }
    
    setDate(getLastUsedDate());
    setDescription('');
    setAmount(0);
    setCategory('');

    Keyboard.dismiss();
  }

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'date':
        setDate(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        break;
    }
  }

  //   var monthTotal = useMemo(() =>  {
  //     if(!transactions.length) return 0;

  //     const mostRecent = transactions[0];
  //     const [mMonth, mDay, mYear] = mostRecent.date.split('/').map(Number);
  //     const mostRecentDate = new Date(mYear, mMonth - 1, mDay);

  //     return transactions.reduce((sum, t) => {
  //       const [tMonth, tDay, tYear] = t.date.split('/').map(Number);
  //       const tDate = new Date(tYear, tMonth - 1, tDay);
  //       const diffDays = Math.abs((mostRecentDate - tDate) / (1000 * 60 * 60 * 24));
  //       if (diffDays <= 30) {
  //         const amt = parseFloat(t.amount);
  //         return sum + (isNaN(amt) ? 0 : amt);
  //       }
  //       return sum;
  //     }, 0);

  // }, [transactions]);

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
      <InputControl 
        styles={styles} 
        refs={{descriptionRef, amountRef, categoryRef}}
        values={{
          date,
          description,
          amount,
          category,
        }}
        onChange={handleInputChange}
        onSubmit={submitTransaction} />
    </SafeAreaView>
  )
}