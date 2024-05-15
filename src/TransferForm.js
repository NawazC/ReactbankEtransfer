import React, { useState } from 'react';

const TransferForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ fromAccount: '', toAccount: '', amount: 0 });
  };

  return (
    <div className="mt-5">
      <h3>E-Transfer</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>From Account Number:</label>
          <input
            type="text"
            className="form-control"
            name="fromAccount"
            value={formData.fromAccount}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>To Account Number:</label>
          <input
            type="text"
            className="form-control"
            name="toAccount"
            value={formData.toAccount}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
