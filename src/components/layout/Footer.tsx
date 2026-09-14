import { Link } from 'react-router-dom';
import { GraduationCap, Globe, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-200 pt-16 pb-8 border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-surface-800">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="font-bold text-white text-xl">
                Learn<span className="text-primary-400">Sphere</span>
              </span>
            </Link>
            <p className="text-surface-400 text-sm max-w-sm leading-relaxed">
              Empowering learners worldwide with interactive, high-impact courses taught by industry leaders. Master new skills, earn certificates, and accelerate your career.
            </p>
            <div className="flex items-center gap-3 text-surface-400 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors" aria-label="Website">
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-sm text-surface-400">
              <li><Link to="/explore" className="hover:text-white transition-colors">All Courses</Link></li>
              <li><Link to="/explore?category=web-development" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/explore?category=data-science" className="hover:text-white transition-colors">Data Science</Link></li>
              <li><Link to="/explore?category=ui-ux-design" className="hover:text-white transition-colors">UI/UX Design</Link></li>
              <li><Link to="/explore?category=cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-sm text-surface-400">
              <li><Link to="/login" className="hover:text-white transition-colors">Instructor Portal</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Become a Teacher</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link></li>
              <li><Link to="/certificates" className="hover:text-white transition-colors">Certificates</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">Admin Console</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-surface-400 text-xs mb-3">Get the latest course releases and tech news directly in your inbox.</p>
            <form onSubmit={e => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-3 text-surface-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-surface-800 border border-surface-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-surface-400 focus:outline-none focus:border-primary-500"
                />
              </div>
              <button type="submit" className="w-full btn-primary text-xs py-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-surface-500">
          <p>© {new Date().getFullYear()} LearnSphere Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-red-500 fill-current" /> for modern learners worldwide.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-surface-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-surface-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-surface-300 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
