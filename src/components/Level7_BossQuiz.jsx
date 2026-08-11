import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { quizQuestions } from '../data/gameData';
import { showToast } from './Toast';

export default function Level7() {
  const { addXP, wrongAnswer, completeLevel, dispatch } = useGame();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExp, setShowExp] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const q = quizQuestions[currentQ];
  const totalQ = quizQuestions.length;
  const done = Object.keys(answers).length === totalQ;

  const answer = (optIdx) => {
    if (answers[currentQ] !== undefined) return;
    const isCorrect = optIdx === q.correct;
    setAnswers(prev => ({ ...prev, [currentQ]: optIdx }));
    setShowExp(true);
    if (isCorrect) {
      addXP(40, 7);
      setCorrectCount(prev => prev + 1);
      showToast('+40 XP — Correct!', 'correct');
    } else {
      wrongAnswer();
      showToast('Incorrect!', 'wrong');
    }
    if (Object.keys(answers).length + 1 === totalQ) {
      setTimeout(() => {
        completeLevel(7);
        showToast('All levels complete!', 'correct');
      }, 1500);
    }
  };

  const nextQ = () => {
    setShowExp(false);
    if (currentQ < totalQ - 1) setCurrentQ(currentQ + 1);
  };

  return (
    <div className="level-content">
      <div className="level-header">
        <span className="level-tag">LEVEL 7 — BOSS BATTLE</span>
        <h2>🔥 The Final Quiz</h2>
        <p>{totalQ} questions to prove your mastery of API vs MCP. No going back!</p>
      </div>

      <div className="progress-pill">
        <div className="progress-pill-fill" style={{ width: `${(Object.keys(answers).length / totalQ) * 100}%` }} />
        <span className="progress-pill-text">
          {Object.keys(answers).length} / {totalQ} — {correctCount} correct
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={currentQ}
            className="quiz-card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            <div className="quiz-question-num">Question {currentQ + 1} / {totalQ}</div>
            <p className="quiz-question">{q.q}</p>

            <div className="quiz-options">
              {q.options.map((opt, i) => {
                const answered = answers[currentQ] !== undefined;
                const isSelected = answers[currentQ] === i;
                const isCorrect = i === q.correct;
                let cls = 'quiz-option';
                if (answered) {
                  cls += ' disabled';
                  if (isCorrect) cls += ' correct';
                  else if (isSelected && !isCorrect) cls += ' wrong';
                }
                return (
                  <motion.button
                    key={i}
                    className={cls}
                    onClick={() => answer(i)}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    disabled={answered}
                  >
                    <span className="quiz-option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showExp && (
                <motion.div
                  className="quiz-explanation"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  💡 {q.explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {answers[currentQ] !== undefined && currentQ < totalQ - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: 16, textAlign: 'center' }}
              >
                <button className="btn btn-outline" onClick={nextQ}>
                  Next Question →
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="quiz-final"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="quiz-final-icon">
              {correctCount >= 9 ? '👑' : correctCount >= 7 ? '🏆' : correctCount >= 5 ? '🥈' : '🥉'}
            </div>
            <h3>Quiz Complete!</h3>
            <p className="quiz-final-score">{correctCount} / {totalQ} correct</p>
            <p className="quiz-final-pct">{Math.round((correctCount / totalQ) * 100)}% accuracy</p>
          </motion.div>
        )}
      </AnimatePresence>

      {done && (
        <motion.div
          className="level-complete-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'SHOW_RESULTS' })}>
            See Final Results 🏆
          </button>
        </motion.div>
      )}
    </div>
  );
}
