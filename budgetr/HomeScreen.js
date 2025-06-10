import { useEffect, useState, useRef, useMemo } from 'react';
import styles from './Styles'
import Item from './Item'
import { FlatList, SafeAreaView, View, Keyboard, Text, InteractionManager } from 'react-native';
import uuid from 'react-native-uuid';
import { fetchTransactions, postTransaction, deleteTransaction } from './API';
import InputControl from './InputControl'
import DropDownPicker from 'react-native-dropdown-picker';

const STORAGE_KEY = 'transactions';
var lastDate = new Date().toLocaleDateString();

function createDefaultTransaction() {
  return {
    id: uuid.v4(),
    date: lastDate,
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

async function handleDelete(transaction, setTransactions) {
  console.log(transaction);
  try {
    const response = await deleteTransaction(transaction.id);

    if(response.status === 200) {
      setTransactions(prev => prev.filter(t => t.id !== transaction.id));
    }
    else {
      console.error("Server error:", response.message || "Unknown error");
    }
  }
  catch (error) {
    console.error("Failed to delete transaction:", error);
  }
}

function filterTransactionsByDateRange(transactions, startDate, endDate) {
  if (!Array.isArray(transactions) || !startDate || !endDate) return transactions;

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start) || isNaN(end)) return transactions;

  return transactions.filter(t => {
    const [m, d, y] = t.date.split('/').map(Number);
    const tDate = new Date(y, m - 1, d);
    return tDate >= start && tDate <= end;
  });
}
  
export default function HomeScreen() {

  const [date, setDate] = useState(lastDate);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const descriptionRef = useRef();
  const amountRef = useRef();
  const categoryRef = useRef();
  const flatListRef = useRef();

  const [pickerRange, setRange] = useState('all');
  const [pickerOpen, setOpen] = useState(false);
  const [pickerItems, setItems] = useState([
    { label: 'All', value: 'all' },
    { label: 'Last 7 days', value: '7days' },
    { label: 'Last 30 days', value: '30days' },
    { label: 'Current Week', value: 'week' },
    { label: 'Current Month', value: 'month' },
  ]);


  useEffect(() => {
    loadData().then(data => {
      setTransactions(sortTransactions(data));

      InteractionManager.runAfterInteractions(() => {
        if (descriptionRef.current) {
          descriptionRef.current.focus();
        }
      });
    });
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
      handleSubmit(transaction, setTransactions).then(() => {

      setDate(lastDate);
      setDescription('');
      setAmount('');
      setCategory('');

      if (descriptionRef.current) {
        descriptionRef.current.focus();
      }
      })
    }
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

  const handleDeleteExposed = (transaction) => {
    handleDelete(transaction, setTransactions);
  }

  function applyDateFilter(range, allTransactions) {
    const now = new Date();
    let startDate = null;

    switch (range) {
      case '7days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        break;
      case 'week': {
        const day = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - day);
        startDate.setHours(0, 0, 0, 0);
        break;
      }
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'all':
      default:
        setFilteredTransactions(allTransactions);
        return;
    }

    setFilteredTransactions(filterTransactionsByDateRange(allTransactions, startDate, now));
  }

  useEffect(() => {
    applyDateFilter(pickerRange, transactions);
  }, [pickerRange, transactions]);

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
        data={filteredTransactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Item item={item} deleteHandler={handleDeleteExposed} />}
        stickyHeaderIndicies={[0]}
        ListHeaderComponent={() => (
          <View style={styles.itemRow}>
            <Text style={{flex: 1}}>Date</Text>
            <Text style={{flex: 2}}>Description</Text>
            <Text style={{flex: 1}}>Category</Text>
            <Text style={{flex: 1}}>Amount</Text>
          </View>
        )}
      />
      <View style={{ paddingHorizontal: 10, paddingVertical: 20, marginTop: 'auto' }}>
        <DropDownPicker
          open={pickerOpen}
          value={pickerRange}
          items={pickerItems}
          setOpen={setOpen}
          setValue={setRange}
          setItems={setItems}
          style={{ marginBottom: 10 }}
        />
        <InputControl
          styles={styles}
          refs={{ descriptionRef, amountRef, categoryRef }}
          values={{ date, description, amount, category }}
          onChange={handleInputChange}
          onSubmit={submitTransaction}
        />
      </View>
    </SafeAreaView>
  )
}