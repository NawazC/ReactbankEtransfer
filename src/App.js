import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transaction from './Transaction';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    accountNumber: '',
    amount: 0,
    fromAccount: '',
    toAccount: ''
  });
  const [accountBalances, setAccountBalances] = useState({});

// Function to handle transaction submission (Deposit or Withdrawal)
const handleTransaction = () => {
  const { type, accountNumber, amount } = formData;

  if (!type || !accountNumber || amount <= 0) {
    alert('Please fill out all fields correctly.');
    return;
  }

  let updatedBalances = { ...accountBalances };
  let currentBalance = updatedBalances[accountNumber] || 0;

  if (type === 'Withdrawal' && amount > currentBalance) {
    alert('Insufficient balance for withdrawal.');
    return;
  }

  const updatedBalance = type === 'Deposit' ? currentBalance + amount : currentBalance - amount;

  const newTransaction = {
    type,
    accountNumber,
    amount,
    currentBalance: updatedBalance,
    timestamp: new Date().toLocaleString()
  };

  // Update transactions
  setTransactions([...transactions, newTransaction]);

  // Update or initialize account balance in the state
  updatedBalances[accountNumber] = updatedBalance;
  setAccountBalances(updatedBalances);

  // Reset form data
  setFormData({ type: '', accountNumber: '', amount: 0 });
};


 // Function to handle e-transfer submission
const handleTransfer = () => {
  const { fromAccount, toAccount, amount } = formData;

  // Check if fromAccount and toAccount are different
  if (fromAccount === toAccount) {
    alert('Please select different accounts for the transfer.');
    return;
  }

  // Check if both fromAccount and toAccount are valid account numbers
  if (!accountBalances[fromAccount] || !accountBalances[toAccount]) {
    alert('Invalid account numbers for transfer.');
    return;
  }

  if (fromAccount && toAccount && amount > 0) {
    const fromBalance = accountBalances[fromAccount];
    const toBalance = accountBalances[toAccount];

    if (fromBalance >= amount) {
      const updatedFromBalance = fromBalance - amount;
      const updatedToBalance = toBalance + amount;

      const transferOutTransaction = {
        type: 'Transfer',
        accountNumber: fromAccount,
        amount: -amount,
        currentBalance: updatedFromBalance,
        timestamp: new Date().toLocaleString()
      };

      const transferInTransaction = {
        type: 'Transfer',
        accountNumber: toAccount,
        amount,
        currentBalance: updatedToBalance,
        timestamp: new Date().toLocaleString()
      };

      // Update transactions for transfer
      setTransactions([...transactions, transferOutTransaction, transferInTransaction]);

      // Update account balances in the state
      const updatedBalances = {
        ...accountBalances,
        [fromAccount]: updatedFromBalance,
        [toAccount]: updatedToBalance
      };

      setAccountBalances(updatedBalances);

      // Reset form data
      setFormData({ type: '', fromAccount: '', toAccount: '', amount: 0 });
    } else {
      alert('Insufficient balance for transfer.');
    }
  } else {
    alert('Please fill out all fields correctly.');
  }
};


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Bank Transactions</h2>
          <button
            className="btn btn-primary mr-2"
            onClick={() => setFormData({ type: 'Deposit', accountNumber: '', amount: 0 })}
          >
            Deposit
          </button>
          <button
            className="btn btn-danger mr-2"
            onClick={() => setFormData({ type: 'Withdrawal', accountNumber: '', amount: 0 })}
          >
            Withdraw
          </button>
          <button
            className="btn btn-success"
            onClick={() => setFormData({ type: 'Transfer', fromAccount: '', toAccount: '', amount: 0 })}
          >
            E-Transfer
          </button>
        </div>
      </div>

      {formData.type && (
        <div className="mt-3">
          <h3>{formData.type === 'Transfer' ? 'E-Transfer' : `${formData.type} Form`}</h3>
          {formData.type === 'Transfer' ? (
            <div>
              <div className="form-group">
                <label>From Account Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="fromAccount"
                  value={formData.fromAccount}
                  onChange={(e) => setFormData({ ...formData, fromAccount: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>To Account Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="toAccount"
                  value={formData.toAccount}
                  onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label>Account Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            />
          </div>
          <button className="btn btn-primary" onClick={formData.type === 'Transfer' ? handleTransfer : handleTransaction}>
            {formData.type}
          </button>
        </div>
      )}

      <Transaction transactions={transactions} accountBalances={accountBalances} />
    </div>
  );
}

export default App;
