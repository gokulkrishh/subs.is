import CardSkeleton from 'components/card/skeleton';
import { ArrowDownIcon } from 'components/icons';
import NavSkeleton from 'components/nav-skeleton';
import { SearchInput } from 'components/ui/search-input';
import { Skeleton } from 'components/ui/skeleton';

export default function Loader() {
  return (
    <main className="flex flex-col mt-10">
      <div className="flex flex-col">
        <h2 className="font-medium tracking-wide flex items-center gap-1">
          <label>Total cost</label>
          <div className={`flex border-b border-input relative items-center w-fit`}>
            <Skeleton className="w-10 rounded h-5 bg-accent" />
            <ArrowDownIcon className="ml-0.5 absolute -right-5 h-4 w-4 text-primary" />
          </div>
        </h2>
        <div className="text-5xl mt-2 font-extrabold tabular-nums">
          <Skeleton className="w-48 h-[50px] bg-accent" />
        </div>
      </div>
      <div className="flex flex-col my-10">
        <SearchInput />
        <NavSkeleton />
        <div className="flex gap-3 flex-col w-full my-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </main>
  );
}
