const contractAddress = '0x7aF2c1d17f05b4533851c75fafE580c884267a24'; // Replace with your contract address
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