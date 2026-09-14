import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Clock, BookOpen, Users, Award, CheckCircle, Heart,
  PlayCircle, Lock, ChevronDown, ChevronUp, Globe, Shield
} from 'lucide-react';
import { mockCourses } from '../../data/courses';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, formatDuration, formatNumber } from '../../utils/formatters';
import { Avatar } from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  const { isEnrolled, enroll, isWishlisted, toggleWishlist, addToast } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ 'sec-1': true });

  const enrolled = isEnrolled(course.id);
  const wishlisted = isWishlisted(course.id);

  const toggleSection = (secId: string) => {
    setExpandedSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (enrolled) {
      navigate(`/learn/${course.id}`);
    } else {
      enroll(course.id);
      addToast('success', 'Enrolled Successfully! 🎉', `Welcome to ${course.title}`);
      navigate(`/learn/${course.id}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <Link to="/explore" className="hover:text-primary-600">Courses</Link>
        <span>/</span>
        <span className="text-text-secondary">{course.category}</span>
        <span>/</span>
        <span className="text-text-primary font-semibold line-clamp-1">{course.title}</span>
      </div>

      {/* Main Grid: Left Details + Right Sticky Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="primary">{course.category}</Badge>
              <Badge variant="warning">{course.difficulty}</Badge>
              {course.bestseller && <Badge variant="purple">🔥 Bestseller</Badge>}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
              {course.title}
            </h1>

            <p className="text-base text-text-secondary leading-relaxed">
              {course.shortDescription}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted border-y border-surface-200 py-3">
              <div className="flex items-center gap-1.5 font-bold text-warning-600">
                <Star size={16} className="fill-warning-500 text-warning-500" />
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-text-muted font-normal">({formatNumber(course.totalReviews)} reviews)</span>
              </div>
              <span className="flex items-center gap-1"><Users size={14} /> {formatNumber(course.totalStudents)} students</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {formatDuration(course.totalDuration)}</span>
              <span className="flex items-center gap-1"><Globe size={14} /> {course.language}</span>
            </div>

            {/* Instructor Quick Info */}
            <div className="flex items-center gap-3 pt-2">
              <Avatar src={course.instructorAvatar} name={course.instructorName} size="md" />
              <div>
                <p className="text-xs text-text-muted font-semibold">Created by</p>
                <p className="text-sm font-bold text-text-primary">{course.instructorName}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-surface-200 flex gap-6 text-sm font-bold">
            {(['overview', 'curriculum', 'instructor', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 capitalize transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* What You'll Learn Grid */}
              <div className="card p-6 bg-primary-50/50 border border-primary-100 space-y-4">
                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <CheckCircle size={20} className="text-primary-600" /> What You'll Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-secondary">
                  {(course.whatYouLearn || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-success-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Description */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-text-primary">Course Description</h3>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-text-primary">Requirements</h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-text-secondary">
                  {(course.requirements || []).map((req: string, idx: number) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Curriculum */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
                <span>{course.sections.length} sections • {course.totalLessons} lessons • {formatDuration(course.totalDuration)} total</span>
              </div>

              <div className="space-y-3">
                {course.sections.map(section => {
                  const isOpen = expandedSections[section.id];
                  return (
                    <div key={section.id} className="card border border-surface-200 overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full p-4 bg-surface-50 hover:bg-surface-100 flex items-center justify-between transition-colors text-left"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-text-primary">{section.title}</h4>
                          <p className="text-xs text-text-muted mt-0.5">{section.lessons.length} lessons</p>
                        </div>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-surface-100 p-2">
                          {section.lessons.map(lesson => (
                            <div key={lesson.id} className="p-3 flex items-center justify-between hover:bg-surface-50 rounded-lg text-xs">
                              <div className="flex items-center gap-3">
                                {lesson.isPreview ? (
                                  <PlayCircle size={16} className="text-primary-600 shrink-0" />
                                ) : (
                                  <Lock size={16} className="text-text-muted shrink-0" />
                                )}
                                <span className="font-medium text-text-primary">{lesson.title}</span>
                                {lesson.isPreview && <Badge variant="primary" size="sm">Free Preview</Badge>}
                              </div>
                              <span className="text-text-muted">{formatDuration(lesson.duration)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Instructor */}
          {activeTab === 'instructor' && (
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar src={course.instructorAvatar} name={course.instructorName} size="xl" />
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{course.instructorName}</h3>
                  <p className="text-xs text-primary-600 font-semibold">Senior Software Engineer & Tech Educator</p>
                  <p className="text-xs text-text-muted mt-1">⭐ 4.9 Rating • 50,000+ Students • 12 Courses</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Dr. Mitchell is a computer scientist and veteran software architect. Over the last decade, she has built scalable cloud microservices and taught tens of thousands of developers worldwide.
              </p>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="card p-6 flex flex-col sm:flex-row items-center gap-6 bg-surface-50">
                <div className="text-center">
                  <p className="text-5xl font-black text-text-primary">{course.rating.toFixed(1)}</p>
                  <div className="flex justify-center my-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={16} className="fill-warning-500 text-warning-500" />
                    ))}
                  </div>
                  <p className="text-xs text-text-muted font-medium">Course Rating</p>
                </div>
                <div className="flex-1 space-y-1.5 w-full">
                  {[5,4,3,2,1].map(stars => (
                    <div key={stars} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-text-muted font-medium">{stars} stars</span>
                      <div className="flex-1 h-2 bg-surface-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-warning-500 rounded-full"
                          style={{ width: `${stars === 5 ? 85 : stars === 4 ? 12 : 3}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-text-muted">{stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Card */}
        <div className="lg:col-span-4">
          <div className="card p-6 shadow-elevated bg-white space-y-6 sticky top-24">
            {/* Preview Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-900 group cursor-pointer">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white text-primary-600 flex items-center justify-center shadow-lg">
                  <PlayCircle size={28} className="fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Price Row */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-text-primary">
                  {formatPrice(course.price)}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-text-muted line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs text-success-600 font-bold">🏷️ 85% OFF limited time offer</p>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Button fullWidth size="lg" onClick={handleEnroll}>
                {enrolled ? 'Go to Course' : 'Enroll Now'}
              </Button>

              <Button
                fullWidth
                variant="outline"
                onClick={() => toggleWishlist(course.id)}
                leftIcon={<Heart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />}
              >
                {wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Includes Checklist */}
            <div className="space-y-2.5 pt-4 border-t border-surface-100 text-xs text-text-secondary">
              <p className="font-bold text-text-primary">This course includes:</p>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary-600" />
                <span>{formatDuration(course.totalDuration)} on-demand video</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-primary-600" />
                <span>{course.totalLessons} downloadable resources</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-primary-600" />
                <span>Certificate of completion</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-primary-600" />
                <span>Full lifetime access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
