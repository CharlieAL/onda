import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  Button
} from '@nextui-org/react'
import { login } from '../../service/auth'
import { useAuthActions } from '../../hooks/useAuth'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
function Login() {
  const { saveUser } = useAuthActions()
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const user_handle = data.get('user_handle')
    const password = data.get('password')

    // validate data
    if (!user_handle || !password) {
      toast.error('all fields are required')
      return
    }

    login(user_handle, password)
      .then((res) => {
        const user = res.payload
        saveUser(user)
      })
      .catch((err) => {
        console.log(err)
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
            <p className='text-md'>Bienvenido a Onda</p>
            <p className='text-small text-default-500'>ve a tu ONDA 🥳</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <h2 className=' font-medium text-large py-4'>Inicia sesión </h2>
          <form
            className='flex flex-col gap-3 space-y-3'
            onSubmit={handleSubmit}
          >
            <Input
              size={'md'}
              type='text'
              label='Usuario'
              name='user_handle'
            />
            <Input
              size={'md'}
              type='password'
              label='Contraseña'
              name='password'
            />

            <Button
              type='submit'
              color='success'
              className='text-white font-bold'
              size='md'
              // endContent={<CameraIcon />}
            >
              Iniciar sesión
            </Button>
            {/* <Button
              color='primary'
              className='text-white font-bold'
              size='lg'
              // endContent={<CameraIcon />}
            >
              Iniciar sesión con Facebook
            </Button>
            <Button
              color='danger'
              className='text-white font-bold'
              size='lg'
              // endContent={<CameraIcon />}
            >
              Iniciar sesión con Google
            </Button> */}
            {/* <Link href='https://github.com/nextui-org/nextui'>
              ¿Olvidaste tu contraseña?
            </Link> */}
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          {/* <NextLink> */}
          <Link to={'/signup'}>{"You don't have an account? Sign up"}</Link>
          {/* </NextLink> */}
        </CardFooter>
      </Card>
    </section>
  )
}

export default Login
