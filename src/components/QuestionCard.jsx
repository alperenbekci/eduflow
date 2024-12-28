"use client";
import { useState } from "react";

export default function QuestionCard({
  question,
  userName,
  initialStatus,
  answers: initialAnswers,
}) {
  const [status, setStatus] = useState(initialStatus);
  const [answers, setAnswers] = useState(initialAnswers || []);
  const [answerInput, setAnswerInput] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!answerInput.trim()) return;

    setAnswers([...answers, { text: answerInput, user: "You" }]);
    setAnswerInput("");
    setStatus("Answered");
    setIsAnswering(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white space-y-4 ">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-blue-500">{userName}</h3>
          <p className="text-gray-600">{question}</p>
        </div>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-md ${
            status === "Answered"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
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
      {isAnswering ? (
        <form onSubmit={handleAnswerSubmit} className="flex space-x-2">
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
  );
}
