"use client";

import { useState } from "react";
import { ethers } from "ethers";
import QuestionAnswerABI from "../contracts/QuestionAnswer.json";
const contractAddress = "0xf3448613f17675F0Ad6c02e337834599E881aB85";

export default function Modal({
  question,
  onClose,
  isNewQuestion = false,
  newQuestionContent,
  setNewQuestionContent,
  fetchQuestions,
}) {
  const [answerContent, setAnswerContent] = useState("");

  // Cüzdan adresini kısaltmak için yardımcı fonksiyon
  const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const addAnswer = async () => {
    if (!answerContent) return alert("Please enter an answer!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, QuestionAnswerABI, signer);

    try {
      const tx = await contract.addAnswer(question.id, answerContent);
      await tx.wait();

      setAnswerContent("");
      fetchQuestions();
      onClose();
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const addQuestion = async () => {
    if (!newQuestionContent) return alert("Please enter a question!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, QuestionAnswerABI, signer);

    try {
      const tx = await contract.addQuestion(newQuestionContent);
      await tx.wait();

      setNewQuestionContent("");
      fetchQuestions();
      onClose();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-900 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-neutral-800 p-6 rounded-lg w-11/12 max-w-md">
        <h2 className="text-lg font-semibold text-neutral-100">
          {isNewQuestion ? "Ask a Question" : `Answer to #${question.id}`}
        </h2>

        {isNewQuestion ? (
          <>
            <textarea
              value={newQuestionContent}
              onChange={(e) => setNewQuestionContent(e.target.value)}
              className="bg-neutral-700 text-neutral-100 w-full p-3 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="Write your question here..."
            />
            <button
              onClick={addQuestion}
              className="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 mt-4 rounded-md text-white w-full"
            >
              Ask Question
            </button>
          </>
        ) : (
          <>
            <p className="mt-4 text-neutral-200">{question.content}</p>
            <p className="text-sm text-neutral-400 mt-2">
              Asked by: {shortenAddress(question.asker)}
            </p>
            <textarea
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              className="bg-neutral-700 text-neutral-100 w-full p-3 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="Write your answer here..."
            />
            <button
              onClick={addAnswer}
              className="bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 mt-4 rounded-md text-white w-full"
            >
              Submit Answer
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 mt-4 rounded-md text-white w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}
