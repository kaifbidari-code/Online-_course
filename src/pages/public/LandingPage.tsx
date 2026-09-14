import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, PlayCircle, Users, Award,
  ArrowRight, ShieldCheck, Zap, Laptop
} from 'lucide-react';
import { mockCourses } from '../../data/courses';
import { mockCategories } from '../../data/categories';
import { CourseCard } from '../../components/course/CourseCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const filteredCourses = selectedCategory === 'all'
    ? mockCourses.slice(0, 6)
    : mockCourses.filter(c => c.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory).slice(0, 6);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-pink-500/5 blur-3xl -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-bold animate-pulse-soft">
                <Sparkles size={14} className="text-primary-600" />
                <span>Next-Gen Online Learning Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-tight">
                Unlock Your Potential with <span className="gradient-text">World-Class</span> Learning
              </h1>

              <p className="text-lg text-text-secondary max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Master high-demand tech skills in Web Development, Data Science, AI, and Design. Learn at your pace with interactive projects, quizzes, and verified certificates.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Button
                  size="lg"
                  onClick={() => navigate('/explore')}
                  rightIcon={<ArrowRight size={18} />}
                  className="shadow-primary"
                >
                  Explore All Courses
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/register')}
                  leftIcon={<PlayCircle size={18} className="text-primary-600" />}
                >
                  Join for Free
                </Button>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-200 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-black text-text-primary">50,000+</p>
                  <p className="text-xs text-text-muted font-medium">Active Students</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-text-primary">120+</p>
                  <p className="text-xs text-text-muted font-medium">Expert Courses</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-text-primary">4.9/5</p>
                  <p className="text-xs text-text-muted font-medium">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Graphic Card */}
                <div className="card p-4 sm:p-6 shadow-elevated bg-white/90 backdrop-blur-lg border border-surface-200 relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white font-bold">
                        LS
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-text-primary">Full-Stack Web Mastery</h4>
                        <p className="text-xs text-text-muted">React, Node.js & TypeScript</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Live Class</Badge>
                  </div>

                  <div className="aspect-video rounded-xl bg-surface-900 relative overflow-hidden flex items-center justify-center group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
                      alt="Coding Course Preview"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute w-14 h-14 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                      <PlayCircle size={32} className="fill-current text-primary-600 ml-0.5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-text-secondary">Course Progress</span>
                      <span className="text-primary-600 font-bold">78%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-600 to-purple-600 w-[78%] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating Floating Stat 1 */}
                <div className="absolute -top-6 -left-6 bg-white shadow-elevated border border-surface-200 rounded-2xl p-3 flex items-center gap-3 z-20 animate-bounce-subtle">
                  <div className="w-9 h-9 rounded-xl bg-success-100 text-success-600 flex items-center justify-center">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary">Verified Certificate</p>
                    <p className="text-[10px] text-text-muted">Shareable on LinkedIn</p>
                  </div>
                </div>

                {/* Floating Stat 2 */}
                <div className="absolute -bottom-6 -right-6 bg-white shadow-elevated border border-surface-200 rounded-2xl p-3 flex items-center gap-3 z-20">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary">4,850+ Enrolled</p>
                    <p className="text-[10px] text-text-muted">This week alone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <Badge variant="purple" className="mb-2">Top Categories</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">Explore by Subject</h2>
          </div>
          <Link to="/explore" className="text-primary-600 font-bold text-sm hover:underline flex items-center gap-1">
            Browse All Categories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {mockCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`p-4 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center gap-2 group ${
                selectedCategory === cat.slug
                  ? 'bg-primary-600 text-white border-primary-600 shadow-primary'
                  : 'bg-white border-surface-200 hover:border-primary-300 text-text-primary hover:shadow-card'
              }`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-bold line-clamp-1">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="warning">Handpicked For You</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">Featured & Popular Courses</h2>
          <p className="text-text-secondary text-sm">
            Taught by world-class practitioners with real-world projects and interactive assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Button size="lg" variant="secondary" onClick={() => navigate('/explore')}>
            View All Courses ({mockCourses.length})
          </Button>
        </div>
      </section>

      {/* Platform Features / Why Choose Us */}
      <section className="bg-surface-100 py-16 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 border-y border-surface-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="primary">Why LearnSphere?</Badge>
            <h2 className="text-3xl font-extrabold text-text-primary">Designed for Accelerated Mastery</h2>
            <p className="text-text-secondary text-sm">
              We combine immersive video instruction, hands-on practice, and verified certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 space-y-4 bg-white hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center">
                <Laptop size={24} />
              </div>
              <h3 className="font-bold text-lg text-text-primary">Interactive LMS Player</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Seamless video player with speed control, lesson progress saving, notes taking, and resources tab.
              </p>
            </div>

            <div className="card p-6 space-y-4 bg-white hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Zap size={24} />
              </div>
              <h3 className="font-bold text-lg text-text-primary">Quiz & Assessment Engine</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Test your understanding with automated quizzes, instant score breakdowns, and retake capabilities.
              </p>
            </div>

            <div className="card p-6 space-y-4 bg-white hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-success-100 text-success-600 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg text-text-primary">Shareable Certificates</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Earn verifiable certificates of completion complete with unique IDs for your portfolio or resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-700 p-8 sm:p-12 text-white shadow-elevated relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <Badge variant="warning">Start Learning Today</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Advance Your Tech Career?</h2>
            <p className="text-primary-100 text-sm sm:text-base leading-relaxed">
              Join thousands of learners building their future on LearnSphere. Access all courses, track your progress, and earn certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-surface-100" onClick={() => navigate('/register')}>
                Get Started Free
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/20" onClick={() => navigate('/explore')}>
                Explore Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
