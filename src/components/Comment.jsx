import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button
} from '@nextui-org/react'

export default function Comment({ user_handle, avatar_url, comment }) {
  return (
    <Card
      className='bg-transparent '
      radius='none'
    >
      <CardBody className='justify-between'>
        <div className='flex gap-5'>
          <div>
            <Avatar
              isBordered
              radius='full'
              size='md'
              src={
                avatar_url ||
                'https://img.freepik.com/vector-premium/icono-cuenta-icono-usuario-graficos-vectoriales_292645-552.jpg'
              }
              className='ring-2 ring-white w-10 h-10'
            />
          </div>
          <div className='flex flex-col gap-1 items-start justify-center'>
            <h4 className='text-small font-semibold leading-none text-azul '>
              @{user_handle}
            </h4>
            <p className='text-small font-light'>{comment}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
