import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
  const [answered, setAnswered] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null); // Track the correct answer index

  // Load sound files
  const introSound = new Audio('/sounds/intro.mp3');
  const correctSound = new Audio('/sounds/correct.mp3');
  const incorrectSound = new Audio('/sounds/incorrect.mp3');

  // Play intro sound when the difficulty is selected
  useEffect(() => {
    if (difficulty !== null) {
      introSound.play();
    }
  }, [difficulty]);


  // Sample questions for different difficulties
  const questions = {
    easy: [
      {
        questionText: 'Which of the following is a major flood-prone area in Uttar Pradesh?',
        answerOptions: [
          { answerText: 'Lucknow', isCorrect: false },
          { answerText: 'Gorakhpur', isCorrect: true },
          { answerText: 'Agra', isCorrect: false },
          { answerText: 'Kanpur', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the first step during a flood?',
        answerOptions: [
          { answerText: 'Stay in low-lying areas', isCorrect: false },
          { answerText: 'Move to higher ground', isCorrect: true },
          { answerText: 'Wait for instructions', isCorrect: false },
          { answerText: 'Ignore the situation', isCorrect: false },
        ],
      },
      {
        questionText: 'Which of the following is a flood safety measure?',
        answerOptions: [
          { answerText: 'Use electrical appliances', isCorrect: false },
          { answerText: 'Use an inflatable raft', isCorrect: true },
          { answerText: 'Stay in a basement', isCorrect: false },
          { answerText: 'Swim across the floodwater', isCorrect: false },
        ],
      },
      {
        questionText: 'What should you do if you’re in a vehicle during a flood?',
        answerOptions: [
          { answerText: 'De through the water', isCorrect: false },
          { answerText: 'Abandon the vehicle and move to higher ground', isCorrect: true },
          { answerText: 'Stay inside the vehicle until the water recedes', isCorrect: false },
          { answerText: 'Contact emergency services from the vehicle', isCorrect: false },
        ],
      },
      {
        questionText: 'Which item is essential for flood preparedness?',
        answerOptions: [
          { answerText: 'Batteries', isCorrect: true },
          { answerText: 'Snacks', isCorrect: false },
          { answerText: 'Entertainment devices', isCorrect: false },
          { answerText: 'Extra clothes', isCorrect: false },
        ],
      },
      {
        questionText: 'How can you help prevent flooding?',
        answerOptions: [
          { answerText: 'Remove debris from drains', isCorrect: true },
          { answerText: 'Plant trees near rivers', isCorrect: false },
          { answerText: 'Build more roads', isCorrect: false },
          { answerText: 'Increase water usage', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the main cause of urban flooding?',
        answerOptions: [
          { answerText: 'High temperatures', isCorrect: false },
          { answerText: 'Heavy rainfall', isCorrect: true },
          { answerText: 'Strong winds', isCorrect: false },
          { answerText: 'Drought', isCorrect: false },
        ],
      },
      {
        questionText: 'Where should you avoid going during a flood?',
        answerOptions: [
          { answerText: 'On elevated ground', isCorrect: false },
          { answerText: 'Near rivers and streams', isCorrect: true },
          { answerText: 'To a local shelter', isCorrect: false },
          { answerText: 'To a friend’s house', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the most important action to take when a flood warning is issued?',
        answerOptions: [
          { answerText: 'Stay in place and continue normal activities', isCorrect: false },
          { answerText: 'Evacuate if instructed', isCorrect: true },
          { answerText: 'Contact friends and family', isCorrect: false },
          { answerText: 'Wait until the warning is over', isCorrect: false },
        ],
      },
      {
        questionText: 'What is a common flood prevention measure?',
        answerOptions: [
          { answerText: 'Building levees', isCorrect: true },
          { answerText: 'Planting gardens', isCorrect: false },
          { answerText: 'Installing air conditioning', isCorrect: false },
          { answerText: 'Increasing road traffic', isCorrect: false },
        ],
      },
      {
        questionText: 'Which season is typically associated with higher flood risks?',
        answerOptions: [
          { answerText: 'Winter', isCorrect: false },
          { answerText: 'Spring', isCorrect: true },
          { answerText: 'Summer', isCorrect: false },
          { answerText: 'Autumn', isCorrect: false },
        ],
      },
    ],
    medium: [
      {
        questionText: 'What percentage of Uttar Pradesh is considered flood-prone?',
        answerOptions: [
          { answerText: '10%', isCorrect: false },
          { answerText: '27%', isCorrect: true },
          { answerText: '50%', isCorrect: false },
          { answerText: '75%', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the primary source of flood risk in Uttar Pradesh?',
        answerOptions: [
          { answerText: 'Heavy rainfall and river overflow', isCorrect: true },
          { answerText: 'Industrial accidents', isCorrect: false },
          { answerText: 'Earthquakes', isCorrect: false },
          { answerText: 'Volcanic eruptions', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the average depth of floodwater in severe cases?',
        answerOptions: [
          { answerText: '1-2 feet', isCorrect: false },
          { answerText: '3-6 feet', isCorrect: true },
          { answerText: '7-10 feet', isCorrect: false },
          { answerText: 'Over 10 feet', isCorrect: false },
        ],
      },
      {
        questionText: 'What is one of the most effective flood control methods?',
        answerOptions: [
          { answerText: 'Rainwater harvesting', isCorrect: false },
          { answerText: 'Building dams and reservoirs', isCorrect: true },
          { answerText: 'Coastal barriers', isCorrect: false },
          { answerText: 'Groundwater recharge', isCorrect: false },
        ],
      },
      {
        questionText: 'Which river is known for causing floods in Uttar Pradesh?',
        answerOptions: [
          { answerText: 'Ganga', isCorrect: true },
          { answerText: 'Yamuna', isCorrect: false },
          { answerText: 'Godavari', isCorrect: false },
          { answerText: 'Krishna', isCorrect: false },
        ],
      },
      {
        questionText: 'What should you do immediately after a flood?',
        answerOptions: [
          { answerText: 'Return home as soon as possible', isCorrect: false },
          { answerText: 'Inspect your property and avoid hazards', isCorrect: true },
          { answerText: 'Start cleanup immediately', isCorrect: false },
          { answerText: 'Contact friends and family', isCorrect: false },
        ],
      },
      {
        questionText: 'What type of building material is least effective in flood-prone areas?',
        answerOptions: [
          { answerText: 'Concrete', isCorrect: false },
          { answerText: 'Wood', isCorrect: true },
          { answerText: 'Steel', isCorrect: false },
          { answerText: 'Brick', isCorrect: false },
        ],
      },
      {
        questionText: 'Which agency in India is responsible for flood forecasting?',
        answerOptions: [
          { answerText: 'Indian Meteorological Department (IMD)', isCorrect: true },
          { answerText: 'National Disaster Management Authority (NDMA)', isCorrect: false },
          { answerText: 'Central Water Commission (CWC)', isCorrect: false },
          { answerText: 'National Disaster Response Force (NDRF)', isCorrect: false },
        ],
      },
      {
        questionText: 'Which measure is least effective in managing floodwaters?',
        answerOptions: [
          { answerText: 'Flood barriers', isCorrect: false },
          { answerText: 'Floodplain zoning', isCorrect: false },
          { answerText: 'Increased building regulations', isCorrect: false },
          { answerText: 'Widening roads', isCorrect: true },
        ],
      },
      {
        questionText: 'What is a common flood warning system used?',
        answerOptions: [
          { answerText: 'Weather apps', isCorrect: false },
          { answerText: 'Early warning sirens', isCorrect: true },
          { answerText: 'Social media updates', isCorrect: false },
          { answerText: 'Radio broadcasts', isCorrect: false },
        ],
      },
    ],
    hard: [
      {
        questionText: 'In which year did Uttar Pradesh experience the most severe flood in recent history?',
        answerOptions: [
          { answerText: '2008', isCorrect: true },
          { answerText: '2010', isCorrect: false },
          { answerText: '2005', isCorrect: false },
          { answerText: '2015', isCorrect: false },
        ],
      },
      {
        questionText: 'Which district in Uttar Pradesh was worst affected by the 2008 floods?',
        answerOptions: [
          { answerText: 'Gorakhpur', isCorrect: true },
          { answerText: 'Lucknow', isCorrect: false },
          { answerText: 'Varanasi', isCorrect: false },
          { answerText: 'Allahabad', isCorrect: false },
        ],
      },
      {
        questionText: 'What percentage of the state’s area was affected by the 2008 floods?',
        answerOptions: [
          { answerText: '20%', isCorrect: false },
          { answerText: '30%', isCorrect: true },
          { answerText: '40%', isCorrect: false },
          { answerText: '50%', isCorrect: false },
        ],
      },
      {
        questionText: 'Which river was primarily responsible for the 2008 floods in Uttar Pradesh?',
        answerOptions: [
          { answerText: 'Ganges', isCorrect: false },
          { answerText: 'Rapti', isCorrect: true },
          { answerText: 'Yamuna', isCorrect: false },
          { answerText: 'Gomti', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the maximum discharge capacity of the Gandak River in Uttar Pradesh?',
        answerOptions: [
          { answerText: '10,000 cubic meters per second', isCorrect: false },
          { answerText: '15,000 cubic meters per second', isCorrect: false },
          { answerText: '20,000 cubic meters per second', isCorrect: true },
          { answerText: '25,000 cubic meters per second', isCorrect: false },
        ],
      },
      {
        questionText: 'Which agency monitors river discharge levels in Uttar Pradesh?',
        answerOptions: [
          { answerText: 'Central Water Commission (CWC)', isCorrect: true },
          { answerText: 'Indian Meteorological Department (IMD)', isCorrect: false },
          { answerText: 'National Disaster Management Authority (NDMA)', isCorrect: false },
          { answerText: 'National River Conservation Directorate (NRCD)', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the primary reason for frequent flooding in the Terai region of Uttar Pradesh?',
        answerOptions: [
          { answerText: 'Heavy rainfall in the foothills', isCorrect: true },
          { answerText: 'Deforestation', isCorrect: false },
          { answerText: 'Agricultural runoff', isCorrect: false },
          { answerText: 'Urbanization', isCorrect: false },
        ],
      },
      {
        questionText: 'What structural solution is commonly used to manage river flow in flood-prone areas?',
        answerOptions: [
          { answerText: 'Dams', isCorrect: true },
          { answerText: 'Bridges', isCorrect: false },
          { answerText: 'Irrigation canals', isCorrect: false },
          { answerText: 'Road embankments', isCorrect: false },
        ],
      },
      {
        questionText: 'Which Indian state has collaborated with Uttar Pradesh for flood management in the Ganga basin?',
        answerOptions: [
          { answerText: 'Bihar', isCorrect: true },
          { answerText: 'West Bengal', isCorrect: false },
          { answerText: 'Madhya Pradesh', isCorrect: false },
          { answerText: 'Jharkhand', isCorrect: false },
        ],
      },
      {
        questionText: 'What is the role of the National Disaster Management Authority (NDMA) in flood management?',
        answerOptions: [
          { answerText: 'Developing flood insurance policies', isCorrect: false },
          { answerText: 'Providing early warning systems', isCorrect: false },
          { answerText: 'Coordinating national disaster response', isCorrect: true },
          { answerText: 'Conducting local flood drills', isCorrect: false },
        ],
      },
      {
        questionText: 'Which flood management approach focuses on managing river catchment areas?',
        answerOptions: [
          { answerText: 'Structural measures', isCorrect: false },
          { answerText: 'Non-structural measures', isCorrect: false },
          { answerText: 'Integrated catchment management', isCorrect: true },
          { answerText: 'Emergency response', isCorrect: false },
        ],
      },
    ],
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setFeedbackMessage('');
    setSelectedOptionIndex(null);
  };

  const handleAnswerOptionClick = (isCorrect, index) => {
    setAnswered(true); // Disable further clicks after an answer
    setSelectedOptionIndex(index); // Track the selected option
    const correctIndex = questions[difficulty][currentQuestion].answerOptions.findIndex(
      (option) => option.isCorrect
    );
    setCorrectAnswerIndex(correctIndex); // Set the correct answer index

    if (isCorrect) {
      setScore(score + 1);
      setFeedbackMessage('Correct! 🎉');
      correctSound.play(); // Play the correct answer sound
    } else {
      setFeedbackMessage('Incorrect! ❌');
      incorrectSound.play(); // Play the incorrect answer sound
    }

    setTimeout(() => {
      setFeedbackMessage('');
      setAnswered(false);
      setSelectedOptionIndex(null);
      setCorrectAnswerIndex(null); // Reset correct answer index

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions[difficulty].length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
        if (score + 1 > highScore) {
          setHighScore(score + 1);
          localStorage.setItem('highScore', score + 1);
        }
      }
    }, 2000); // 2-second delay to show the correct answer before moving on
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setDifficulty(null);
    setFeedbackMessage('');
    setSelectedOptionIndex(null);
  };

  const currentQuestionData = questions[difficulty]?.[currentQuestion];

  return (
    <div className="app">
      <h1>Flood Awareness Quiz</h1>

      {difficulty === null ? (
        <motion.div
          className="difficulty-selection"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Select Difficulty:</h2>
          <button onClick={() => handleDifficultyChange('easy')}>Easy</button>
          <button onClick={() => handleDifficultyChange('medium')}>Medium</button>
          <button onClick={() => handleDifficultyChange('hard')}>Hard</button>
        </motion.div>
      ) : showScore ? (
        <motion.div
          className="score-section"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Your Score: {score} / {questions[difficulty].length}</h2>
          <h3>High Score: {highScore}</h3>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </motion.div>
      ) : currentQuestionData ? (
        <motion.div
          className="question-section"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="question-text">{currentQuestionData.questionText}</div>
          <div className="answer-section">
            {currentQuestionData.answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option.isCorrect, index)}
                disabled={answered}
                className={`
                  ${answered && index === correctAnswerIndex ? 'correct-answer' : ''}
                  ${answered && index === selectedOptionIndex && !option.isCorrect ? 'incorrect-answer' : ''}
                `}
              >
                {option.answerText}
              </button>
            ))}
          </div>
          {feedbackMessage && <p>{feedbackMessage}</p>}
        </motion.div>
      ) : null}
    </div>
  );
};

export default Quiz;