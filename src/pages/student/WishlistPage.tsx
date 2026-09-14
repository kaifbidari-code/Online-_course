import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockCourses } from '../../data/courses';
import { CourseCard } from '../../components/course/CourseCard';
import Button from '../../components/ui/Button';

export function WishlistPage() {
  const { wishlist } = useApp();
  const wishlistedCourses = mockCourses.filter(c => wishlist.includes(c.id));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-text-primary">My Wishlist</h1>
          <p className="text-sm text-text-secondary">Courses you saved for later ({wishlistedCourses.length})</p>
        </div>
      </div>

      {wishlistedCourses.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <Heart size={40} className="mx-auto text-text-muted" />
          <h3 className="text-lg font-bold text-text-primary">Your wishlist is empty</h3>
          <p className="text-xs text-text-secondary max-w-sm mx-auto">
            Explore our course catalog and click the heart icon on any course to save it here for later.
          </p>
          <Link to="/explore">
            <Button size="sm">Explore Courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
