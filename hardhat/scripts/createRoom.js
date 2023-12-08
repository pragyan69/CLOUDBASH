// scripts/createRoomTask.js
const { ethers } = require("ethers");

task("createRoom", "Creates a room in the contract")
    .addParam("address", "The address of the member creating the room")
    .addParam("name", "The name of the room")
    .addParam("description", "The description of the room")
    .addParam("memberLimit", "The member limit of the room")
    .addParam("validityInDays", "The validity of the room in days")
    .setAction(async (taskArgs, { ethers, network }) => {
        const { address, name, description, memberLimit, validityInDays } = taskArgs;

        const contractAddress = '0xE2E90CE7E742AaE4D32A0A66381Bb1b9Db7277f4';
        const contractABI = [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "roomId",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "featureName",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "featureDescription",
                  "type": "string"
                }
              ],
              "name": "addRoomFeature",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "member",
                  "type": "address"
                }
              ],
              "name": "assignMember",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "description",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "memberLimit",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "validityInDays",
                  "type": "uint256"
                }
              ],
              "name": "createRoom",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getAllMembers",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "",
                  "type": "address[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "roomId",
                  "type": "uint256"
                }
              ],
              "name": "getRoomFeatures",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "name",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "description",
                      "type": "string"
                    }
                  ],
                  "internalType": "struct StakingUpdated.Feature[]",
                  "name": "",
                  "type": "tuple[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "roomId",
                  "type": "uint256"
                }
              ],
              "name": "getRoomIdeas",
              "outputs": [
                {
                  "internalType": "string[]",
                  "name": "",
                  "type": "string[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "roomId",
                  "type": "uint256"
                }
              ],
              "name": "getRoomMembers",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "",
                  "type": "address[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getRooms",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "name",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "description",
                      "type": "string"
                    },
                    {
                      "internalType": "uint256",
                      "name": "memberLimit",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "validity",
                      "type": "uint256"
                    },
                    {
                      "internalType": "address[]",
                      "name": "members",
                      "type": "address[]"
                    },
                    {
                      "components": [
                        {
                          "internalType": "string",
                          "name": "name",
                          "type": "string"
                        },
                        {
                          "internalType": "string",
                          "name": "description",
                          "type": "string"
                        }
                      ],
                      "internalType": "struct StakingUpdated.Feature[]",
                      "name": "features",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct StakingUpdated.Room[]",
                  "name": "",
                  "type": "tuple[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "isMember",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "roomId",
                  "type": "uint256"
                }
              ],
              "name": "joinRoom",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "listAllRooms",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "name",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "description",
                      "type": "string"
                    },
                    {
                      "internalType": "uint256",
                      "name": "memberLimit",
                      "type": "uint256"
                    },
                    {
                      "internalType": "uint256",
                      "name": "validity",
                      "type": "uint256"
                    },
                    {
                      "internalType": "address[]",
                      "name": "members",
                      "type": "address[]"
                    },
                    {
                      "components": [
                        {
                          "internalType": "string",
                          "name": "name",
                          "type": "string"
                        },
                        {
                          "internalType": "string",
                          "name": "description",
                          "type": "string"
                        }
                      ],
                      "internalType": "struct StakingUpdated.Feature[]",
                      "name": "features",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct StakingUpdated.Room[]",
                  "name": "",
                  "type": "tuple[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "memberIdeas",
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
              "inputs": [],
              "name": "owner",
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
                  "name": "member",
                  "type": "address"
                }
              ],
              "name": "revokeMember",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "roomCount",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "rooms",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "description",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "memberLimit",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "validity",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "stake",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "stakes",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "roomId",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "idea",
                  "type": "string"
                }
              ],
              "name": "submitIdea",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "withdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ] ;

        // Connect to the network
        const provider = ethers.provider;

        // Use the provided address's private key
        const privateKey = process.env.PRIVATE_KEY

        const signer = new ethers.Wallet(privateKey, provider);
 bnm, vcb
        const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        try {
            const tx = await contract.createRoom(name, description, memberLimit, validityInDays);
            await tx.wait();
            console.log(`Room created with name: ${name}`);
        } catch (error) {
            console.error('Error in createRoom task:', error);
        }
    });

module.exports = {};
