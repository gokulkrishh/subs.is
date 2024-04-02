import { Skeleton } from 'components/ui/skeleton';

export default function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-[74px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring justify-between bg-card-background p-3 px-4 rounded-xl border border-input ${className}`}
    >
      <div className="flex gap-3 items-center">
        <Skeleton className="rounded-full border bg-accent border-input w-[44px] h-[44px]" />
        <div className="flex gap-2 flex-col items-start">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-28 h-3" />
        </div>
      </div>
      <div className="flex mt-1.5 flex-col items-end w-fit">
        <Skeleton className="w-20 h-4 !rounded-md" />
        <Skeleton className="w-16 h-3 mt-2 !rounded-md" />
      </div>
    </div>
  );
}
