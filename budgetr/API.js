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
    const response = await fetch(`${API_URL}/addTransaction.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
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


export async function updateTransaction(transaction) {
  const result = null;
  try {
    const response = await fetch(`${API_URL}/updateTransaction.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });

    result = await response.json();
  }
  catch(error) {
    console.error("Error in updateTransaction:", error);
  }

  if (result.status !== 'success') {
    throw new Error(result.message || 'Failed to update transaction');
  }

  return response;
}