import { cn } from '@/lib/utils.ts'

export const SelectArrow = ({ className }: { className?: string }) => (
  <div
    className={
      cn(
        'absolute right-0 w-0 h-0 border-l-6 border-r-6 border-t-7 border-transparent border-t-gray-400',
        className
      )
    }
  />
)