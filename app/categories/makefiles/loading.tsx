import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="text-center mb-12 md:mb-20">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>

      <div className="mb-12">
        <Skeleton className="h-10 w-full mb-8" />

        <div className="space-y-8">
          <div>
            <Skeleton className="h-40 w-full rounded-md" />
          </div>
          <div>
            <Skeleton className="h-40 w-full rounded-md" />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Skeleton className="h-10 w-1/3 mx-auto mb-6" />

        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-60 w-full rounded-md" />
          <Skeleton className="h-60 w-full rounded-md" />
          <Skeleton className="h-60 w-full rounded-md" />
          <Skeleton className="h-60 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}

