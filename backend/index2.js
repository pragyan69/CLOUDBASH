import express from 'express';
import Web3 from 'web3';
import cors from 'cors'; // Import cors
import { exec } from 'child_process';
const app = express();
// Enable CORS for all origins
app.use(cors());
app.use(express.json());
const port = 3001;
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');

const contractAddress = "0x7aF2c1d17f05b4533851c75fafE580c884267a24"
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
    // ... include other functions or events as needed
];


console.log("ABI Loaded:", contractABI);
const stakingContract = new web3.eth.Contract(contractABI,contractAddress);

console.log("Contract methods:", stakingContract.methods);