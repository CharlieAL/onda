import {
  Card as NextCard,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Divider,
  Image
} from '@nextui-org/react'

import { HeartIcon, UsersIcon } from '../assets/icons/svg'
import Parrafo from './parrafo'
import { usePostActions } from '../hooks/usePosts'

import ModalComments from './ModalComments'
import { useNavigate } from 'react-router-dom'
import useTimeAgo from '../hooks/useTimeAgo'

//

export default function Card({
  event_id,
  title,
  company_id,
  description,
  price,
  city,
  timetables,
  flayer,

  num_people_asist,
  num_likes,
  create_at,
  liked_by_user,
  num_comments,
  update
}) {
  const { addLike, removeLike } = usePostActions()
  const navigate = useNavigate()

  // const date = new Date(create_at).toLocaleDateString('es-ES', {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric'
  // })

  const handleLike = () => {
    // setitLiked(!liked_by_user)
    if (!liked_by_user) addLike(event_id)
    else removeLike(event_id)
    if (update) navigate(0)
  }
  const timeago = useTimeAgo(create_at)
  // console.log(timeago)
  return (
    <NextCard className='rounded-none'>
      <CardHeader className='justify-between'>
        <div className='flex gap-3'>
          <Avatar
            isBordered
            radius='full'
            size='md'
            src='https://img.freepik.com/vector-premium/icono-cuenta-icono-usuario-graficos-vectoriales_292645-552.jpg'
          />
          <div className='flex flex-col'>
            <p className='text-md'>{title}</p>
            <p className='text-small text-default-500'>
              company name {company_id}
            </p>
          </div>
        </div>
        <time className='text-sm text-gray-500'>{timeago}</time>
      </CardHeader>
      <Divider />
      {/* bg-gradient-to-b from-blue-500 via-purple-500 to-pink-400 */}
      <CardBody className=' rounded-none p-0 '>
        <Image
          src={flayer || 'https://fomantic-ui.com/images/wireframe/image.png'}
          alt='ONDA Image with fallback'
          className='w-screen min-h-[500px] object-cover rounded-none'
        />
      </CardBody>
      <Divider />
      <CardFooter className='flex flex-col items-start'>
        <div className='flex justify-between items-center w-full py-2'>
          <div className='space-x-4'>
            <Button
              color='danger'
              aria-label='Like'
              size='sm'
              variant={liked_by_user ? 'solid' : 'flat'}
              onClick={handleLike}
            >
              {num_likes}
              <HeartIcon />
            </Button>
            <Button
              color='success'
              variant='flat'
              size='sm'
              onClick={() => navigate(`/event/${event_id}`)}
            >
              {num_people_asist}
              <UsersIcon />
            </Button>
          </div>
          <div className='text-small text-gray-300 '></div>
        </div>
        <p className='text-small text-default-500'>
          {city} <span className='pl-2'>${price}</span>
        </p>
        <p className='text-small text-default-500'> {timetables}</p>
        <Parrafo>{description}</Parrafo>

        <section className='pt-5'>
          <ModalComments
            event_id={event_id}
            num_comments={num_comments}
            event={title}
          />
        </section>
      </CardFooter>
    </NextCard>
  )
}
