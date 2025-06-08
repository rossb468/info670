import uuid from 'react-native-uuid';

const API_URL = 'https://www.cs.drexel.edu/~rb468/api';

export async function fetchTransactions() {
  const response = await fetch(`${API_URL}/getTransactions.php`);
  const data = await response.json();

  if (!Array.isArray(data)) 
    {
        throw new Error('Invalid response format');
    }

  return data;
}

export async function postTransaction(transaction) {
    const newTransaction = { ...transaction, id: uuid.v4() };
    const response = await fetch(`${API_URL}/addTransaction.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTransaction),
    });
    const result = await response.json();

    if (result.status !== 'success') 
    {
        throw new Error(result.message || 'Server error');
    }

  return response;
}


export async function deleteTransaction(id) {
  const response = await fetch(`${API_URL}/deleteTransaction.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });

  const result = await response.json();

  if (result.status !== 'success') {
    throw new Error(result.message || 'Failed to delete transaction');
  }

  return response;
}