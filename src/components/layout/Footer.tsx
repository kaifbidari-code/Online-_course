import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Globe, Mail, Heart, CheckCircle2 } from 'lucide-react';

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
    <footer className="bg-[#0F172A] text-[#E2E8F0] pt-16 pb-10 border-t border-[#1E293B] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#334155]/60">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="font-extrabold text-white text-2xl tracking-tight">
                Learn<span className="text-primary-400">Sphere</span>
              </span>
            </Link>
            <p className="text-[#94A3B8] text-sm max-w-sm leading-relaxed">
              Empowering learners worldwide with interactive, high-impact courses taught by industry leaders. Master new skills, earn certificates, and accelerate your career.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/kaifbidari-code/Online-_course"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-primary-600 flex items-center justify-center transition-all duration-200 border border-[#334155]/60"
                aria-label="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-primary-600 flex items-center justify-center transition-all duration-200 border border-[#334155]/60"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-primary-600 flex items-center justify-center transition-all duration-200 border border-[#334155]/60"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-primary-600 flex items-center justify-center transition-all duration-200 border border-[#334155]/60"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li><Link to="/explore" className="hover:text-white hover:translate-x-1 inline-block transition-all">All Courses</Link></li>
              <li><Link to="/explore?category=web-development" className="hover:text-white hover:translate-x-1 inline-block transition-all">Web Development</Link></li>
              <li><Link to="/explore?category=data-science" className="hover:text-white hover:translate-x-1 inline-block transition-all">Data Science</Link></li>
              <li><Link to="/explore?category=ui-ux-design" className="hover:text-white hover:translate-x-1 inline-block transition-all">UI/UX Design</Link></li>
              <li><Link to="/explore?category=cybersecurity" className="hover:text-white hover:translate-x-1 inline-block transition-all">Cybersecurity</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li><Link to="/login" className="hover:text-white hover:translate-x-1 inline-block transition-all">Instructor Portal</Link></li>
              <li><Link to="/register" className="hover:text-white hover:translate-x-1 inline-block transition-all">Become an Instructor</Link></li>
              <li><Link to="/dashboard" className="hover:text-white hover:translate-x-1 inline-block transition-all">Student Dashboard</Link></li>
              <li><Link to="/certificates" className="hover:text-white hover:translate-x-1 inline-block transition-all">Verify Certificates</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white hover:translate-x-1 inline-block transition-all">Admin Console</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-[#94A3B8] text-xs mb-3 leading-relaxed">
              Get the latest course releases, discounts, and tech insights directly in your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-success-500/10 border border-success-500/30 text-success-400 rounded-xl text-xs font-semibold">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>Thank you! You're now subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#1E293B] border border-[#334155] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-primary-600/30 transition-all cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} LearnSphere Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-[#CBD5E1]">
            Built with <Heart size={14} className="text-red-500 fill-current" /> for modern learners worldwide.
          </p>
          <div className="flex flex-wrap gap-5 text-[#94A3B8]">
            <Link to="/explore" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/explore" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/explore" className="hover:text-white transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
