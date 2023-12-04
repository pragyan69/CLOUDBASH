const { task } = require("hardhat/config");

task("getPhoneNumber", "Gets the phone number associated with a given address")
  .addParam("address", "The Ethereum address to query")
  .setAction(async (taskArgs, hre) => {
    const { address } = taskArgs;
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


    // Setup provider and contract
    const provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
    const contract = new hre.ethers.Contract(contractAddress, contractABI, provider);

    try {
      // Assuming the function name is `getPhoneNumberByAddress` and it returns a string or bytes32
      const phoneNumberOrHash = await contract.getHashedNumberByAddress(address);
      console.log(`Phone number (or hash) for address ${address}:`, phoneNumberOrHash);
    } catch (error) {
      console.error('Error retrieving phone number:', error);
    }
  });

module.exports = {};
