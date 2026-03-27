# Blockchain Semester 5

Hardhat project containing a Solidity smart contract, StudentRegistry, with test coverage for core behavior and reverts.

## Project Structure

- contracts/StudentRegistry.sol: Student registry smart contract
- test/StudentRegistry.js: Hardhat test suite using Chai
- hardhat.config.js: Hardhat configuration

## Contract Info

### Contract Name

StudentRegistry

### Solidity Version

0.8.28

### State Variables

- owner (address): Deployer address with privileged access
- students (mapping(address => Student)): Student records by address

### Student Struct

- name (string)
- RollNumber (uint256)

### Event

- StudentRegistered(address indexed studentAddress, string name, uint256 RollNumber)

### Modifiers

- onlyOwner: Restricts function calls to the contract owner
- studentExists(address): Requires RollNumber > 0 for the queried student address

### Public Functions

- registerStudent(string \_name, uint256 \_rollNumber)
  - Access: onlyOwner
  - Behavior: Stores student data in students[msg.sender] and emits StudentRegistered
- getStudent(address \_studentAddress) returns (string, uint256)
  - Access: public view
  - Behavior: Returns name and RollNumber for a registered address
  - Reverts if no student record exists

## Test Info

The test suite in test/StudentRegistry.js validates:

1. Successful registration and retrieval of student data
2. Revert when a non-owner calls registerStudent
3. Correct StudentRegistered event emission and arguments
4. Revert when fetching an unregistered student

## How To Run

1. Install dependencies:

```bash
npm install
```

2. Run tests:

```bash
npx hardhat test
```

## Notes

- Registration currently writes to students[msg.sender], so the owner can only register their own address using registerStudent as implemented.
- A RollNumber of 0 is treated as non-existent by studentExists.

## Live deployment
StudentRegistry deployed on Sepolia testnet.
Contract address: 0x3B309AD222d9661BEd53660d3532bB6fc61d7225
Etherscan: https://sepolia.etherscan.io/address/0x3B309AD222d9661BEd53660d3532bB6fc61d7225
