import useTimeago from '../hooks/useTimeAgo'

export default function Message({
  de,
  mensaje,
  myId,
  avatarFriend,
  avatarMe,
  created_at
}) {
  const timaago = useTimeago(created_at)

  return de === myId ? (
    <div className='chat-message'>
      <div className='flex items-end justify-end'>
        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
          <div className='flex flex-col items-end'>
            <div>
              <span className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white font-semibold text-sm'>
                {mensaje}
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
            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 font-semibold text-sm'>
              {mensaje}
            </span>
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
