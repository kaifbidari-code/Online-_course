import { Link } from 'react-router-dom';
import { HelpCircle, Home, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 py-12 px-4">
      <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center shadow-soft">
        <HelpCircle size={40} />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold text-text-primary">404 - Page Not Found</h1>
        <p className="text-text-secondary text-sm leading-relaxed">
          Oops! The page you are looking for doesn't exist, was removed, or is temporarily unavailable.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/">
          <Button leftIcon={<Home size={16} />}>Back to Home</Button>
        </Link>
        <Link to="/explore">
          <Button variant="secondary" leftIcon={<Search size={16} />}>Explore Courses</Button>
        </Link>
      </div>
    </div>
  );
}
