import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, ArrowRight, ArrowLeft, Upload, Plus, Trash2,
  DollarSign
} from 'lucide-react';
import { mockCategories } from '../../data/categories';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';

export function CreateCoursePage() {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('49.99');
  const [lessons, setLessons] = useState([
    { id: '1', title: 'Course Introduction & Setup', duration: 10, isPreview: true },
    { id: '2', title: 'Core Concepts Overview', duration: 25, isPreview: false }
  ]);
  const [newLessonTitle, setNewLessonTitle] = useState('');

  const handleAddLesson = () => {
    if (!newLessonTitle.trim()) return;
    setLessons(prev => [...prev, { id: Date.now().toString(), title: newLessonTitle, duration: 15, isPreview: false }]);
    setNewLessonTitle('');
  };

  const handlePublish = () => {
    addToast('success', 'Course Published Successfully! 🎉', 'Your course is now live in the LearnSphere catalog.');
    navigate('/instructor/courses');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Step Progress Bar */}
      <div className="card p-4 sm:p-6 bg-white shadow-soft space-y-4">
        <div className="flex justify-between items-center text-xs font-bold text-text-muted">
          <span>Step {step} of 6</span>
          <span className="text-primary-600">
            {step === 1 && 'Basic Information'}
            {step === 2 && 'Curriculum Builder'}
            {step === 3 && 'Media & Uploads'}
            {step === 4 && 'Quiz Builder'}
            {step === 5 && 'Pricing & Certificate'}
            {step === 6 && 'Review & Publish'}
          </span>
        </div>
        <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary-600 transition-all duration-300 rounded-full" style={{ width: `${(step / 6) * 100}%` }} />
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="card p-6 sm:p-8 bg-white shadow-elevated space-y-6">
          <h2 className="text-xl font-bold text-text-primary">1. Basic Information</h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-primary">Course Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Master Full-Stack Web Development"
                className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-primary">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {mockCategories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-primary">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-text-primary">Course Description</label>
              <textarea
                rows={5}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Write a comprehensive description of what students will master..."
                className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Curriculum Builder */}
      {step === 2 && (
        <div className="card p-6 sm:p-8 bg-white shadow-elevated space-y-6">
          <h2 className="text-xl font-bold text-text-primary">2. Curriculum & Lessons</h2>

          <div className="space-y-3">
            {lessons.map((l, i) => (
              <div key={l.id} className="p-3 bg-surface-50 rounded-xl border border-surface-200 flex justify-between items-center text-xs">
                <span className="font-bold text-text-primary">{i + 1}. {l.title}</span>
                <button onClick={() => setLessons(prev => prev.filter(item => item.id !== l.id))} className="text-error-500 hover:text-error-700">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newLessonTitle}
              onChange={e => setNewLessonTitle(e.target.value)}
              placeholder="Enter new lesson title..."
              className="flex-1 bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button size="sm" onClick={handleAddLesson} leftIcon={<Plus size={14} />}>Add Lesson</Button>
          </div>
        </div>
      )}

      {/* Step 3: Media */}
      {step === 3 && (
        <div className="card p-6 sm:p-8 bg-white shadow-elevated space-y-6">
          <h2 className="text-xl font-bold text-text-primary">3. Media & Thumbnail</h2>
          <div className="border-2 border-dashed border-surface-300 rounded-2xl p-8 text-center space-y-3">
            <Upload size={36} className="mx-auto text-primary-600" />
            <p className="font-bold text-sm text-text-primary">Drag & drop course thumbnail image</p>
            <p className="text-xs text-text-muted">High resolution JPG or PNG recommended (1280x720)</p>
            <Button size="sm" variant="secondary">Browse Files</Button>
          </div>
        </div>
      )}

      {/* Step 4: Quiz Builder */}
      {step === 4 && (
        <div className="card p-6 sm:p-8 bg-white shadow-elevated space-y-6">
          <h2 className="text-xl font-bold text-text-primary">4. Assessment Quiz</h2>
          <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 text-xs text-primary-900 space-y-1">
            <p className="font-bold">Automated Quiz Configured</p>
            <p>A 5-question multiple choice quiz will be attached to the final module.</p>
          </div>
        </div>
      )}

      {/* Step 5: Pricing */}
      {step === 5 && (
        <div className="card p-6 sm:p-8 bg-white shadow-elevated space-y-6">
          <h2 className="text-xl font-bold text-text-primary">5. Pricing & Certificate</h2>
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-primary">Course Price (USD)</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-3 text-text-muted" />
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Review */}
      {step === 6 && (
        <div className="card p-6 sm:p-8 bg-white shadow-elevated space-y-6">
          <h2 className="text-xl font-bold text-text-primary">6. Review & Publish</h2>
          <div className="p-4 bg-surface-50 rounded-xl space-y-2 text-xs">
            <p><strong>Title:</strong> {title || 'Untitled Course'}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Total Lessons:</strong> {lessons.length}</p>
          </div>
        </div>
      )}

      {/* Wizard Footer Nav */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="ghost"
          disabled={step === 1}
          onClick={() => setStep(s => s - 1)}
          leftIcon={<ArrowLeft size={16} />}
        >
          Previous Step
        </Button>

        {step < 6 ? (
          <Button onClick={() => setStep(s => s + 1)} rightIcon={<ArrowRight size={16} />}>
            Next Step
          </Button>
        ) : (
          <Button onClick={handlePublish} className="bg-success-600 hover:bg-success-700 text-white" leftIcon={<Check size={16} />}>
            Publish Course Now
          </Button>
        )}
      </div>
    </div>
  );
}
