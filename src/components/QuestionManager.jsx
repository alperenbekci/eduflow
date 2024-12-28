"use client";

import { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import FilterSearch from "./FilterSearch";
import { Modal } from "./Modal";

export default function QuestionManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addQuestion = (newQuestion) => {
    setQuestions((prev) => [newQuestion, ...prev]);
  };

  const handleSearch = (term) => {
    if (!term.trim()) {
      setFilteredQuestions(questions);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = questions.filter(
      (q) =>
        q.userName.toLowerCase().includes(lowerTerm) ||
        q.title.toLowerCase().includes(lowerTerm) ||
        q.question.toLowerCase().includes(lowerTerm)
    );
    setFilteredQuestions(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-500">EduFlow Questions</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        >
          Ask a Question
        </button>
      </div>

      <FilterSearch onSearch={handleSearch} />

      <QuestionList questions={filteredQuestions} setQuestions={setQuestions} />

      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={addQuestion} />
    </div>
  );
}
