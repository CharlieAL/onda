import { Card, CardHeader, Skeleton } from '@nextui-org/react'

export default function CardSkeleton() {
  return (
    <Card className='w-full  space-y-5 rounded-none '>
      <CardHeader>
        <div className=' w-full flex items-center gap-3'>
          <div>
            <Skeleton className='flex rounded-full w-12 h-12' />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <Skeleton className='h-3 w-3/5 rounded-lg' />
            <Skeleton className='h-3 w-4/5 rounded-lg' />
          </div>
        </div>
      </CardHeader>
      <Skeleton className=''>
        <div className='h-[400px] rounded-lg bg-default-300'></div>
      </Skeleton>
      <div className='space-y-3'>
        <Skeleton className='w-3/5 rounded-lg'>
          <div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
        </Skeleton>
        <Skeleton className='w-4/5 rounded-lg'>
          <div className='h-3 w-4/5 rounded-lg bg-default-200'></div>
        </Skeleton>
        <Skeleton className='w-2/5 rounded-lg'>
          <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
        </Skeleton>
      </div>
    </Card>
  )
}
