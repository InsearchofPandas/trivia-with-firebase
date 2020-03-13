import React, { useEffect, useState, useCallback } from "react";
import Question from "../Question";
import { fetchQuestions } from "../functions/fetchQuestions";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";
import Settings from "./Settings";

export default function Game({ history }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [done, setDone] = useState(false);
  const [amount, setAmount] = useState(5);
  const [difficulty, setDifficulty] = useState("Easy");
  const [category, setCategory] = useState({ id: 9, name: "All" });
  const [responseCode, setResponseCode] = useState(null);

  useEffect(() => {
    setCurrentQuestion(null);
    setQuestions([]);
    setLoading(true);
    setScore(0);
    setQuestionNumber(0);
    fetchQuestions(amount, difficulty, category.id, setResponseCode)
      .then(setQuestions)
      .catch(console.error);
  }, [amount, difficulty, category]);

  const scoreSaved = () => {
    history.push("/highScores");
  };

  const changeQuestion = useCallback(
    (bonus = 0) => {
      if (questions.length === 0) {
        setDone(true);
        return setScore(score + bonus);
      }

      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      const currentQuestion = questions[randomQuestionIndex];
      const remainingQuestions = [...questions];
      remainingQuestions.splice(randomQuestionIndex, 1);

      setQuestions(remainingQuestions);
      setCurrentQuestion(currentQuestion);
      setLoading(false);
      setScore(score + bonus);
      setQuestionNumber(questionNumber + 1);
    },
    [
      score,
      questionNumber,
      questions,
      setQuestions,
      setLoading,
      setCurrentQuestion,
      setQuestionNumber
    ]
  );

  useEffect(() => {
    if (!currentQuestion && questions.length) {
      changeQuestion();
    }
  }, [currentQuestion, questions, changeQuestion]);

  function handleAmountState(value) {
    setAmount(value);
  }

  function handleCategoryState(value) {
    setCategory(value);
  }

  function handleDifficultyState(value) {
    setDifficulty(value);
  }

  return (
    <>
      <h1>Trivia Game</h1>
      <Settings
        amount={amount}
        difficulty={difficulty}
        category={category}
        handleAmountState={handleAmountState}
        handleDifficultyState={handleDifficultyState}
        handleCategoryState={handleCategoryState}
      />
      {responseCode === 1 && (
        <p className={"warning"}>
          Please lower the number of questions or try changing the category
          and/or difficulty settings
        </p>
      )}
      {loading && !done && <div id="loader"></div>}

      {!loading && !done && currentQuestion && (
        <>
          <HUD amount={amount} score={score} questionNumber={questionNumber} />
          <Question
            question={currentQuestion}
            changeQuestion={changeQuestion}
            amount={amount}
          />
        </>
      )}
      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
}
