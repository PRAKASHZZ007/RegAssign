import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, address }),
    });

    const data = await response.json();
    setMessage(data.message);
    setName('');
    setAddress('');
  };

  return (
    <div className="form-container">
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
         <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
       
       <div>
         <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
       </div>
       

        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
