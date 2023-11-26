import { Card, CardBody, Avatar, Button } from '@nextui-org/react'

import { useUserActions } from '../hooks/useUsers'

export default function CardUser({
  user_handle,
  avatar_url,
  first_name,
  friend_status,
  user_id
}) {
  const { fetchRequestFriend, fetchAcceptFriend } = useUserActions()
  const handleClick = () => {
    // si el status es enviar => pendiente
    // si el status es pendiente => amigos
    // si el status es aceptar => amigos

    if (friend_status === 'enviar') {
      // va a cambiar a pendiente
      fetchRequestFriend(user_id)
    }
    if (friend_status === 'aceptar') {
      fetchAcceptFriend(user_id)
    }
  }
  return (
    <Card
      className='bg-transparent '
      radius='none'
    >
      <CardBody className='flex-row justify-between'>
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
              {first_name}
            </h4>
            <p className='text-small font-light text-gray-400'>
              @{user_handle}
            </p>
          </div>
        </div>
        <Button
          // className={
          //   isFollowed
          //     ? 'bg-transparent text-foreground border-default-200'
          //     : ''
          // }
          color='primary'
          radius='full'
          size='sm'
          // variant={

          // }
          onPress={handleClick}
        >
          {friend_status}
        </Button>
      </CardBody>
    </Card>
  )
}
