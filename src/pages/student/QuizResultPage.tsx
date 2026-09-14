import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Award, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export function QuizResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { scorePercent?: number; totalPossible?: number; score?: number } || {};

  const scorePercent = state.scorePercent ?? 85;
  const passed = scorePercent >= 70;

  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center space-y-6">
      <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-elevated ${
        passed ? 'bg-success-100 text-success-600' : 'bg-error-100 text-error-600'
      }`}>
        {passed ? <Award size={44} /> : <XCircle size={44} />}
      </div>

      <div className="space-y-2">
        <Badge variant={passed ? 'success' : 'error'}>
          {passed ? '🎉 Passed' : 'Needs Practice'}
        </Badge>
        <h1 className="text-3xl font-black text-text-primary">
          {passed ? 'Congratulations!' : 'Keep Trying!'}
        </h1>
        <p className="text-sm text-text-secondary">
          {passed
            ? 'You scored above the required 70% threshold. You can now claim your course certificate!'
            : 'You scored below the 70% passing grade. Review the lessons and attempt the quiz again.'}
        </p>
      </div>

      <div className="card p-6 bg-white shadow-card space-y-4">
        <div className="text-4xl font-black text-text-primary">{scorePercent}%</div>
        <p className="text-xs text-text-muted">Final Quiz Grade</p>
      </div>

      <div className="flex flex-col gap-3">
        {passed ? (
          <Link to="/certificates">
            <Button fullWidth size="lg" leftIcon={<Award size={18} />}>
              View Your Certificate 🎓
            </Button>
          </Link>
        ) : (
          <Button fullWidth size="lg" onClick={() => navigate(-1)} leftIcon={<RotateCcw size={18} />}>
            Retake Quiz
          </Button>
        )}

        <Link to="/my-learning">
          <Button fullWidth variant="ghost" rightIcon={<ArrowRight size={16} />}>
            Back to My Learning
          </Button>
        </Link>
      </div>
    </div>
  );
}
