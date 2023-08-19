import React, { useState } from 'react';

// Function to add userShare Entry to database
const makeUserShareRequest = async (formData) => {
  const { url, chainAddress } = formData;
  // Create a new Entry using axios
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.post(
    '/api/v1/userdata',
    { url, chainAddress },
    config
  );
};

// Function to Access all userShare Data
const getUserShareData = async () => {
  // fetch all userShare using axios
  const { userSharedata } = await axios('/api/v1/userdata/getdata');
  return userSharedata;
};

const userShareForm = () => {
  const [formData, setFormData] = useState({
    url: '',
    chainAddress: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makeUserShareRequest(formData);
  };

  return (
    <div>
      <h2>Referral Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='url'>URL:</label>
          <input
            type='text'
            id='url'
            name='url'
            value={formData.url}
            onChange={handleInputChange}
            placeholder='Enter URL'
            required
          />
        </div>
        <div>
          <label htmlFor='chainAddress'>chain Address:</label>
          <input
            type='text'
            id='chainAddress'
            name='chainAddress'
            value={formData.chainAddress}
            onChange={handleInputChange}
            placeholder='Enter chain Address'
            required
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default userShareForm;
