import { cn } from '../../utils/cn';

interface SkeletonProps { className?: string; }

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse bg-surface-200 rounded-lg', className)} />;
}

export function CourseCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Skeleton className="w-full h-48 rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2"><Skeleton className="h-5 w-20" /><Skeleton className="h-5 w-16" /></div>
        <Skeleton className="h-5 w-full" /><Skeleton className="h-5 w-3/4" />
        <div className="flex items-center gap-2"><Skeleton className="w-6 h-6 rounded-full" /><Skeleton className="h-4 w-32" /></div>
        <div className="flex gap-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-4 w-20" /></div>
        <div className="flex justify-between items-center pt-2 border-t border-surface-100">
          <Skeleton className="h-7 w-16" /><Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function DashboardStatSkeleton() {
  return (
    <div className="card p-6">
      <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="w-10 h-10 rounded-xl" /></div>
      <Skeleton className="h-8 w-20 mt-3" /><Skeleton className="h-4 w-32 mt-2" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-surface-100">
      {Array.from({ length: cols }, (_, i) => (
        <td key={i} className="px-6 py-4"><Skeleton className="h-4 w-full" /></td>
      ))}
    </tr>
  );
}
