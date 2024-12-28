"use client";

import { useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import { Modal } from "../../components/Modal";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewQuestion = (newQuestion) => {
    setQuestions([newQuestion, ...questions]);
  };

  return (
    <div className="p-6 space-y-6">
      {questions.map((q, index) => (
        <QuestionCard
          key={index}
          userName={q.userName}
          question={q.question}
          initialStatus="Pending"
          answers={[]}
        />
      ))}

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-lg"
      >
        Ask a Question
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewQuestion}
      />
    </div>
  );
}
