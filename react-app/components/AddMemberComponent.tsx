// components/AddMemberComponent.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AddMemberComponent: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addMember = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await axios.post("http:localhost:3001/addMember", { address });
      setMessage(response.data);
    } catch (error: any) {
      setMessage(error.response?.data || 'Error occurred while adding member');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address to add as member"
      />
      <button onClick={addMember} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Member'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMemberComponent;
