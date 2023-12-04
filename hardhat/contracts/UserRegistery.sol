// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserRegistery {
    event UserRegistered(address indexed userAddress, string userId, bytes32 indexed hashedNumber);
    mapping(string => address) private userAddresses;
    mapping(address => string) private userIds;


    mapping(bytes32 => address) private numberToAddressMapping;

    function registerUser(string calldata userId, bytes32 hashedNumber) external {
        require(userAddresses[userId] == address(0), "User ID already registered.");
        require(numberToAddressMapping[hashedNumber] == address(0), "Mobile number already registered");

        userAddresses[userId] = msg.sender;
        userIds[msg.sender] = userId;
        numberToAddressMapping[hashedNumber] = msg.sender;

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
}
