import React, { useState } from "react";

export default function Question({ question, changeQuestion, amount }) {
  const [classToApply, setClassToApply] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [answering, setAnswering] = useState(false);

  const checkAnswer = selectedAnswer => {
    if (answering) return;
    setAnswering(true);
    setSelectedAnswer(selectedAnswer);

    const classToApply =
      question.answer === selectedAnswer ? "correct" : "incorrect";
    setClassToApply(classToApply);
    const bonus = selectedAnswer === question.answer ? 100 / amount : 0;

    setTimeout(() => {
      setSelectedAnswer(-1);
      setAnswering(false);
      changeQuestion(bonus);
    }, 1000);
  };

  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      {question.answerChoices.map((choice, i) => (
        <div
          key={i}
          className={`choice-container ${selectedAnswer === i && classToApply}`}
          onClick={() => checkAnswer(i)}
        >
          <p className="choice-prefix">{i + 1}</p>
          <p
            className="choice-text"
            dangerouslySetInnerHTML={{ __html: choice }}
          />
        </div>
      ))}
    </div>
  );
}
