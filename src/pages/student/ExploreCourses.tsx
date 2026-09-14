import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { mockCourses } from '../../data/courses';
import { mockCategories } from '../../data/categories';
import { CourseCard } from '../../components/course/CourseCard';
import Button from '../../components/ui/Button';

export function ExploreCourses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => {
      // Search Query
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesInst = course.instructorName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesInst) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        const catSlug = course.category.toLowerCase().replace(/\s+/g, '-');
        if (catSlug !== selectedCategory && course.category !== selectedCategory) return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'all' && course.difficulty !== selectedDifficulty) return false;

      // Price
      if (priceFilter === 'free' && course.price !== 0) return false;
      if (priceFilter === 'paid' && course.price === 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.totalStudents - a.totalStudents;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [query, selectedCategory, selectedDifficulty, priceFilter, sortBy]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setPriceFilter('all');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-text-primary">Explore Courses</h1>
        <p className="text-sm text-text-secondary">
          Discover over {mockCourses.length}+ online courses across Web Development, Data Science, Design and more.
        </p>
      </div>

      {/* Search Bar + Controls */}
      <div className="card p-4 space-y-4 bg-white shadow-soft">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-3 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by course title, topic, or instructor..."
              className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-3 text-text-muted hover:text-text-primary">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-surface-50 border border-surface-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Releases</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* View Toggle */}
          <div className="flex bg-surface-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-soft text-primary-600' : 'text-text-muted'}`}
              aria-label="Grid View"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-soft text-primary-600' : 'text-text-muted'}`}
              aria-label="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-surface-100 text-xs">
          <span className="font-bold text-text-muted flex items-center gap-1">
            <SlidersHorizontal size={14} /> Category:
          </span>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              selectedCategory === 'all' ? 'bg-primary-600 text-white' : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
            }`}
          >
            All Categories
          </button>

          {mockCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                selectedCategory === cat.slug ? 'bg-primary-600 text-white' : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Meta */}
      <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
        <span>Showing <strong className="text-text-primary">{filteredCourses.length}</strong> courses</span>
        {(query || selectedCategory !== 'all' || selectedDifficulty !== 'all' || priceFilter !== 'all') && (
          <button onClick={resetFilters} className="text-primary-600 hover:underline flex items-center gap-1 font-bold">
            <X size={14} /> Clear all filters
          </button>
        )}
      </div>

      {/* Grid or List View */}
      {filteredCourses.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <Search size={40} className="mx-auto text-text-muted" />
          <h3 className="text-lg font-bold text-text-primary">No matching courses found</h3>
          <p className="text-xs text-text-secondary max-w-sm mx-auto">
            Try adjusting your search query or removing category filters to see more results.
          </p>
          <Button size="sm" onClick={resetFilters}>Reset Search</Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} horizontal />
          ))}
        </div>
      )}
    </div>
  );
}
