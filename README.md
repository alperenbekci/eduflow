# Eduflow

Eduflow is a decentralized, Web3-based Q&A platform built on EduChain, enabling users to ask and answer questions entirely on-chain. Inspired by platforms like StackOverflow, Eduflow offers a modern and transparent way to engage with knowledge-sharing communities.

## Features

- **On-Chain Functionality**: Every question and answer is stored on EduChain, ensuring transparency and immutability.
- **Web3 Integration**: Connect your wallet to interact with the platform seamlessly.
- **Question Management**:
  - Ask questions with a simple and intuitive interface.
  - Provide answers to existing questions to contribute to the community.
- **Filtering and Searching**: Easily search and filter questions to find exactly what you’re looking for.
- **Pagination**: View questions in manageable chunks, ensuring a smooth and responsive user experience.
- **Sorting**: Questions are displayed in order of most recent activity by default.

## Technology Stack

- **Frontend**: Built with Next.js and React, providing a modern and responsive user interface.
- **Smart Contracts**: Powered by Solidity and deployed on the EduChain network.
- **Web3 Provider**: Uses ethers.js for seamless wallet integration and blockchain interaction.
- **UI Design**: Tailwind CSS for a sleek, dark-themed interface.

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v16 or later)
- Metamask extension installed in your browser

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/alperenbekci/eduflow.git
   cd eduflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```



3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Connect Wallet
Click the **Connect Wallet** button in the header to link your Metamask wallet to the application.

### Ask a Question
1. Click on the **Ask a Question** button.
2. Enter your question in the modal and submit.

### Answer a Question
1. Select a question from the list.
2. Provide your answer in the modal and submit.

### Search and Filter
Use the search bar to filter questions by keywords.

### Pagination
Navigate through pages to view more questions.

## Smart Contract

The smart contract handles all operations for questions and answers. It includes:

- Adding new questions
- Adding answers to questions
- Fetching all questions and their associated answers

### ABI
The ABI for the contract can be found in the `contracts/QuestionAnswer.json` file.

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Acknowledgments

- Inspired by [StackOverflow](https://stackoverflow.com/)
- Built with [Next.js](https://nextjs.org/) and [EduChain](https://educhain.io/)

---

Start asking and answering questions on-chain with Eduflow today!

