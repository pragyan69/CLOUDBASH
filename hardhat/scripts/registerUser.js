const { task } = require("hardhat/config");

task("registerUser", "Registers a user with a mobile number")
    .addParam("mobile", "The user's mobile number")
    .addParam("address", "The user's Ethereum address")
    .setAction(async (taskArgs, hre) => {
        const { mobile, address } = taskArgs;
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
      


        const provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
        const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

        const contract = new hre.ethers.Contract(contractAddress, contractABI, signer);

        const hashedMobileNumber = hre.ethers.utils.solidityKeccak256(['string'], [mobile]);

        try {
            const tx = await contract.registerUser(address, hashedMobileNumber);
            await tx.wait();
            console.log(`User registered with mobile number: ${mobile} and address: ${address}`);
        } catch (error) {
            console.error('Error in registerUser task:', error);
        }
    });

module.exports = {};
