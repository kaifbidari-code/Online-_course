import { useState } from 'react';
import { Save } from 'lucide-react';
import Button from '../../components/ui/Button';

export function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('LearnSphere');
  const [supportEmail, setSupportEmail] = useState('support@learnsphere.com');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-text-primary">Platform Settings</h1>
        <p className="text-sm text-text-secondary">Configure branding, payment gateways, and system defaults.</p>
      </div>

      <div className="card p-6 sm:p-8 bg-white shadow-soft space-y-6">
        <form onSubmit={e => { e.preventDefault(); alert('Settings saved successfully!'); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-primary">Platform Name</label>
            <input
              type="text"
              value={siteName}
              onChange={e => setSiteName(e.target.value)}
              className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-text-primary">Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={e => setSupportEmail(e.target.value)}
              className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" leftIcon={<Save size={16} />}>Save Settings</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
