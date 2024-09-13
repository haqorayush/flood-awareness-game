import React, { useState } from 'react';

const Question = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const isCorrect = (answer) => answer.isCorrect;

  return (
    <div>
      <h2>{question.questionText}</h2>
      <div>
        {question.answerOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(option)}
            style={{
              backgroundColor: selectedAnswer
                ? isCorrect(option)
                  ? 'lightgreen'
                  : selectedAnswer === option
                  ? 'salmon'
                  : 'white'
                : 'white',
              border: '1px solid #ccc',
              padding: '10px',
              margin: '5px',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            {option.answerText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
