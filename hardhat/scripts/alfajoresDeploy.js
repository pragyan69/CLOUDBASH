// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    const StakingContract = await hre.ethers.getContractFactory("Staking");
    const stakingContract = await StakingContract.deploy();

    await stakingContract.deployed();

    console.log("Staking Contract deployed to:", stakingContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
