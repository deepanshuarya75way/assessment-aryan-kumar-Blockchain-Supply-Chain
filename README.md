# Prerequisites 

Make sure you have installed:

_Node.js 22+
_Git 

# Run the project 

Clone the repository:

git clone https://github.com/Aryan-0701-pixel/Blockchain-Supply-Chain.git 

cd Blockchain-Supply-Chain

# Install dependencies 

npm install

Create your .env file 

Then start the complete application with one command:

npm start 

That's It!!!


# For Interviewers

You do not need to manuaaly run separate commands for the blockchain, smart contrat deployment, backend or frontend;

Simply run:

npm install
npm start

The Complete Blockchain Supply Chain application will start automatically.


# Blockchain Supply Chain Tracking System

A blockchain-based supply chain tracking system that records product information and movement history on the Ethereum blockchain.

The project provides a transparent and tamper-resistant way to track products from their origin through different stages of the supply chain.

---

## Features

- Add new products to the blockchain
- Store product name and origin
- Track product movement between locations
- View complete product history
- Generate and track products using Product ID
- REST API using Node.js and Express
- Smart contract developed using Solidity
- Local Ethereum blockchain using Hardhat
- Frontend dashboard for interacting with the system
- Blockchain-based data storage
- Transparent and tamper-resistant records

---

## Technologies Used

### Blockchain

- Solidity
- Ethereum
- Hardhat
- Ethers.js

### Backend

- Node.js
- Express.js
- REST API
- CORS

### Frontend

- HTML
- CSS
- JavaScript

### Development Tools

- Visual Studio Code
- Git
- GitHub
- PowerShell

---

## Project Architecture

```text
Frontend
   │
   │ HTTP Requests
   ▼
Node.js + Express Backend
   │
   │ Ethers.js
   ▼
Solidity Smart Contract
   │
   ▼
Ethereum / Hardhat Blockchain