export const fetchQuestions = async (
  amount = 10,
  difficulty = "Easy",
  id = 0,
  setResponseCode
) => {
  difficulty = difficulty.toLowerCase();

  const url =
    id === 0
      ? `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
      : `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${id}`;

  console.log(url);

  try {
    const res = await fetch(url);
    const { results, response_code } = await res.json();
    console.log(response_code);
    setResponseCode(response_code);
    return convertAPICall(results);
  } catch (err) {
    console.log(err);
  }
};

const convertAPICall = callData => {
  return callData.map(defaultQuestion => {
    const reformattedQuestion = {
      question: defaultQuestion.question,
      answerChoices: [...defaultQuestion.incorrect_answers]
    };

    const randomIndex = Math.round(Math.random() * 3);

    reformattedQuestion.answer = randomIndex;

    reformattedQuestion.answerChoices.splice(
      randomIndex,
      0,
      defaultQuestion.correct_answer
    );

    return reformattedQuestion;
  });
};
