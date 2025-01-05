"use client";

// app/questions/page.js
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { ethers } from "ethers";
import Link from "next/link";
import QuestionAnswerABI from "../../contracts/QuestionAnswer.json";
const contractAddress = "0xf3448613f17675F0Ad6c02e337834599E881aB85";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch questions
  const fetchQuestions = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, QuestionAnswerABI, provider);
    const questionCount = await contract.questionCount();

    const fetchedQuestions = [];
    for (let i = 1; i <= questionCount; i++) {
      const question = await contract.questions(i);
      const answerCount = await contract.questions(i).then((question) => question.answerCount);
      const answers = [];
      for (let j = 0; j < answerCount; j++) {
        const answer = await contract.answers(i, j);
        answers.push(answer);
      }
      fetchedQuestions.push({ ...question, answers });
    }

    // Sort questions by ID (newest first)
    fetchedQuestions.sort((a, b) => b.id - a.id);

    setQuestions(fetchedQuestions);
    setFilteredQuestions(fetchedQuestions);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = questions.filter((q) => q.content.toLowerCase().includes(term));
    setFilteredQuestions(filtered);
    setCurrentPage(1);
  };

  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-6 flex flex-col">
      
      <header className="flex justify-between items-center pb-4 border-b border-neutral-800">
        <Link href="/questions">
        <h1 className="text-2xl font-bold">Questions</h1>
        </Link>
        <div className="flex justify-between items-center gap-4">
        <Link href="/account">
        <h1 className="hidden md:block text-md font-medium hover:underline">Go to Account ↗</h1>
        </Link> 
        <button
          className="bg-neutral-700 hover:bg-neutral-600 transition-colors px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => setNewQuestionModalOpen(true)}
        >
          Ask a Question
        </button>
        </div>
        
      </header>

      <main className="mt-6 flex-grow">
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search questions..."
            className="w-full px-4 py-2 mb-12 rounded-md bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>

        <div className="space-y-4">
          {paginatedQuestions.map((q) => (
            <div
              key={q.id.toString()}
              className="bg-neutral-800 p-4 rounded-md cursor-pointer hover:bg-neutral-700 transition-colors"
              onClick={() => { setCurrentQuestion(q); setModalOpen(true); }}
            >
              <p className="text-base font-medium">
                <strong>#{q.id.toString()}</strong> {q.content}
              </p>
              <h3 className="text-sm font-bold mt-2">Answers:</h3>
              {q.answers.length > 0 ? (
                q.answers.map((a, idx) => (
                  <p key={idx} className="text-sm text-neutral-400">
                    - {a.content} (by {a.responder})
                  </p>
                ))
              ) : (
                <p className="text-sm text-neutral-500">No answers yet.</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {[...Array(Math.ceil(filteredQuestions.length / itemsPerPage)).keys()].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-md ${
                currentPage === page + 1
                  ? "bg-neutral-700 text-neutral-100"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
              }`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <Modal question={currentQuestion} onClose={() => setModalOpen(false)} />
      )}
      {newQuestionModalOpen && (
        <Modal
          onClose={() => setNewQuestionModalOpen(false)}
          isNewQuestion
          newQuestionContent={newQuestionContent}
          setNewQuestionContent={setNewQuestionContent}
          fetchQuestions={fetchQuestions}
        />
      )}
    </div>
  );
}