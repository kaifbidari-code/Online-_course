import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Globe, Mail, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      className="w-full bg-[#0B0F19] text-[#F1F5F9] pt-14 pb-14 sm:pb-10 border-t border-[#1E293B] mt-auto"
      style={{ backgroundColor: '#0B0F19', color: '#F1F5F9' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-[#1E293B]">
          
          {/* Brand - Full width on mobile (col-span-2), 2-cols on desktop */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-primary-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="font-extrabold text-white text-2xl tracking-tight">
                Learn<span className="text-indigo-400">Sphere</span>
              </span>
            </Link>
            <p className="text-[#CBD5E1] text-sm max-w-sm leading-relaxed">
              Empowering learners worldwide with interactive, high-impact courses taught by industry leaders. Master new skills, earn certificates, and accelerate your career.
            </p>

            {/* Social Icons with large mobile-friendly touch targets */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/kaifbidari-code/Online-_course"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1E293B] text-[#CBD5E1] hover:text-white hover:bg-indigo-600 flex items-center justify-center transition-all duration-200 border border-[#334155]"
                aria-label="GitHub Repository"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1E293B] text-[#CBD5E1] hover:text-white hover:bg-indigo-600 flex items-center justify-center transition-all duration-200 border border-[#334155]"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1E293B] text-[#CBD5E1] hover:text-white hover:bg-indigo-600 flex items-center justify-center transition-all duration-200 border border-[#334155]"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1E293B] text-[#CBD5E1] hover:text-white hover:bg-indigo-600 flex items-center justify-center transition-all duration-200 border border-[#334155]"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1 on mobile: Explore Links */}
          <div className="col-span-1">
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-[#CBD5E1]">
              <li><Link to="/explore" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">All Courses</Link></li>
              <li><Link to="/explore?category=web-development" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">Web Dev</Link></li>
              <li><Link to="/explore?category=data-science" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">Data Science</Link></li>
              <li><Link to="/explore?category=ui-ux-design" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">UI/UX Design</Link></li>
              <li><Link to="/explore?category=cybersecurity" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">Security</Link></li>
            </ul>
          </div>

          {/* Column 2 on mobile: Platform Links */}
          <div className="col-span-1">
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
              Platform
            </h4>
            <ul className="space-y-3 text-sm text-[#CBD5E1]">
              <li><Link to="/login" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">Instructor Portal</Link></li>
              <li><Link to="/register" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">Become Teacher</Link></li>
              <li><Link to="/dashboard" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">Student Hub</Link></li>
              <li><Link to="/certificates" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">Certificates</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all py-0.5">Admin Console</Link></li>
            </ul>
          </div>

          {/* Newsletter - Full width on mobile (col-span-2), 1-col on desktop */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block" />
              Stay Updated
            </h4>
            <p className="text-[#CBD5E1] text-xs leading-relaxed">
              Get weekly course releases, discounts, and tech insights directly in your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold animate-fade-in">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                <span>Thank you! You're subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-[#94A3B8]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#94A3B8] text-center sm:text-left">
          <p className="text-[#CBD5E1]">© {new Date().getFullYear()} LearnSphere Inc. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1.5 text-[#CBD5E1]">
            Built with <Heart size={14} className="text-red-500 fill-current inline" /> for modern learners worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-[#CBD5E1]">
            <Link to="/explore" className="hover:text-white transition-colors py-1">Privacy Policy</Link>
            <Link to="/explore" className="hover:text-white transition-colors py-1">Terms of Service</Link>
            <Link to="/explore" className="hover:text-white transition-colors py-1">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
