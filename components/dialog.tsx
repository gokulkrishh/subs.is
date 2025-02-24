import useMediaQuery from '@/hooks/useMediaQuery'

import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer'
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet'

export default function Dialog({ open, ...props }: React.ComponentProps<typeof Drawer>) {
  const isMobile = useMediaQuery('(max-width: 767px)')

  if (isMobile) {
    return (
      <Drawer open={open} {...props}>
        <DrawerContent>
          {props.children}
          <DrawerClose />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={open} {...props}>
      <SheetContent>
        {props.children}
        <SheetClose />
      </SheetContent>
    </Sheet>
  )
}
