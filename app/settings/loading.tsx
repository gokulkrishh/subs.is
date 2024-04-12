import SettingsCard from 'components/settings/settings-card';
import { Skeleton } from 'components/ui/skeleton';

export default async function Loader() {
  return (
    <div className="flex flex-col my-10 gap-2">
      <div className="border-border pb-24 flex flex-col">
        <h2 className="font-medium mb-2">General</h2>
        <div className="flex gap-4 flex-col">
          <SettingsCard className="h-[86px] px-3">
            <div className="flex gap-3 w-full items-center">
              <Skeleton className="h-12 shrink-0 w-12 rounded-full bg-accent border border-input" />
              <div className="grid max-w-sm w-full">
                <div className="font-medium truncate pr-4">
                  <Skeleton className="w-52 h-5 bg-accent mb-1.5" />
                </div>
                <div className="text-sm truncate pr-4 text-muted-foreground">
                  <Skeleton className="w-36 h-5 bg-accent" />
                </div>
              </div>
            </div>
          </SettingsCard>
          <SettingsCard className="flex h-[135px] flex-col !p-0">
            <div className="flex flex-col pb-0 w-full p-3 px-4">
              <Skeleton className="rounded-md h-[20px] w-28 bg-accent border border-input" />
              <Skeleton className="rounded-md text-sm mt-2 text-muted-foreground h-[20px] w-48 bg-accent border border-input" />
            </div>
            <div className="flex w-full justify-end border-t mt-4 border-border rounded-bl-lg rounded-br-lg p-2 px-3.5">
              <Skeleton className="inline-flex w-[49px] items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 border border-input bg-accent hover:bg-accent hover:text-accent-foreground h-10 py-2 px-3 gap-2 text-ellipsis justify-start overflow-hidden" />
            </div>
          </SettingsCard>
          <SettingsCard className="flex h-[155px] md:h-[135px] flex-col !p-0">
            <div className="flex flex-col pb-0 w-full p-3 px-4">
              <Skeleton className="rounded-md h-[20px] w-20 bg-accent border border-input" />
              <Skeleton className="rounded-md text-sm mt-2 text-muted-foreground h-[20px] w-56 bg-accent border border-input" />
            </div>
            <div className="flex w-full justify-end border-t mt-4 border-border rounded-bl-lg rounded-br-lg p-2 px-3.5">
              <Skeleton className="inline-flex w-[78px] items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 border border-input bg-accent hover:bg-accent hover:text-accent-foreground h-10 py-2 px-3 gap-2 text-ellipsis justify-start overflow-hidden" />
            </div>
          </SettingsCard>
          <SettingsCard className="flex h-[155px] md:h-[135px] flex-col !p-0">
            <div className="flex flex-col pb-0 w-full p-3 px-4">
              <Skeleton className="rounded-md h-[20px] w-20 bg-accent border border-input" />
              <Skeleton className="rounded-md text-sm mt-2 text-muted-foreground h-[20px] w-72 bg-accent border border-input" />
            </div>
            <div className="flex w-full justify-end border-t mt-4 border-border rounded-bl-lg rounded-br-lg p-2 px-3.5">
              <Skeleton className="inline-flex w-[94px] items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 border border-input bg-accent hover:bg-accent hover:text-accent-foreground h-10 py-2 px-3 gap-2 text-ellipsis justify-start overflow-hidden" />
            </div>
          </SettingsCard>
        </div>
        <div className="border-border mt-7 pb-24 flex flex-col">
          <h2 className="font-medium mb-2">Danger Zone</h2>
          <div className="flex gap-4 flex-col">
            <SettingsCard className="flex h-[155px] flex-col border-red-300 dark:border-red-500/30 !p-0">
              <div className="flex flex-col pb-0 w-full p-3 px-4">
                <Skeleton className="rounded-md h-[20px] w-20 bg-accent border border-input" />
                <Skeleton className="rounded-md text-sm mt-2 text-muted-foreground h-[20px] w-80 bg-accent border border-input" />
              </div>
              <div className="flex w-full bg-red-700/10 justify-end border-t mt-4 border-red-300 dark:border-red-500/30  rounded-bl-lg rounded-br-lg p-2 px-3.5">
                <Skeleton className="inline-flex w-[88px] items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 p-3 font-normal" />
              </div>
            </SettingsCard>
          </div>
        </div>
      </div>
    </div>
  );
}
