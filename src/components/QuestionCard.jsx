"use client";

import { useState } from "react";

export default function QuestionCard({ 
  question, 
  userName, 
  initialStatus, 
  answers, 
  onAnswerSubmit 
}) {
  const [answerInput, setAnswerInput] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    onAnswerSubmit(answerInput);
    setAnswerInput("");
    setIsAnswering(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-blue-500">{userName}</h3>
          <p className="text-gray-600">{question}</p>
        </div>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-md ${
            initialStatus === "Answered"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {initialStatus}
        </span>
      </div>

      {/* Answer Section */}
      <div className="space-y-2">
        {answers.map((answer, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md p-2 text-sm text-gray-800"
          >
            <strong>{answer.user}:</strong> {answer.text}
          </div>
        ))}
      </div>

      {/* Answer Input Section */}
      <div className="mt-2">
        {isAnswering ? (
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 border border-gray-300 rounded-md px-2 text-gray-600 py-1"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsAnswering(false)}
              className="text-gray-500 px-3 py-1 rounded-md hover:text-gray-700"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsAnswering(true)}
            className="text-blue-500 hover:underline text-sm"
          >
            Answer
          </button>
        )}
      </div>
    </div>
  );
}
