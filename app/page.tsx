import AnimateNumber from '@/components/animate-number'
import { SearchIcon } from '@/components/icons'
import NavFilter from '@/components/nav'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <main vaul-drawer-wrapper="" className="my-2 flex w-full flex-col gap-4">
      <div className="flex w-full flex-col px-4">
        <AnimateNumber value={5100} />
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="relative px-4">
          <SearchIcon className="absolute top-4 left-8 size-4 text-neutral-400" />
          <Input className="h-12 pl-11" placeholder="Search subscription" />
        </div>

        <div className="flex w-full flex-col gap-2">
          <h3 className="px-4 text-2xl font-bold">Subscriptions</h3>
          <NavFilter />
        </div>
      </div>
    </main>
  )
}
