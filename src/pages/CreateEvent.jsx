import {
  Button,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
  Card
} from '@nextui-org/react'
import { postEvent } from '../service/events'
import { toast } from 'sonner'

function CreateEvent() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const title = data.get('title')
    const price = data.get('price')
    const description = data.get('description')
    const timetables = data.get('timetables')
    const flayer = data.get('flayer')
    const backflayer = data.get('backflayer')

    postEvent({
      timetables,
      title,
      price,
      description,
      flayer,
      backflayer
    })
      .then((res) => {
        console.log(res)
        toast.success('Event Created')
        form.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error('error')
      })
  }
  return (
    <section className='h-screen flex flex-col md:flex-row justify-center  items-center bg-gradient-to-b from-blue-500 via-purple-500 to-pink-400 '>
      <Card className='w-[95%]'>
        <CardHeader className='flex gap-3'>
          <Image
            alt='onda logo'
            height={60}
            radius='sm'
            src='https://img.freepik.com/foto-gratis/delicioso-muffin-cumpleanos-sobre-fondo-azul_23-2148351917.jpg'
            width={60}
          />
          <div className='flex flex-col'>
            <p className='text-md'>Crea tu evento</p>
            <p className='text-small text-default-500'>tu decides tu ONDA </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <h2 className=' font-medium text-large py-4'>Datos del Evento </h2>
          <form
            className='flex flex-col gap-3 space-y-3'
            onSubmit={handleSubmit}
          >
            <Input
              size={'md'}
              type='text'
              label='Title'
              name='title'
              isRequired
            />
            <Input
              size={'md'}
              type='number'
              label='Price'
              name='price'
              isRequired
            />
            <Input
              size={'md'}
              type='text'
              label='Description'
              name='description'
              maxLength={255}
              isRequired
            />
            <Input
              size={'md'}
              type='text'
              label='Time Tables'
              name='timetables'
              isRequired
            />

            <Input
              size={'md'}
              type='url'
              label='Flayer (Link)'
              name='flayer'
              isRequired
            />
            <Input
              size={'md'}
              type='url'
              label='backflayer (Link)'
              name='backflayer'
              isRequired
            />

            <Button
              type='submit'
              color='success'
              className='text-white font-bold'
              size='md'
              // endContent={<CameraIcon />}
            >
              Create Event
            </Button>
          </form>
        </CardBody>
        <Divider />
      </Card>
    </section>
  )
}

export default CreateEvent
