import {
  Button,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
  Card
} from '@nextui-org/react'
import { toast } from 'sonner'
import { createCompany } from '../service/company'

function CreateCompany() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name_company = data.get('name_company')
    const phone_number = data.get('phone_number')
    const description = data.get('description')
    const timetables = data.get('timetables')
    const email = data.get('email')
    const location = data.get('location')
    const image_url_1 = data.get('image_url_1')
    const image_url_2 = data.get('image_url_2')
    const image_url_3 = data.get('image_url_3')
    const image_url_4 = data.get('image_url_4')

    createCompany({
      timetables,
      name_company,
      phone_number,
      description,
      email,
      location,
      image_url_1,
      image_url_2,
      image_url_3,
      image_url_4
    })
      .then((res) => {
        console.log(res)
        toast.success('Company Created')
        form.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error('error')
      })
  }
  return (
    <section className='h-screen flex flex-col md:flex-row justify-center  items-center bg-gradient-to-b from-blue-500 via-purple-500 to-pink-400 overflow-hidden'>
      <Card className='w-[95%] h-[600px] '>
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
        <CardBody className=''>
          <h2 className=' font-medium text-large py-4'>Datos del Evento </h2>
          <form
            className='flex flex-col gap-3 space-y-3'
            onSubmit={handleSubmit}
          >
            <Input
              size={'md'}
              type='text'
              label='Nombre De la Company'
              name='name_company'
              isRequired
            />
            <Input
              size={'md'}
              type='number'
              label='phone_number'
              name='phone_number'
              isRequired
            />
            <Input
              size={'md'}
              type='text'
              label='Description'
              name='description'
              maxLength={75}
              isRequired
            />
            <Input
              size={'md'}
              type='email'
              label='Email'
              name='email'
              isRequired
            />
            <Input
              size={'md'}
              type='text'
              label='location (city)'
              name='location'
              isRequired
            />
            <Input
              size={'md'}
              type='url'
              label='Image 1'
              name='image_url_1'
            />
            <Input
              size={'md'}
              type='url'
              label='Image 2'
              name='image_url_2'
            />
            <Input
              size={'md'}
              type='url'
              label='Image 3'
              name='image_url_3'
            />
            <Input
              size={'md'}
              type='url'
              label='Image 4'
              name='image_url_4'
            />
            <Button
              type='submit'
              color='success'
              className='text-white font-bold'
              size='md'
            >
              Create Company
            </Button>
          </form>
        </CardBody>
        <Divider />
      </Card>
    </section>
  )
}

export default CreateCompany
