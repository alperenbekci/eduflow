// src/components/Modal.jsx
"use client";

import { useState } from "react";

export function Modal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !question.trim() || !userName.trim()) return;

    onSubmit({ title, question, userName, status: "Pending", answers: [] });
    setTitle("");
    setQuestion("");
    setUserName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 space-y-4">
        <h2 className="text-lg font-semibold text-blue-500">
          Ask a New Question
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Your Question"
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
