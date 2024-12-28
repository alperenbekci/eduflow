"use client";

import QuestionCard from "./QuestionCard";

export default function QuestionList({ questions, setQuestions }) {

  const handleAnswerSubmit = (index, answerText) => {
    if (!answerText.trim()) return;

    const updatedQuestions = questions.map((q, i) => {
      if (i === index) {
        return {
          ...q,
          answers: [...q.answers, { text: answerText, user: "You" }],
          status: "Answered",
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
  };

  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <QuestionCard
          key={index}
          question={q.question}
          userName={q.userName}
          initialStatus={q.status}
          answers={q.answers}
          onAnswerSubmit={(answerText) => handleAnswerSubmit(index, answerText)}
        />
      ))}
    </div>
  );
}
