import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Users, Clock, BookOpen, ChevronRight, Zap, Award } from 'lucide-react';
import type { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import Badge from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import Button from '../ui/Button';
import { formatPrice, formatDuration, formatNumber } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface CourseCardProps {
  course: Course;
  horizontal?: boolean;
  compact?: boolean;
}

const difficultyColors: Record<string, 'success' | 'warning' | 'error'> = {
  Beginner: 'success', Intermediate: 'warning', Advanced: 'error',
};

export function CourseCard({ course, horizontal, compact }: CourseCardProps) {
  const { isAuthenticated } = useAuth();
  const { toggleWishlist, isInWishlist, addToast, enrollments } = useApp();
  const navigate = useNavigate();
  const wishlisted = isInWishlist(course.id);
  const enrolled = enrollments.some(e => e.courseId === course.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!isAuthenticated) { navigate('/login'); return; }
    toggleWishlist(course.id);
    addToast({ type: wishlisted ? 'info' : 'success', title: wishlisted ? 'Removed from wishlist' : 'Added to wishlist!', message: course.title });
  };

  if (horizontal) {
    return (
      <Link to={`/courses/${course.id}`} className="card-hover flex gap-4 p-4 block group">
        <img src={course.thumbnail} alt={course.title} className="w-36 h-24 object-cover rounded-xl shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-primary-600 font-semibold mb-1">{course.category}</p>
              <h3 className="font-bold text-text-primary text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">{course.title}</h3>
            </div>
            <p className="text-lg font-bold text-primary-600 shrink-0">{formatPrice(course.price)}</p>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
            <span className="flex items-center gap-1"><Star size={11} className="fill-warning-500 text-warning-500" /> {course.rating.toFixed(1)}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {formatDuration(course.totalDuration)}</span>
            <span className="flex items-center gap-1"><BookOpen size={11} /> {course.totalLessons} lessons</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="card-hover group flex flex-col overflow-hidden relative">
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-surface-100">
        <img
          src={course.thumbnail} alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlays */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {course.bestseller && <Badge variant="warning" size="sm">🔥 Bestseller</Badge>}
          {course.featured && !course.bestseller && <Badge variant="primary" size="sm">⭐ Featured</Badge>}
        </div>
        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-card',
            wishlisted ? 'bg-red-500 text-white' : 'bg-white text-text-muted hover:text-red-500'
          )}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} className={wishlisted ? 'fill-current' : ''} />
        </button>
        {/* Preview hover badge */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white text-primary-600 font-semibold text-sm px-4 py-2 rounded-full flex items-center gap-2">
            <Zap size={14} /> Preview Course
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn('flex flex-col flex-1', compact ? 'p-3' : 'p-4')}>
        {/* Category + Difficulty */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="primary" size="sm">{course.category}</Badge>
          <Badge variant={difficultyColors[course.difficulty]} size="sm">{course.difficulty}</Badge>
          {course.certificate && <Badge variant="purple" size="sm"><Award size={10} className="mr-1" />Cert</Badge>}
        </div>

        {/* Title */}
        <h3 className={cn('font-bold text-text-primary line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug', compact ? 'text-sm mb-2' : 'text-base mb-2.5')}>
          {course.title}
        </h3>

        {!compact && (
          <p className="text-xs text-text-secondary line-clamp-2 mb-3">{course.shortDescription}</p>
        )}

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar src={course.instructorAvatar} name={course.instructorName} size="xs" />
          <span className="text-xs text-text-secondary font-medium">{course.instructorName}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-sm font-bold text-warning-600">{course.rating.toFixed(1)}</span>
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12} className={i <= Math.round(course.rating) ? 'fill-warning-500 text-warning-500' : 'text-surface-300'} />
            ))}
          </div>
          <span className="text-xs text-text-muted">({formatNumber(course.totalReviews)})</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
          <span className="flex items-center gap-1"><Users size={11} /> {formatNumber(course.totalStudents)}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {formatDuration(course.totalDuration)}</span>
          <span className="flex items-center gap-1"><BookOpen size={11} /> {course.totalLessons} lessons</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-100 mt-auto">
          <div>
            <span className={cn('font-bold', compact ? 'text-base' : 'text-lg', 'text-text-primary')}>
              {formatPrice(course.price)}
            </span>
            {course.originalPrice && (
              <span className="ml-2 text-xs text-text-muted line-through">{formatPrice(course.originalPrice)}</span>
            )}
          </div>
          <Link to={`/courses/${course.id}`}>
            <Button size="sm" variant={enrolled ? 'ghost' : 'primary'} rightIcon={<ChevronRight size={14} />}>
              {enrolled ? 'Continue' : 'View'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
