import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEvent } from '../service/events'
import { Button, Image } from '@nextui-org/react'
import ModalComprarBoleto from '../components/ModalComprarBoleto'
import ModalnvitarAmigos from '../components/ModalnvitarAmigos'

function Event() {
  const { id } = useParams()
  const [event, setEvent] = useState({})

  useEffect(() => {
    getEvent(id)
      .then((res) => {
        console.log(res)
        setEvent(res)
      })
      .catch((err) => console.log(err))
  }, [id])
  return (
    <section>
      <div className='px-5 pt-3'>
        <Image
          alt=''
          className='bg-black w-screen min-h-[400px] object-cover '
          src={
            event.backflayer ||
            'https://fomantic-ui.com/images/wireframe/image.png'
          }
        />
      </div>
      <div className='flex flex-col px-5 py-2 gap-y-2'>
        <ModalComprarBoleto
          price={event.price}
          event_id={event.event_id}
        />
        <ModalnvitarAmigos
          url={event.flayer}
          idEvent={event.event_id}
          title={event.title}
        />
        <Button
          color='warning'
          variant='flat'
          className='w-full'
        >
          ver compañia
        </Button>
      </div>
    </section>
  )
}

export default Event
