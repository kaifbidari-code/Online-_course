import { Plus, Edit2, Trash2 } from 'lucide-react';
import { mockCategories } from '../../data/categories';
import Button from '../../components/ui/Button';

export function CategoryManagementPage() {
  const categories = mockCategories;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-text-primary">Category Management</h1>
          <p className="text-sm text-text-secondary">Organize subject areas, icons, and descriptions.</p>
        </div>
        <Button leftIcon={<Plus size={16} />}>Add Category</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="card p-5 bg-white shadow-soft space-y-3 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-bold text-base text-text-primary">{cat.name}</h3>
                <p className="text-xs text-text-muted">{cat.courseCount} courses</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2">{cat.description}</p>
            <div className="pt-3 border-t border-surface-100 flex justify-end gap-2">
              <Button size="sm" variant="ghost"><Edit2 size={14} /></Button>
              <Button size="sm" variant="ghost" className="text-error-600"><Trash2 size={14} /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
