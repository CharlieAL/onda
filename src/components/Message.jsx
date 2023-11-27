import { useEffect, useState } from 'react'
import useTimeago from '../hooks/useTimeAgo'
import { Button, Image } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export default function Message({
  de,
  mensaje,
  myId,
  avatarFriend,
  avatarMe,
  created_at
}) {
  const [info, setInfo] = useState(null)
  const timaago = useTimeago(created_at)
  const navigate = useNavigate()

  // }

  useEffect(() => {
    const regex = /#(\w+),(\S+),(\w+)/
    const regex2 = /#(\w+),([^,]+),([^,]+),(.+)/

    const match = mensaje.match(regex)
    const match2 = mensaje.match(regex2)

    if (match) {
      const [, , url_foto, id] = match
      if (id && url_foto) {
        setInfo({ id, url_foto })
      } else {
        setInfo(null)
      }
    }
    if (match2) {
      const [, , url_foto, id, title] = match2
      if (id && url_foto && title) {
        setInfo({ id, url_foto, title })
      } else {
        setInfo(null)
      }
    }
  }, [mensaje])

  return de === myId ? (
    <div className='chat-message'>
      <div className='flex items-end justify-end'>
        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
          <div className='flex flex-col items-end'>
            <div>
              <span
                className={`px-4 py-2 rounded-lg inline-block rounded-br-none ${
                  info
                    ? 'bg-gradient-to-l from-azul  to-pink-400 '
                    : 'bg-gradient-to-b from-red-500 to-red-800'
                } text-white font-normal text-sm`}
              >
                {info ? (
                  <div className='flex flex-col justify-center gap-y-1'>
                    <Image
                      src={info.url_foto}
                      width={200}
                      height={200}
                      className='object-contain'
                    />
                    <Button
                      onClick={() => navigate(`/event/${info.id}`)}
                      color='danger'
                    >
                      {info?.title || 'ver publicacion'}
                    </Button>
                  </div>
                ) : (
                  mensaje
                )}
              </span>
            </div>
            <div>
              <span className=' text-xs text-gray-400 mr-2 mb-2'>
                {timaago}
              </span>
            </div>
          </div>
        </div>
        <img
          src={
            avatarMe ||
            'https://img.freepik.com/vector-premium/icono-cuenta-icono-usuario-graficos-vectoriales_292645-552.jpg'
          }
          alt='My profile'
          className='w-6 h-6 rounded-full order-2'
        />
      </div>
    </div>
  ) : (
    <div className='chat-message'>
      <div className='flex items-end'>
        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block rounded-br-none ${
                info
                  ? 'bg-gradient-to-r from-slate-500 to-yellow-100'
                  : 'bg-gradient-to-b from-fuchsia-600 to-pink-600'
              } text-white font-normal text-sm`}
            >
              {info ? (
                <div className='flex flex-col justify-center gap-y-5'>
                  <Image
                    src={info.url_foto}
                    width={200}
                    height={200}
                    className='object-contain'
                  />
                  <Button
                    onClick={() => navigate(`/event/${info.id}`)}
                    color='danger'
                  >
                    ver publicacion
                  </Button>
                </div>
              ) : (
                mensaje
              )}
            </span>
          </div>
          <div>
            <span className=' text-xs text-gray-400 mr-2 mb-2'>{timaago}</span>
          </div>
        </div>
        <img
          src={
            avatarFriend ||
            'https://img.freepik.com/vector-premium/icono-cuenta-icono-usuario-graficos-vectoriales_292645-552.jpg'
          }
          alt='My profile'
          className='w-6 h-6 rounded-full order-1'
        />
      </div>
    </div>
  )
}
