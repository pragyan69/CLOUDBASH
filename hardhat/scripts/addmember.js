// scripts/assignMemberTask.js
task("assignMember", "Adds an address as a member")
    .addParam("address", "The address to be added as a member")
    .setAction(async ({ address }, hre) => {
        const contractAddress = '0x2e2A769f20133D402192282d8Baa44545A7BD7e0'; 
        const contractABI = [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
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
                  "name": "roomName",
                  "type": "string"
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
                      "internalType": "address[]",
                      "name": "members",
                      "type": "address[]"
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
          ];
          

        const provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
        const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

        const contract = new hre.ethers.Contract(
            contractAddress, // Replace with your contract address
            contractABI, // Replace with your contract ABI
            signer
        );

        try {
            const tx = await contract.assignMember(address);
            await tx.wait();
            console.log('Address added as a member:', address);
        } catch (error) {
            console.error('Error in assignMember task:', error);
        }

        
    });

module.exports = {};
