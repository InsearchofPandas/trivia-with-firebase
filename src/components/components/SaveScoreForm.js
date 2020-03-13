import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../firebase/FirebaseContext";

export default function SaveScoreForm({ score, scoreSaved }) {
  const [username, setUsername] = useState("");
  const firebase = useFirebase();

  const onUsernameChange = e => {
    const updatedUsername = e.target.value;
    setUsername(updatedUsername);
  };

  const saveHighScore = e => {
    e.preventDefault();
    const record = {
      name: username,
      score
    };

    firebase.scores().push(record, () => {
      scoreSaved();
    });
  };

  return (
    <>
      <h1>Score: {score}</h1>
      <form onSubmit={saveHighScore} style={{ marginTop: 25 }}>
        <h2>Please enter your Name to log your High Score!</h2>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Player Name..."
          onChange={onUsernameChange}
          value={username}
        />
        <button type="submit" className="btn" disabled={!username}>
          Save
        </button>
      </form>
      <h2>or</h2>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </>
  );
}
