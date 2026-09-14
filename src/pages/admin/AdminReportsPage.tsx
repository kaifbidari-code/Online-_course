import { Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockAdminStats } from '../../data/mockData';
import Button from '../../components/ui/Button';

export function AdminReportsPage() {
  const stats = mockAdminStats;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-text-primary">Financial & Platform Reports</h1>
          <p className="text-sm text-text-secondary">Export financial summaries and platform activity reports.</p>
        </div>
        <Button leftIcon={<Download size={16} />} onClick={() => alert('Financial report downloaded as CSV!')}>
          Export CSV Report
        </Button>
      </div>

      <div className="card p-6 bg-white shadow-soft space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Platform Gross Volume (2026)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={v => `$${v}`} />
              <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Gross Volume']} />
              <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={3} fill="#7C3AED" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
