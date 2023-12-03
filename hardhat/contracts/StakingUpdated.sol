// SPDX-License-Identidifier:MIT
pragma solidity 0.8.20;

contract StakingUpdated {
    address public owner;
    mapping(address => uint256) public stakes;
    mapping(address => bool) public isMember;
    mapping(address => string[]) public memberIdeas;

    struct Room {
        string name;
        address[] members;
    }
    mapping(uint256 => Room) public rooms;
    uint256 public roomCount = 0;

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

    function createRoom(string memory roomName) public {
        require(isMember[msg.sender], "Only members can create rooms");
        Room storage room = rooms[roomCount++];
        room.name = roomName;
        room.members.push(msg.sender);
    }

    function getRooms() public view returns (Room[] memory) {
        Room[] memory allRooms = new Room[](roomCount);
        for (uint i = 0; i < roomCount; i++) {
            allRooms[i] = rooms[i];
        }
        return allRooms;
    }

    function joinRoom(uint256 roomId) public {
        require(isMember[msg.sender], "Only members can join rooms");
        require(roomId < roomCount, "Invalid room ID");
        rooms[roomId].members.push(msg.sender);
    }

    function getAllMembers() public view returns (address[] memory) {
        address[] memory members = new address[](roomCount);
        // Logic to populate members array
        return members;
    }

    function listAllRooms() public view returns (string[] memory) {
        string[] memory allRoomNames = new string[](roomCount);
        for (uint i = 0; i < roomCount; i++) {
            allRoomNames[i] = rooms[i].name;
        }
        return allRoomNames;
    }



    // ... rest of your contract
}
