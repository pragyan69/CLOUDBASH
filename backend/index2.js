import express from 'express';
import Web3 from 'web3';
import cors from 'cors';
import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');

const contractAddress = '0x065b97dC54b02FE5CF72332D4ef1204691de68e3'; // Replace with your contract address
const contractABI = [
        
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "userId",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "hashedNumber",
          "type": "bytes32"
        }
      ],
      "name": "UserRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getHashedNumberByAddress",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "userId",
          "type": "string"
        }
      ],
      "name": "getUserAddressById",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hashedNumber",
          "type": "bytes32"
        }
      ],
      "name": "getUserAddressByNumber",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUserId",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "userId",
          "type": "string"
        },
        {
          "internalType": "bytes32",
          "name": "hashedNumber",
          "type": "bytes32"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
    console.error('Fatal Error: PRIVATE_KEY is not defined in your environment variables.');
    process.exit(1);
}

// Ensure the privateKey starts with '0x'
const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`; // Ensure this is set in your .env file

const stakingContract = new web3.eth.Contract(contractABI, contractAddress);

// this function is for registering the user with the phone no.
app.post('/registerUser', async (req, res) => {
    const { phoneNumber, userAddress } = req.body;

    if (!phoneNumber || !userAddress) {
        return res.status(400).send('Phone number and address are required.');
    }

    try {
        const hashedNumber = web3.utils.soliditySha3(phoneNumber);
        const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;

        const registerUserTx = stakingContract.methods.registerUser(userAddress, hashedNumber);
        const encodedABI = registerUserTx.encodeABI();

        // Estimating Gas
        const gasEstimate = await registerUserTx.estimateGas({ from: web3.eth.defaultAccount });

        const tx = {
            from: web3.eth.defaultAccount,
            to: contractAddress,
            gas: gasEstimate, // Use the estimated gas
            gasPrice: await web3.eth.getGasPrice(), // Get current gas price
            data: encodedABI,
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, formattedPrivateKey);
        const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Convert all BigInt properties to strings for JSON serialization
        const serializedReceipt = JSON.parse(JSON.stringify(transactionReceipt, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.json({ message: 'User registered successfully', transactionReceipt: serializedReceipt });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to register user');
    }
});

// this function will return all the users









app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
