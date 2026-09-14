import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, PlayCircle,
  FileText, Download, Award, Check, ListVideo
} from 'lucide-react';
import { mockCourses } from '../../data/courses';
import { useApp } from '../../context/AppContext';
import { formatDuration } from '../../utils/formatters';
import Button from '../../components/ui/Button';

export function CoursePlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === id) || mockCourses[0];
  const { getEnrollment, updateProgress, earnCertificate, addToast } = useApp();

  const enrollment = getEnrollment(course.id);
  const completedLessonIds = enrollment?.lessonProgress.filter(lp => lp.completed).map(lp => lp.lessonId) || [];

  // All lessons flattened
  const allLessons = course.sections.flatMap(s => s.lessons);
  const [currentLessonId, setCurrentLessonId] = useState<string>(allLessons[0]?.id || 'l-1');
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentLesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];
  const isCurrentCompleted = completedLessonIds.includes(currentLesson.id);

  const handleToggleComplete = () => {
    const nextState = !isCurrentCompleted;
    updateProgress(course.id, currentLesson.id, nextState);
    if (nextState) {
      addToast('success', 'Lesson Completed! 🎉', currentLesson.title);
    }
  };

  const handleEarnCertificate = () => {
    const cert = earnCertificate(course.id, course.title, course.instructorName);
    addToast('success', '🎓 Certificate Issued!', `Certificate ID: ${cert.certificateNumber}`);
    navigate('/certificates');
  };

  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  return (
    <div className="min-h-screen bg-surface-900 text-white flex flex-col font-sans">
      {/* Top LMS Header */}
      <header className="h-16 bg-surface-950 border-b border-surface-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <Link to="/my-learning" className="p-2 rounded-xl hover:bg-surface-800 text-surface-300 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0">
            <h1 className="font-bold text-sm text-white truncate">{course.title}</h1>
            <p className="text-[11px] text-surface-400 truncate">{currentLesson.title}</p>
          </div>
        </div>

        {/* Progress & Cert CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 w-48">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-surface-300 font-semibold mb-1">
                <span>Course Progress</span>
                <span className="text-primary-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {progressPercent >= 100 ? (
            <Button size="sm" className="bg-success-600 hover:bg-success-700 text-white" onClick={handleEarnCertificate} leftIcon={<Award size={16} />}>
              Claim Certificate 🎓
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="text-white border-surface-700 hover:bg-surface-800" onClick={handleEarnCertificate}>
              Certificate Preview
            </Button>
          )}

          <button onClick={() => setSidebarOpen(o => !o)} className="p-2 rounded-xl hover:bg-surface-800 text-surface-300">
            <ListVideo size={20} />
          </button>
        </div>
      </header>

      {/* Main LMS Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area + Bottom Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Player Container */}
          <div className="w-full bg-black aspect-video max-h-[65vh] relative flex items-center justify-center group">
            {/* Simulated HTML5 Video Player */}
            <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-surface-900 to-black">
              <div className="text-center space-y-3 p-6 max-w-lg">
                <div className="w-16 h-16 rounded-full bg-primary-600/90 text-white mx-auto flex items-center justify-center shadow-primary cursor-pointer hover:scale-110 transition-transform">
                  <PlayCircle size={36} className="fill-current ml-1" />
                </div>
                <p className="font-bold text-base text-white">{currentLesson.title}</p>
                <p className="text-xs text-surface-400">Duration: {formatDuration(currentLesson.duration)} • HD Video Stream</p>
              </div>

              {/* Video Overlay Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={handleToggleComplete} className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                    isCurrentCompleted ? 'bg-success-600 text-white' : 'bg-surface-800 hover:bg-surface-700 text-surface-200'
                  }`}>
                    {isCurrentCompleted ? <Check size={14} /> : <CheckCircle2 size={14} />}
                    {isCurrentCompleted ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-surface-400 text-xs">
                  <span>Playback Speed: 1.0x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs Area */}
          <div className="p-6 max-w-4xl space-y-6">
            <div className="border-b border-surface-800 flex gap-6 text-sm font-bold">
              {(['overview', 'notes', 'resources'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 capitalize border-b-2 transition-colors ${
                    activeTab === tab ? 'border-primary-500 text-primary-400' : 'border-transparent text-surface-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4 text-surface-300 text-sm">
                <h3 className="text-lg font-bold text-white">{currentLesson.title}</h3>
                <p className="leading-relaxed">
                  In this lesson, you will learn the practical fundamentals of building modular architectures. Follow along with the code snippets and resources provided.
                </p>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-3">
                <p className="text-xs text-surface-400">Take notes while watching:</p>
                <textarea
                  placeholder="Type your study notes here..."
                  rows={4}
                  className="w-full bg-surface-800 border border-surface-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary-500"
                />
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-2">
                <div className="p-3 bg-surface-800 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary-400" />
                    <span>Lesson-Source-Code.zip</span>
                  </div>
                  <button className="text-primary-400 hover:underline flex items-center gap-1 font-bold">
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lesson Sidebar Accordion */}
        {sidebarOpen && (
          <aside className="w-80 bg-surface-950 border-l border-surface-800 shrink-0 overflow-y-auto flex flex-col">
            <div className="p-4 border-b border-surface-800 flex justify-between items-center">
              <h3 className="font-bold text-sm text-white">Course Content</h3>
              <span className="text-xs text-surface-400">{completedCount}/{allLessons.length} Done</span>
            </div>

            <div className="divide-y divide-surface-800 flex-1">
              {course.sections.map(section => (
                <div key={section.id} className="p-3 space-y-2">
                  <p className="text-xs font-bold text-surface-300">{section.title}</p>
                  <div className="space-y-1">
                    {section.lessons.map(lesson => {
                      const isSelected = lesson.id === currentLessonId;
                      const isDone = completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLessonId(lesson.id)}
                          className={`w-full p-2.5 rounded-xl flex items-start gap-3 text-left text-xs transition-all ${
                            isSelected
                              ? 'bg-primary-600/20 text-primary-400 font-bold border border-primary-500/30'
                              : 'hover:bg-surface-900 text-surface-300'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 size={14} className="text-success-500 fill-success-500/20" />
                            ) : (
                              <PlayCircle size={14} className="text-surface-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="line-clamp-1">{lesson.title}</p>
                            <span className="text-[10px] text-surface-500">{formatDuration(lesson.duration)}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
