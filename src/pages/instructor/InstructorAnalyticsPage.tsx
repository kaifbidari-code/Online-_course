import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockInstructorStats } from '../../data/mockData';

export function InstructorAnalyticsPage() {
  const stats = mockInstructorStats;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-text-primary">Instructor Analytics</h1>
        <p className="text-sm text-text-secondary">Detailed revenue breakdown and enrollment velocity metrics.</p>
      </div>

      <div className="card p-6 bg-white shadow-soft space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Monthly Sales Velocity</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={v => `$${v}`} />
              <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Earnings']} />
              <Bar dataKey="revenue" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
