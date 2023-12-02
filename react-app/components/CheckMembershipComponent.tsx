// components/CheckMembershipComponent.tsx
import React, { useState } from 'react';
import axios from 'axios';

const CheckMembershipComponent = () => {
  const [address, setAddress] = useState('');
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkMembership = async () => {
    setIsLoading(true);
    setIsMember(null);
    setErrorMessage('');
    try {
      const response = await axios.get(`http://localhost:3001/isMember/${address}`);
      setIsMember(response.data.isMember);
    } catch (error: any) {
      setErrorMessage(error.response?.data || 'Error occurred while fetching membership status');
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
        placeholder="Enter address to check membership" 
      />
      <button onClick={checkMembership} disabled={isLoading}>
        {isLoading ? 'Checking...' : 'Check Membership'}
      </button>
      {isMember !== null && (
        <p>{isMember ? 'Address is a member of the network.' : 'Address is not a member of the network.'}</p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CheckMembershipComponent;
