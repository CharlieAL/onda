import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button
} from '@nextui-org/react'
import useTimeago from '../hooks/useTimeAgo'
import { givePermission, removePermission } from '../service/auth'
import { toast } from 'sonner'

export default function CardPermission({
  user_handle,
  avatar_url,
  email,
  first_name,
  last_name,
  phone_number,
  birth,
  pcreated_at,
  role,
  user_id
}) {
  const timeago = useTimeago(pcreated_at)
  const [isNormal, setIsNormal] = useState(role)

  const handleClick = () => {
    if (isNormal === 'company') {
      console.log('quitar permisos')
      removePermission(user_id)
        .then((res) => {
          console.log(res)
          toast.success('permisos removidos')
          setIsNormal('normal')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      givePermission(user_id)
        .then((res) => {
          console.log(res)
          toast.success('permisos otorgados')
          setIsNormal('company')
        })
        .catch((err) => {
          console.log(err)
        })
      console.log('dar permisos')
    }
  }
  return (
    <Card
      className=' '
      radius='none'
    >
      <CardBody className='flex justify-between'>
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
            <p className='text-small font-light'>{first_name}</p>
            <p className='text-small font-light'>{last_name}</p>
            <p className='text-small font-light'>{email}</p>
            <p className='text-small font-light'>{birth}</p>
            <p className='text-small font-light'>{phone_number}</p>
          </div>
          <div className='grow text-end flex flex-col justify-between'>
            <time className='text-sm text-gray-500'>{timeago}</time>
            <div>
              <Button
                color={isNormal === 'company' ? 'danger' : 'success'}
                variant='flat'
                onClick={handleClick}
              >
                {isNormal === 'company' ? 'Quitar permisos' : 'Dar permisos'}
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
