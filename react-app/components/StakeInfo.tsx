// components/StakeInfo.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StakeInfoProps {
    userAddress: string;
}

const StakeInfo: React.FC<StakeInfoProps> = ({ userAddress }) => {
    const [stake, setStake] = useState<number>(0);

    useEffect(() => {
        if (userAddress) {
            axios.get(`/getStake/${userAddress}`)
                .then(response => setStake(response.data.stake))
                .catch(error => console.error('Error fetching stake', error));
        }
    }, [userAddress]);

    return (
        <div>
            <h1>Your Stake: {stake}</h1>
        </div>
    );
}

export default StakeInfo;
