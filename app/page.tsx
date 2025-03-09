import AnimateNumber from '@/components/animate-number'
import { SearchIcon } from '@/components/icons'
import NavFilter from '@/components/nav'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <main vaul-drawer-wrapper="" className="my-8 flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-3 px-4">
        <h2 className="text-xl font-bold tracking-tight">Total subscriptions cost</h2>
        <AnimateNumber unit="₹" value={5100.2} />
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="relative px-4">
          <SearchIcon className="absolute top-5 left-8 size-4 text-neutral-400" />
          <Input className="h-14 pl-12" placeholder="Search subscription" />
        </div>

        <div className="flex w-full flex-col gap-2">
          <h3 className="px-4 text-2xl font-bold">Subscriptions</h3>
          <NavFilter />
        </div>
      </div>
    </main>
  )
}
