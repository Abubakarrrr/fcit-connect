import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="flex justify-center items-center flex-col space-y-3 my-8">
      <Skeleton className="h-[200px] w-[450px] rounded-xl " />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
