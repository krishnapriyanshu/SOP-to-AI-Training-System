import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const QuizWidget = ({ quiz }) => {
  // Track selected answers: { [questionId]: "Selected Option" }
  const [answers, setAnswers] = useState({});

  const handleSelect = (questionId, option) => {
    // Prevent changing answer once selected
    if (answers[questionId]) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach(q => {
      if (answers[q.id] === q.correct_answer) score++;
    });
    return score;
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-blue-600" />
        Knowledge Check
      </h3>

      <div className="space-y-8">
        {quiz.map((q, index) => {
          const userAnswer = answers[q.id];
          const isAnswered = !!userAnswer;
          const isCorrect = isAnswered && userAnswer === q.correct_answer;

          return (
            <div key={q.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <p className="font-semibold text-slate-800 mb-4">
                <span className="text-slate-500 mr-2">{index + 1}.</span>
                {q.question}
              </p>
              
              <div className="space-y-3">
                {q.options.map((opt, optIdx) => {
                  let buttonClass = "w-full text-left px-4 py-3 rounded-lg border transition-all text-sm font-medium ";
                  let icon = null;

                  if (isAnswered) {
                    if (opt === q.correct_answer) {
                      buttonClass += "bg-emerald-50 border-emerald-300 text-emerald-800";
                      icon = <CheckCircle className="w-5 h-5 text-emerald-500" />;
                    } else if (opt === userAnswer) {
                      buttonClass += "bg-red-50 border-red-300 text-red-800";
                      icon = <XCircle className="w-5 h-5 text-red-500" />;
                    } else {
                      buttonClass += "bg-white border-slate-200 text-slate-500 opacity-50";
                    }
                  } else {
                    buttonClass += "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`flex items-center justify-between ${buttonClass}`}
                    >
                      <span>{opt}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Show explanation if answered */}
              {isAnswered && (
                <div className={`mt-4 p-4 rounded-lg text-sm ${isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-red-100 text-red-900 border border-red-200'}`}>
                  <p className="font-semibold mb-1">{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {Object.keys(answers).length === quiz.length && (
        <div className="mt-8 p-6 bg-slate-800 rounded-xl text-center text-white">
          <h4 className="text-lg font-bold mb-2">Assessment Complete!</h4>
          <p className="text-slate-300">
            You scored {calculateScore()} out of {quiz.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizWidget;
