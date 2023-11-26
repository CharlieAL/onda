import React, { useEffect, useState } from 'react'
import { getMyTickets } from '../service/events'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'

function MyTickets() {
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    getMyTickets()
      .then((res) => {
        console.log(res)
        setTickets(res)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className='py-10'>
      <div className='flex flex-col gap-y-3 px-5'>
        {tickets.map((ticket) => (
          <Card
            className='py-4'
            key={ticket.user_event_id}
          >
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
              <p className='text-tiny uppercase font-bold'>{ticket.title}</p>
              <small className='text-default-500'>
                boletos: {ticket.boletos}
              </small>
              <h4 className='font-bold text-large'>{ticket.city}</h4>
            </CardHeader>
            <CardBody className='overflow-visible py-2 justify-center items-center'>
              <Image
                alt='Card background'
                className='object-cover rounded-xl w-full'
                src={ticket.flayer}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyTickets
