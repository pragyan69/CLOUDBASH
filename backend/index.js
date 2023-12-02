import express from 'express';
import Web3 from 'web3';
import cors from 'cors'; // Import cors
import { exec } from 'child_process';
const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

const port = 3001;
const STAKING_CONTRACT_ADDRESS = "0x87d4c9f88463AdBBC8B4fC4499A3B4c7083fFd3f";
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');

// Define the ABI directly in your code
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
    },
    
    

];

  


console.log("ABI Loaded:", STAKING_CONTRACT_ABI);

const stakingContract = new web3.eth.Contract(STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS);

console.log("Contract methods:", stakingContract.methods);

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


fetch('http://localhost:3001/addMember', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address: '0xYourAddressHere' }),
});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
