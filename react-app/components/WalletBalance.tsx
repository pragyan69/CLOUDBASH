import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';

interface WalletBalanceProps {
    userAddress: string;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ userAddress }) => {
    const [usdBalance, setUsdBalance] = useState<string>('');

    useEffect(() => {
        const fetchBalance = async () => {
            const web3 = new Web3(Web3.givenProvider || "https://alfajores-forno.celo-testnet.org");

            try {
                const balanceInWei = await web3.eth.getBalance(userAddress);
                const balanceInCelo = web3.utils.fromWei(balanceInWei, 'ether');

                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=celo&vs_currencies=usd');
                const celoToUsdRate = response.data.celo.usd;
                const usdValue = (parseFloat(balanceInCelo) * celoToUsdRate).toFixed(2);

                setUsdBalance(usdValue);
            } catch (error) {
                console.error('Error fetching balance or conversion rate:', error);
            }
        };

        if (userAddress) {
            fetchBalance();
        }
    }, [userAddress]);

    return (
        <div>
            <p>Your Wallet Balance (USD): ${usdBalance}</p>
        </div>
    );
};

export default WalletBalance;
