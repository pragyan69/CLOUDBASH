Staking Contract deployed to: 0x87d4c9f88463AdBBC8B4fC4499A3B4c7083fFd3f


updated contract address : 0x2e2A769f20133D402192282d8Baa44545A7BD7e0


Address added : 0xf7eD5AEd83921E1e1e19adb506954bE031D0E4b3


userRegistery contract : 0x7aF2c1d17f05b4533851c75fafE580c884267a24


const contractAddress = '0x7aF2c1d17f05b4533851c75fafE580c884267a24'; // Replace with your contract address
        const contractABI = [
            {
                "_format": "hh-sol-artifact-1",
                "contractName": "UserRegistery",
                "sourceName": "contracts/UserRegistery.sol",
                "abi": [
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
                ],
               
              }
              
        ];