import React, { useState, useEffect } from "react";
import { useFirebase } from "../firebase/FirebaseContext";
import { Link } from "react-router-dom";

export default function HighScores() {
  const firebase = useFirebase();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.scores().once("value", snapshot => {
      const data = snapshot.val();
      const sortedScores = formatScoreData(data);
      setScores(sortedScores);
      setLoading(false);
    });
  });

  const formatScoreData = firebaseScores => {
    const scores = [];

    for (let key in firebaseScores) {
      const val = firebaseScores[key];
      val["key"] = key;
      scores.push(val);
    }

    return scores
      .sort((score1, score2) => score2.score - score1.score)
      .slice(0, 10);
  };

  return (
    <>
      {loading && <div id="loader"></div>}

      {!loading && (
        <>
          <h1>High Scores</h1>
          <div style={{ marginTop: 33 }} id="highScoresList">
            {scores.map(record => (
              <li key={record.key} className="high-score">
                Player: <span className="readabillity">{record.name}</span>{" "}
                Score: <span className="readabillity">{record.score}</span>
              </li>
            ))}
          </div>
          <Link to="/" className="btn">
            Home
          </Link>
        </>
      )}
    </>
  );
}
