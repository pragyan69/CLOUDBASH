import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import StakeInfo from '../components/StakeInfo';
import WalletBalance from '../components/WalletBalance'; // Import WalletBalance component
import CheckMembershipComponent from '../components/CheckMembershipComponent';

export default function Home() {
  const [userAddress, setUserAddress] = useState('');
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        {/* Other content */}
      </div>
      {isConnected && (
        <>
          <div className="h2 text-center">Your address: {userAddress}</div>
          <WalletBalance userAddress={userAddress} /> {/* Display Wallet Balance */}
          <StakeInfo userAddress={userAddress} /> {/* Display Stake Info */}

          <CheckMembershipComponent/>
        </>
      )}
    </div>
  );
}
