import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter
} from '@nextui-org/react'

import { useEffect, useState } from 'react'
import { getFriends } from '../service/auth'
import CardUser from './CardUser'
import { useSocket } from '../hooks/useSocket'
import { useAuthSelector } from '../hooks/useAuth'

export default function ModalnvitarAmigos({ url, idEvent, title }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [friends, setFriends] = useState([])
  const { user } = useAuthSelector((state) => state.auth)
  const { sendMessage } = useSocket(user.user_id)

  useEffect(() => {
    getFriends().then((res) => {
      console.log(res)
      setFriends(res)
    })
  }, [])

  const handleComprarBoleto = (friend) => {
    const payload = {
      de: user.user_id + '',
      para: friend.user_id + '',
      mensaje: `#evento,${url},${idEvent},${title}`
    }
    console.log(payload)
    sendMessage(payload)
  }

  return (
    <>
      <Button
        color='primary'
        variant='flat'
        className='w-full'
        onClick={onOpen}
      >
        Invitar Amigos
      </Button>
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
            Invitar Amigos
          </ModalHeader>
          <ModalBody className='p-0 '>
            <div className='h-[500px] p-0 relative overflow-x-hidden pb-5'>
              {friends.map((user, i) => (
                <CardUser
                  key={i}
                  onClick={() => handleComprarBoleto(user)}
                  friend_status={'invitar'}
                  {...user}
                />
              ))}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
