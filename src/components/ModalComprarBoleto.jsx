import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter
} from '@nextui-org/react'

import JSConfetti from 'js-confetti'

import { SendIcon } from '../assets/icons/svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { asistirEvento } from '../service/events'
import { usePostActions } from '../hooks/usePosts'

export default function ModalComprarBoleto({ price, event_id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { addAsistById } = usePostActions()
  const navigate = useNavigate()
  const [boletos, setBoletos] = useState(1)
  const jsConfetti = new JSConfetti()

  const handleComprarBoleto = () => {
    console.log('comprar boleto')
    asistirEvento(event_id, boletos)
      .then((res) => {
        console.log(res)
        jsConfetti.addConfetti()
        navigate('/my-tickets')
        onOpenChange()
        addAsistById(event_id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Button
        color='success'
        variant='flat'
        className='w-full'
        onClick={onOpen}
      >
        comprar boleto
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
            Comprar boletos
          </ModalHeader>
          <ModalBody className='p-0 '>
            <div className='h-[500px] p-0 relative overflow-x-hidden pb-5'>
              <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold'>{price * boletos}</h1>
                <p className='text-gray-400'>{boletos} boletos</p>
              </div>
              <div className='flex items-center justify-center pt-10'>
                <Button
                  color='danger'
                  onClick={() => {
                    if (boletos > 1) {
                      setBoletos(boletos - 1)
                    }
                  }}
                >
                  menos
                </Button>
                <span className='text-2xl font-bold px-10'>{boletos}</span>
                <Button
                  color='success'
                  onClick={() => {
                    setBoletos(boletos + 1)
                  }}
                >
                  mas
                </Button>
              </div>
              <div className='pt-10 px-5'>
                <Button
                  color='success'
                  variant='flat'
                  className='w-full'
                  onClick={handleComprarBoleto}
                >
                  {boletos > 1
                    ? `comprar ${boletos} boletos`
                    : 'comprar boleto'}
                </Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
