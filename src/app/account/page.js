"use client";

// app/profile/page.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import QuestionAnswerABI from "../../contracts/QuestionAnswer.json";
import Link from "next/link";
const contractAddress = "0xf3448613f17675F0Ad6c02e337834599E881aB85";

export default function ProfilePage() {
  const [account, setAccount] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  // Kullanıcının cüzdanını bağlama
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Metamask not installed!");
    }
  };

  // Kullanıcının sorularını fetch etme
  const fetchUserQuestions = async () => {
    if (!account) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, QuestionAnswerABI, provider);
    const questionCount = await contract.questionCount();

    const userQuestions = [];
    for (let i = 1; i <= questionCount; i++) {
      const question = await contract.questions(i);
      if (question.asker.toLowerCase() === account.toLowerCase()) {
        const answerCount = question.answerCount;
        const answers = [];
        for (let j = 0; j < answerCount; j++) {
          const answer = await contract.answers(i, j);
          answers.push(answer);
        }
        userQuestions.push({ ...question, answers });
      }
    }

    setQuestions(userQuestions);
    setAnsweredQuestions(userQuestions.filter((q) => q.answers.length > 0));
    setUnansweredQuestions(userQuestions.filter((q) => q.answers.length === 0));
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (account) fetchUserQuestions();
  }, [account]);

  return (
    <div className=" min-h-screen bg-neutral-900 text-neutral-100 p-6">
      <header className=" flex justify-between items-center pb-4 border-b border-neutral-800">
        
        <h1 className="text-2xl font-bold">Account</h1>
        
        {account ? (
            <div  className=" flex justify-between items-center gap-6">
             
               
              
                <p className="hidden md:block text-sm text-neutral-400 ">Connected as: {account}</p>
                
          
          </div>
        ) : (
          <button
            className="mt-2 bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-md text-sm font-medium"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
    
      </header>

      {account &&  (
        <main className="mt-6">
          <section className="mb-8">
          <div  className=" flex justify-between items-center gap-6">
            <h2 className="text-xl font-semibold mb-4">Questions Asked</h2>
            <Link href="/questions"> <p className="hover:underline font-bold text-xl">← back to app</p></Link>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Answered Questions</h3>
              <div className="space-y-4">
                {answeredQuestions.map((q) => (
                  <div
                    key={q.id.toString()}
                    className="bg-neutral-800 p-4 rounded-md"
                  >
                    <p className="text-base font-medium">
                      <strong>#{q.id.toString()}</strong> {q.content}
                    </p>
                    <h4 className="text-sm font-bold mt-2">Answers:</h4>
                    {q.answers.map((a, idx) => (
                      <p key={idx} className="text-sm text-neutral-400">
                        - {a.content} (by {a.responder})
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Unanswered Questions</h3>
              <div className="space-y-4">
                {unansweredQuestions.map((q) => (
                  <div
                    key={q.id.toString()}
                    className="bg-neutral-800 p-4 rounded-md"
                  >
                    <p className="text-base font-medium">
                      <strong>#{q.id.toString()}</strong> {q.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
