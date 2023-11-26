import { useEffect, useState } from 'react'
import { getFriends, getMessages } from '../service/auth'

import { Avatar, CardBody, Card } from '@nextui-org/react'
import { ArrowRightIcon } from '../assets/icons/svg'
import { useNavigate } from 'react-router-dom'
import { useChatActions, useChatSelector } from '../hooks/useChat'

function Friends() {
  const [friends, setFriends] = useState([])

  const navigate = useNavigate()

  const chats = useChatSelector((state) => state.chat.data)

  const { saveMessages } = useChatActions()

  useEffect(() => {
    getFriends()
      .then((res) => {
        setFriends(res)
        res.forEach((friend) => {
          getMessages(friend.user_id).then((messages) => {
            console.log({
              idFriend: friend.user_id + '',
              messages
            })
            saveMessages({
              idFriend: friend.user_id + '',
              messages
            })
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      {friends.map((friend) => {
        const thisChat = chats.find(
          (chat) => chat.idFriend === friend.user_id + ''
        )

        const lastMessage = thisChat?.messages
          ? thisChat.messages[thisChat.messages.length - 1]
          : {}
        console.log(lastMessage)
        return (
          <div
            key={friend.user_id}
            onClick={() => {
              navigate(`/chat/${friend.user_id}`)
            }}
          >
            <Card
              className='bg-transparent '
              radius='none'
            >
              <CardBody className='flex-row justify-between items-center'>
                <div className='flex gap-5'>
                  <div>
                    <Avatar
                      isBordered
                      radius='full'
                      size='md'
                      src={
                        friend.avatar_url ||
                        'https://img.freepik.com/vector-premium/icono-cuenta-icono-usuario-graficos-vectoriales_292645-552.jpg'
                      }
                      className='ring-2 ring-white w-10 h-10'
                    />
                  </div>
                  <div className='flex flex-col gap-1 items-start justify-center'>
                    <h4 className='text-small font-semibold leading-none text-azul '>
                      @{friend.user_handle}
                    </h4>
                    <p className='text-small font-light text-gray-400'>
                      {lastMessage?.mensaje || 'No hay mensajes'}
                    </p>
                  </div>
                </div>
                <div>
                  <ArrowRightIcon />
                </div>
              </CardBody>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default Friends
