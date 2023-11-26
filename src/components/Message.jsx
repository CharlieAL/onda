import React from 'react'

export default function Message({ de, mensaje, myId }) {
  return de === myId ? (
    <div className='chat-message'>
      <div className='flex items-end justify-end'>
        <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
          <div>
            <span className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white font-semibold text-sm'>
              {mensaje}
            </span>
          </div>
        </div>
        <img
          src='https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
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
          src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
          alt='My profile'
          className='w-6 h-6 rounded-full order-1'
        />
      </div>
    </div>
  )
}
