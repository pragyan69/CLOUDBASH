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
const STAKING_CONTRACT_ADDRESS = "0xC273B1bF866c227798aD8d48bDbe9041C991b4C6";
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const STAKING_CONTRACT_ABI = [
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

  const contract = new web3.eth.Contract(STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS)

  // functions
function sendTransaction(methodName, args, fromAddress) {
    console.log(`Sending transaction: ${methodName} with args: ${args} from: ${fromAddress}`);
    return Promise.resolve({ methodName, args, from: fromAddress, txHash: 'mockTxHash' });
}

async function sendTransaction2(methodName, args, fromAddress, privateKey) {
    // Make sure the contract instance is defined
    if (!contract || !contract.methods[methodName]) {
        throw new Error('Contract is not defined or methodName is incorrect.');
    }

    // Estimate gas price and limit
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await contract.methods[methodName](...args).estimateGas({ from: fromAddress });

    // Transaction object
    const txObject = {
        from: fromAddress,
        to: contract.options.address, // Make sure contract.options and contract.options.address are available
        data: contract.methods[methodName](...args).encodeABI(),
        gas: gasLimit,
        gasPrice: gasPrice
    };
    // debugging
    console.log('Transaction object:', txObject);
    if (!privateKey) {
        throw new Error('Private key is undefined or not provided.');
    }
    console.log('Private Key:', privateKey); 


    // Sign the transaction with the provided private key
    const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
}

// logging out the importat data 
console.log("ABI Loaded:", STAKING_CONTRACT_ABI);
const stakingContract = new web3.eth.Contract(STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS);
console.log("Contract methods:", stakingContract.methods);

// this will check if the address is member or not
app.get('/isMember/:address', async (req, res) => {
    try {
        console.log("Checking membership for address:", req.params.address);
        const isMember = await stakingContract.methods.isMember(req.params.address).call();
        console.log("Membership status:", isMember);
        res.json({ isMember });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send(error.toString());
    }
});

// this will check how much token, currency the member is staking or not 
app.get('/getStake/:address', async (req, res) => {
    try {
        // Accessing the stakes mapping correctly
        const stake = await stakingContract.methods.stakes(req.params.address).call();
        res.json({ stake: stake.toString() });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
    }
});

// this function will add member 
app.post('/addMember', (req, res) => {
    // Ensuring that address is treated as a string
    if (!req.body || typeof req.body.address !== 'string') {
        return res.status(400).json({ error: 'Address is required in the request body and must be a string.' });
    }
    const { address } = req.body;
    const command = `npx hardhat assignMember --network alfajores --address "${address}"`;
    exec(command, { cwd: '../hardhat' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: `Address ${address} added successfully`, output: stdout });
    });
});

// this function will submit idea 
app.post('/submitIdea', async (req, res) => {
    const { address, idea } = req.body;

    if (!address || typeof address !== 'string') {
        return res.status(400).json({ error: 'Address is required and must be a string.' });
    }

    if (!idea || typeof idea !== 'string') {
        return res.status(400).json({ error: 'Idea is required and must be a string.' });
    }

    try {
        // Check if the address is a member
        const isMember = await stakingContract.methods.isMember(address).call();
        if (!isMember) {
            return res.status(403).json({ error: 'Address is not a member.' });
        }


        const tx = await sendTransaction('submitIdea', [idea], address);

        res.json({ message: 'Idea submitted successfully', transaction: tx });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send(error.toString());
    }
});


// creating room and sending transaction to the blockchain 

app.post('/createRoom', async (req, res) => {
    const { address, roomName } = req.body;

    if (!address || typeof address !== 'string') {
        return res.status(400).json({ error: 'Address is required and must be a string.' });
    }

    if (!roomName || typeof roomName !== 'string') {
        return res.status(400).json({ error: 'Room name is required and must be a string.' });
    }

    try {
        const isMember = await stakingContract.methods.isMember(address).call();
        if (!isMember) {
            return res.status(403).json({ error: 'Address is not a member.' });
        }

        // Retrieve the private key from an environment variable or secure storage
        const privateKey = process.env.PRIVATE_KEY; // Replace with your secure key retrieval method
        if (!privateKey) {
            throw new Error('Private key not found. Make sure to set it in your environment variables.');
        }

        // Send transaction to create a room
        const tx = await sendTransaction2('createRoom', [roomName], address, privateKey);

        // Manually convert all properties of tx to strings if they are BigInt
        const serializedTx = {};
        for (const property in tx) {
            if (tx.hasOwnProperty(property)) {
                serializedTx[property] = typeof tx[property] === 'bigint' ? tx[property].toString() : tx[property];
            }
        }

        res.status(200).json({ message: 'Room created successfully', transaction: serializedTx });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});




// to list the rooms 
app.get('/listRooms', async (req, res) => {
    try {
        const allRooms = await stakingContract.methods.getRooms().call();
        res.status(200).json({ rooms: allRooms });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



