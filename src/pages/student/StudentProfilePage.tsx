import React, { useState } from 'react';
import { Save, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export function StudentProfilePage() {
  const { user } = useAuth();
  const { updateUser, enrollments, certificates } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [headline, setHeadline] = useState(user?.headline || 'Aspiring Software Engineer');
  const [bio, setBio] = useState(user?.bio || 'Passionate about Web Development, UI/UX, and AI.');
  const [location, setLocation] = useState(user?.location || 'San Francisco, CA');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, headline, bio, location });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-text-primary">Profile Settings</h1>
        <p className="text-sm text-text-secondary">Manage your personal information and public learner profile.</p>
      </div>

      <div className="card p-6 sm:p-8 bg-white shadow-soft space-y-6">
        {/* Avatar Header */}
        <div className="flex items-center gap-6 pb-6 border-b border-surface-100">
          <div className="relative">
            <Avatar src={user?.avatar} name={name} size="xl" />
            <button className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full shadow-soft hover:bg-primary-700">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">{name}</h2>
            <p className="text-xs text-text-muted">{user?.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="primary">{enrollments.length} Enrolled</Badge>
              <Badge variant="warning">{certificates.length} Certificates</Badge>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-primary">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-text-primary">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-text-primary">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-text-primary">Bio</label>
            <textarea
              rows={4}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full bg-surface-50 border border-surface-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" leftIcon={<Save size={16} />}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
