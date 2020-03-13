import React from "react";
import "./App.css";
import Home from "./components/components/Home";
import Game from "./components/components/Game";
import HighScores from "./components/components/HighScores";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <a
        href="https://kylehumphrey.com"
        target="_blank"
        rel="noopener noreferrer"
        className="return"
      >
        {" "}
        Return to Kyle Humphrey.com
      </a>
      <Router>
        <div style={{ paddingTop: 80 }} className="container">
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/highScores" component={HighScores} />
        </div>
      </Router>
      <div className="footerCenter">
        <footer className="footer">
          <a
            href="https://kylehumphrey.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footerText"
          >
            Made by Kyle Humphrey
          </a>
          <a
            href="https://github.com/InsearchofPandas/trivia-with-firebase"
            target="_blank"
            rel="noopener noreferrer"
            className="footerText"
          >
            View Code on GitHub
          </a>
          <a
            href="https://opentdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footerText"
          >
            Questions Provided by Open Trivia DB
          </a>
          <a
            href="https://www.leveluptutorials.com/tutorials/fullstack-react-and-firebase"
            target="_blank"
            rel="noopener noreferrer"
            className="footerText"
          >
            Project Based on LUT tutorials.
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
