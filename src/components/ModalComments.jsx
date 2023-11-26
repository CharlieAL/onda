import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter
} from '@nextui-org/react'
import ListComments from './ListCommets'
import { SendIcon } from '../assets/icons/svg'
import { createComment, getComments } from '../service/events'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { usePostActions } from '../hooks/usePosts'

export default function ModalComments({ event_id, event, num_comments }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { addNumComments } = usePostActions()

  const [commnets, setCommnets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [upload, setUpload] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setIsLoading(true)
    getComments(event_id)
      .then((res) => {
        setCommnets(res)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [event_id, isOpen, upload])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const comment = data.get('comment')

    if (!comment) return

    createComment(event_id, comment)
      .then(() => {
        setUpload(!upload)
        toast.success('Comment Created')
        addNumComments(event_id)
        form.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error('error')
      })
  }

  return (
    <>
      {num_comments > 0 ? (
        <button
          onClick={onOpen}
          className='text-gray-400'
        >
          Ver los {num_comments} comentarios
        </button>
      ) : (
        <button
          onClick={onOpen}
          className='text-gray-400 font-semibold'
        >
          Se el primero en comentar 🙌
        </button>
      )}
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
            Comentarios de {event}
          </ModalHeader>
          <ModalBody className='p-0 '>
            <div className='h-[500px] p-0 relative overflow-x-hidden pb-5'>
              <ListComments
                data={commnets}
                loading={isLoading}
              />
            </div>
          </ModalBody>
          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
