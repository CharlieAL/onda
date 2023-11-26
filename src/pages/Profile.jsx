import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, updateUser } from '../service/auth'
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import {
  EditIcon,
  EmailIcon,
  LogoutIcon,
  PhoneIcon,
  PlusIcon,
  SendIcon,
  SunIcon,
  UserIcon
} from '../assets/icons/svg'
import ProfileButton from '../components/ProfileButton'
import { toast } from 'sonner'
import { useAuthActions } from '../hooks/useAuth'

function Profile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const navigate = useNavigate()
  const { id } = useParams()
  const { updateUser: userUpdateContext, logoutUser } = useAuthActions()
  const [user, setUser] = useState(null)
  const [data, setData] = useState({
    label: '',
    name: '',
    value: '',
    type: 'text'
  })
  useEffect(() => {
    console.log(id)
    getUser(id)
      .then((res) => {
        setUser(res)
      })
      .catch((err) => console.log(err))
  }, [id, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const text = formData.get(data.name)
    console.log(data)
    console.log(text)
    if (text === '') {
      toast.error('no puedes dejar el campo vacio')
      return
    }
    updateUser(id, { [data.name]: text })
      .then((res) => {
        console.log(res)
        onOpenChange()
        form.reset()
        userUpdateContext({ [data.name]: text })
        toast.success(`updated ${data.name}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <section className='pb-36 pt-10 '>
        <div className='flex items-center justify-center flex-col w-full  text-center'>
          <Avatar
            src={user?.avatar_url}
            color='danger'
            isBordered
            className='w-20 h-20 text-large'
          />
          <button
            className='mt-3 text-azul'
            onClick={() => {
              onOpen()
              setData({
                label: 'Avatar',
                name: 'avatar_url',
                value: user?.avatar_url,
                type: 'url'
              })
            }}
          >
            Editar
          </button>
        </div>
        <ul className='flex flex-col px-5 gap-y-4'>
          <ProfileButton
            value={user?.user_handle}
            label={'User hanlde'}
            onClick={() => {
              onOpen()
              setData({
                label: 'User hanlde',
                name: 'user_handle',
                value: user?.user_handle,
                type: 'text'
              })
            }}
          >
            <UserIcon />
          </ProfileButton>
          <ProfileButton
            label={'Name'}
            value={user?.first_name}
            onClick={() => {
              onOpen()
              setData({
                label: 'Name',
                name: 'first_name',
                value: user?.first_name,
                type: 'text'
              })
            }}
          >
            <UserIcon />
          </ProfileButton>
          <ProfileButton
            value={user?.last_name}
            label={'Last Name'}
            onClick={() => {
              onOpen()
              setData({
                label: 'Last Name',
                name: 'last_name',
                value: user?.last_name,
                type: 'text'
              })
            }}
          >
            <UserIcon />
          </ProfileButton>
          <ProfileButton
            value={user?.email}
            label={'Email'}
            onClick={() => {
              onOpen()
              setData({
                label: 'Email',
                name: 'email',
                value: user?.email,
                type: 'email'
              })
            }}
          >
            <EmailIcon />
          </ProfileButton>
          <ProfileButton
            value={user?.phone_number}
            label={'Phone number'}
            onClick={() => {
              onOpen()
              setData({
                label: 'Phone number',
                name: 'phone_number',
                value: user?.phone_number,
                type: 'number'
              })
            }}
          >
            <PhoneIcon />
          </ProfileButton>
          <ProfileButton
            value={user?.birth}
            label={'Birth'}
            onClick={() => {
              onOpen()
              setData({
                label: 'Birth',
                name: 'birth',
                value: user?.birth,
                type: 'date'
              })
            }}
          >
            <SunIcon />
          </ProfileButton>
          {user?.role !== 'normal' && (
            <ProfileButton
              label={'create event'}
              onClick={() => {
                navigate(`/create`)
              }}
            >
              <PlusIcon />
            </ProfileButton>
          )}
          <ProfileButton
            label={'Logout'}
            onClick={() => {
              setData({})
              logoutUser()
            }}
          >
            <LogoutIcon />
          </ProfileButton>
        </ul>
        <div className='my-10 flex justify-center'>
          {user?.role === 'normal' && (
            <div className='flex flex-col items-center space-x-3'>
              <Button
                isIconOnly
                color='primary'
              >
                <SendIcon />
              </Button>
              <span> send permission to register your company</span>
            </div>
          )}
          {user?.role === 'company' && (
            <div className='flex flex-col items-center'>
              <Button color='primary'>
                <EditIcon />
                edit company
              </Button>
            </div>
          )}
          {user?.role === 'admin' && (
            <div className='flex flex-col items-center'>
              <Button color='primary'>
                <EditIcon />
                edit company
              </Button>
              <span>you are the admin</span>
            </div>
          )}
        </div>
      </section>
      <Modal
        backdrop='opaque'
        size='5xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius='2xl'
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#292f46] bg-gradient-to-l from-gray-900  to-black text-[#a8b0d3]',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10'
        }}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            {data.label}
          </ModalHeader>
          <ModalBody className=' '>
            <form
              onSubmit={handleSubmit}
              className='h-[500px] p-0 relative overflow-x-hidden pb-5 flex flex-col items-center gap-y-4'
            >
              <Input
                size='md'
                type={data.type}
                label={data.label}
                name={data.name}
                placeholder={`Enter ${data.label}`}
              />
              <Button
                className='px-10'
                color='danger'
                type='submit'
              >
                Send
              </Button>
              {data.name === 'birth' ? (
                <p>
                  {data.label} actual:{' '}
                  {new Date(user.birth).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              ) : (
                <p>
                  {data.label} actual: {data.value}
                </p>
              )}
            </form>
          </ModalBody>
          {/* <ModalFooter>
            <form
              onSubmit={handleSubmit}
              className='flex items-center py-1 sticky gap-x-2 px-3 w-full pb-10 '
            >
              <input
                type='text'
                name='comment'
                placeholder='Escribe un comentario'
                className='bg-gray-700  text-[#a8b0d3] w-full rounded-full p-3 outline-azul'
              />
              <Button
                className='bg-gradient-to-l from-azul  to-pink-400  text-white rounded-full'
                isIconOnly
                type='submit'
              >
                <SendIcon />
              </Button>
            </form>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Profile
