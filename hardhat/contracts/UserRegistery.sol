// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserRegistery {
    event UserRegistered(address indexed userAddress, string userId, bytes32 indexed hashedNumber);
    
    // Mapping from user ID to address
    mapping(string => address) private userAddresses;
    
    // Mapping from address to user ID
    mapping(address => string) private userIds;
    
    // Mapping from hashed number to address
    mapping(bytes32 => address) private numberToAddressMapping;
    
    // New mapping from address to hashed phone number
    mapping(address => bytes32) private addressToHashedNumber;

    function registerUser(string calldata userId, bytes32 hashedNumber) external {
        require(userAddresses[userId] == address(0), "User ID already registered.");
        require(numberToAddressMapping[hashedNumber] == address(0), "Mobile number already registered");
        require(addressToHashedNumber[msg.sender] == 0, "Address already has a registered number");

        userAddresses[userId] = msg.sender;
        userIds[msg.sender] = userId;
        numberToAddressMapping[hashedNumber] = msg.sender;
        addressToHashedNumber[msg.sender] = hashedNumber;

        emit UserRegistered(msg.sender, userId, hashedNumber);
    }

    function getUserAddressById(string calldata userId) external view returns (address) {
        return userAddresses[userId];
    }

    function getUserId(address userAddress) external view returns (string memory) {
        return userIds[userAddress];
    }

    function getUserAddressByNumber(bytes32 hashedNumber) external view returns (address) {
        return numberToAddressMapping[hashedNumber];
    }

    // New function to get the hashed phone number by user address
    function getHashedNumberByAddress(address userAddress) external view returns (bytes32) {
        return addressToHashedNumber[userAddress];
    }
}
