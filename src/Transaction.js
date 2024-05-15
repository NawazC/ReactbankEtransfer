import React from 'react';

const Transaction = ({ transactions }) => {
  let currentBalance = 0;

  return (
    <div className="mt-5">
      <h3>Transactions:</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            // Update current balance based on transaction type
            if (transaction.type === 'Deposit') {
              currentBalance += transaction.amount;
            } else if (transaction.type === 'Withdrawal') {
              currentBalance -= transaction.amount;
            }

            return (
              <tr key={index}>
                <td>{transaction.type}</td>
                <td>{transaction.accountNumber}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{transaction.timestamp}</td>
                <td>${currentBalance.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
