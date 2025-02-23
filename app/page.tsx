import AnimateNumber from '@/components/animate-number'
import { SearchIcon } from '@/components/icons'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <main className="my-8 flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight">Total subscriptions cost</h2>
        <AnimateNumber unit="₹" value={5100.2} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <SearchIcon className="absolute top-3.5 left-3.5 size-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search subscription" />
        </div>
      </div>
    </main>
  )
}
