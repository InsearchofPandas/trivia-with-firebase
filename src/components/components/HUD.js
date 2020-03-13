import React from "react";
import ProgressBar from "./ProgressBar";

export default function HUD({ score, questionNumber, amount }) {
  return (
    <div id="hud">
      <div className="hud-item">
        <p className="hud-prefix">
          Question {questionNumber}/{amount}
        </p>
        <ProgressBar max={amount} current={questionNumber} />
      </div>
      <div className="hud-item">
        <p className="hud-prefix">Score</p>
        <h1 className="hud-main-text">{score}</h1>
      </div>
    </div>
  );
}
