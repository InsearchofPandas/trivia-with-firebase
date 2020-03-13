import React, { useState, useRef, useEffect } from "react";
import categories from "../../data/categories.json";

export default function Settings({
  amount,
  category,
  difficulty,
  handleCategoryState,
  handleDifficultyState,
  handleAmountState
}) {
  const [dropDown, setDropDown] = useState(null);
  const node = useRef();

  // functions to close menu and lift up state
  function handleAmount(value) {
    setDropDown(null);
    handleAmountState(value);
  }

  function handleCategory(value) {
    setDropDown(null);
    handleCategoryState(value);
  }

  function handleDifficulty(value) {
    setDropDown(null);
    handleDifficultyState(value);
  }

  // handle closing menu for outside clicks

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setDropDown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={node} id="settings">
      <div className="settings-choice-container ">
        <h3 className="settings-choice-prefix">Questions:</h3>
        <div className="settings-choice-text">
          <p onClick={() => setDropDown(0)}>{amount}</p>
          <ul className={dropDown === 0 ? "" : "noDropDown"}>
            <li onClick={() => handleAmount(5)}>5</li>
            <li onClick={() => handleAmount(10)}>10</li>
            <li onClick={() => handleAmount(15)}>15</li>
            <li onClick={() => handleAmount(25)}>25</li>
            <li onClick={() => handleAmount(50)}>50</li>
          </ul>
        </div>
      </div>
      <div className="settings-choice-container ">
        <h3 className="settings-choice-prefix">Category:</h3>
        <div className="settings-choice-text ">
          <p onClick={() => setDropDown(1)}>{category.name}</p>
          <ul className={dropDown === 1 ? "" : "noDropDown"}>
            {categories.trivia_categories.map(category => (
              <li onClick={() => handleCategory(category)} key={category.id}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="settings-choice-container ">
        <h3 className="settings-choice-prefix">Difficulty:</h3>
        <div className="settings-choice-text">
          <p onClick={() => setDropDown(2)}>{difficulty}</p>
          <ul className={dropDown === 2 ? "" : "noDropDown"}>
            <li onClick={() => handleDifficulty("Easy")}>Easy</li>
            <li onClick={() => handleDifficulty("Medium")}>Medium</li>
            <li onClick={() => handleDifficulty("Hard")}>Hard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
