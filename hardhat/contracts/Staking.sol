// SPDX-License-Identidifier:MIT
pragma solidity 0.8.20;

contract Staking {
    address public owner;
    mapping(address => uint256) public stakes;
    mapping(address => bool) public isMember;
    mapping(address => string[]) public memberIdeas;

    constructor() {
        owner = msg.sender;
    
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function stake() public payable {
        require(msg.value >= 0, "Stake amount must be non-negative");
        stakes[msg.sender] += msg.value;
        isMember[msg.sender] = true;
    }

    function withdraw() public {
        uint256 stakedAmount = stakes[msg.sender];
        require(stakedAmount > 0, "No stake to withdraw");
        stakes[msg.sender] = 0;
        isMember[msg.sender] = false;
        payable(msg.sender).transfer(stakedAmount);
    }

    function assignMember(address member) public onlyOwner {
        isMember[member] = true;
    }

    function submitIdea(string memory idea) public {
        require(isMember[msg.sender], "Only members can submit ideas");
        memberIdeas[msg.sender].push(idea);
    }

    function revokeMember(address member) public onlyOwner {
        isMember[member] = false;
    }

    // ... rest of your contract
}
