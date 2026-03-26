// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract StudentRegistry {
    address public owner;

    struct Student {
        string name;
        uint256 RollNumber;
    }

    mapping(address => Student) public students;

    event StudentRegistered(address indexed studentAddress, string name, uint256 RollNumber);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier studentExists(address _studentAddress) {
        require(students[_studentAddress].RollNumber > 0, "Student does not exist");
        _;
    }

    function registerStudent(string memory _name, uint256 _rollNumber) public onlyOwner {
        students[msg.sender] = Student(_name, _rollNumber);
        emit StudentRegistered(msg.sender, _name, _rollNumber);
    }

    function getStudent(address _studentAddress) public view studentExists(_studentAddress) returns (string memory, uint256) {
        Student memory student = students[_studentAddress];
        return (student.name, student.RollNumber);
    }
}