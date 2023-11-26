import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSocket } from '../hooks/useSocket'
import { useAuthSelector } from '../hooks/useAuth'
import { Avatar, Button } from '@nextui-org/react'
import { BackIcon, SendIcon } from '../assets/icons/svg'
import { getMessages, getUser } from '../service/auth'
import Message from '../components/Message'
import { useChatActions, useChatSelector } from '../hooks/useChat'

function Chat() {
  const { user } = useAuthSelector((state) => state.auth)
  const [friend, setFriend] = useState({})
  const navigate = useNavigate()
  const { sendMessage } = useSocket(user.user_id)
  const { id } = useParams()
  const chats = useChatSelector((state) => state.chat.data)

  const { saveMessage, saveMessages } = useChatActions()

  useEffect(() => {
    getUser(id).then((res) => {
      setFriend(res)
    })
  }, [id])

  useEffect(() => {
    getMessages(id).then((messages) => {
      console.log(messages)
      saveMessages({
        idFriend: id + '',
        messages
      })
    })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const message = data.get('message')
    const payload = {
      deName: user.user_handle,
      de: user.user_id + '',
      para: id,
      mensaje: message,
      created_at: new Date().toISOString()
    }
    sendMessage(payload)

    saveMessage({
      idFriend: id,
      message: {
        de: user.user_id + '',
        para: id,
        mensaje: message,
        created_at: new Date().toISOString()
      }
    })

    form.reset()
  }

  const thisChat = chats.find((chat) => chat.idFriend === id)
  const messages = thisChat ? thisChat.messages : []
  return (
    <>
      <section className='flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen'>
        <header className='py-2 border-b-2 border-gray-800'>
          <div className='flex justify-between items-end h-16  text-center px-5 '>
            <div className='w-full flex items-center gap-x-2 '>
              <button
                onClick={() => navigate(-1)}
                className='text-gray-400'
              >
                <BackIcon />
              </button>
              <div className='flex-shrink-0'>
                <Avatar
                  className='h-10 w-10 rounded-full'
                  src={
                    friend.avatar_url ||
                    'https://img.freepik.com/vector-premium/icono-cuenta-icono-usuario-graficos-vectoriales_292645-552.jpg'
                  }
                  alt=''
                />
              </div>
              <div className=''>
                <h2 className='text-lg leading-4 font-medium text-gray-100'>
                  {friend.user_handle}
                </h2>
              </div>
            </div>
          </div>
        </header>
        <div
          id='messages'
          className='flex flex-col flex-1  space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
        >
          {messages.map((message, i) => (
            <Message
              created_at={message.created_at}
              avatarFriend={friend.avatar_url}
              avatarMe={user.avatar_url}
              key={i}
              de={message.de}
              mensaje={message.mensaje}
              myId={user.user_id + ''}
            />
          ))}
        </div>
        <div className='border-t-2 border-gray-800 px-4 pt-4 mb-2 sm:mb-0 pb-16'>
          <form
            onSubmit={handleSubmit}
            className='flex items-center justify-between space-x-3 '
          >
            <input
              type='text'
              name='message'
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
        </div>
      </section>
      <style jsx>{`
        .scrollbar-w-2::-webkit-scrollbar {
          width: 0.25rem;
          height: 0.25rem;
        }

        .scrollbar-track-blue-lighter::-webkit-scrollbar-track {
          --bg-opacity: 1;
          background-color: #f7fafc;
          background-color: rgba(247, 250, 252, var(--bg-opacity));
        }

        .scrollbar-thumb-blue::-webkit-scrollbar-thumb {
          --bg-opacity: 1;
          background-color: #edf2f7;
          background-color: rgba(237, 242, 247, var(--bg-opacity));
        }

        .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default Chat
