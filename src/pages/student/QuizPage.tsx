import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { mockQuizzes } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';

export function QuizPage() {
  const navigate = useNavigate();
  const { submitQuiz, addToast } = useApp();

  const quiz = mockQuizzes[0]; // demo quiz
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState((quiz.timeLimit || 15) * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = quiz.questions[currentIdx];

  const handleSelect = (questionId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach((q: any) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += q.points;
      }
    });

    const totalPossible = quiz.questions.reduce((acc: number, q: any) => acc + (q.points || 20), 0);
    const scorePercent = Math.round((score / totalPossible) * 100);

    submitQuiz(quiz.courseId, scorePercent);
    addToast('info', 'Quiz Submitted!', `Your score: ${scorePercent}%`);
    navigate(`/quiz-result/${quiz.id}`, { state: { scorePercent, totalPossible, score } });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="card p-6 bg-white shadow-soft space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <Badge variant="purple" size="sm">Assessment Quiz</Badge>
            <h1 className="text-xl font-bold text-text-primary mt-1">{quiz.title}</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-warning-50 text-warning-700 font-bold text-sm">
            <Clock size={16} />
            <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>
        </div>

        <ProgressBar value={((currentIdx + 1) / quiz.questions.length) * 100} size="sm" />

        <div className="flex justify-between text-xs text-text-muted font-semibold">
          <span>Question {currentIdx + 1} of {quiz.questions.length}</span>
          <span>Passing Score: {quiz.passingScore}%</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="card p-6 sm:p-8 bg-white shadow-elevated space-y-6">
        <h2 className="text-lg font-bold text-text-primary leading-snug">
          {currentIdx + 1}. {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option: string, idx: number) => {
            const selected = selectedAnswers[currentQ.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(currentQ.id, idx)}
                className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                  selected
                    ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-soft font-bold'
                    : 'border-surface-200 hover:border-surface-300 text-text-primary hover:bg-surface-50'
                }`}
              >
                <span>{option}</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                  selected ? 'border-primary-600 bg-primary-600 text-white' : 'border-surface-300'
                }`}>
                  {selected && '✓'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex justify-between items-center pt-4 border-t border-surface-100">
          <Button
            variant="ghost"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(i => i - 1)}
          >
            Previous
          </Button>

          {currentIdx < quiz.questions.length - 1 ? (
            <Button onClick={() => setCurrentIdx(i => i + 1)} rightIcon={<ArrowRight size={16} />}>
              Next Question
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-success-600 hover:bg-success-700 text-white">
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
