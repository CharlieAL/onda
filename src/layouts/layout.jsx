import { Button } from '@nextui-org/react'
import {
  HeartIcon,
  HomeIcon,
  TicketIcon,
  UserPlusIcon
} from '../assets/icons/svg'
import { useHref, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '../hooks/useSocket'

function Layout({ children, isAuthenticated, user }) {
  const navigate = useNavigate()

  const containerRef = useRef(null)
  const [y, setY] = useState(0) // Estado para almacenar la posición de scroll
  const [scrollDirection, setScrollDirection] = useState('up')
  const path = useHref()
  const handleNavigation = useCallback(() => {
    const scrolledY = containerRef.current.scrollTop

    if (y > scrolledY) {
      if (scrollDirection !== 'up') {
        setScrollDirection('up')
      }
    } else if (y < scrolledY) {
      if (scrollDirection !== 'down') {
        setScrollDirection('down')
      }
    }

    setY(scrolledY)
  }, [y, scrollDirection])

  useEffect(() => {
    const container = containerRef.current
    setY(container.scrollTop) // Actualiza el estado con la posición inicial del scroll
    container.addEventListener('scroll', handleNavigation)

    return () => {
      container.removeEventListener('scroll', handleNavigation)
    }
  }, [handleNavigation])

  const { receiveMessage, receiveMessageNoSee } = useSocket(user?.user_id)
  useEffect(() => {
    if (path.includes('/chat/')) return receiveMessage()
    else return receiveMessageNoSee()
  }, [path])
  return (
    <div className='grid place-content-center'>
      <div className='h-screen w-screen relative overflow-hidden '>
        <main
          ref={containerRef}
          className={`overflow-y-auto h-screen   `}
        >
          {!path.includes('/chat/') && isAuthenticated && (
            <Navbar
              scroll={scrollDirection}
              user={user}
              isHome={path === '/'}
            />
          )}
          {children}
        </main>

        {!path.includes('/chat/') && isAuthenticated && (
          <div
            className={`before:bg-white/10 border-white/20 border-1  pt-2 pb-10 sticky before:rounded-xl border-[#292f46] bg-gradient-to-l from-gray-900  to-black   bottom-0 shadow-small z-50 backdrop-blur-lg space-x-4 bg-black/10 transition-all delay-200 duration-1000  ${
              scrollDirection === 'up' ? 'translate-y-0' : 'translate-y-full'
            } `}
          >
            <div className='flex justify-around items-center '>
              <Button
                className='text-tiny bg-gradient-to-tr from-azul to-purple-500 text-white shadow-lg'
                variant='solid'
                color='danger'
                radius='md'
                size='lg'
                isIconOnly
                onClick={() => {
                  navigate('/users')
                }}
              >
                <UserPlusIcon />
              </Button>
              <Button
                className='text-tiny bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
                variant='solid'
                color='danger'
                radius='md'
                size='lg'
                isIconOnly
                onClick={() => {
                  navigate('/')
                }}
              >
                <HomeIcon />
              </Button>
              <Button
                className='text-tiny bg-gradient-to-tr from-red-700 to-red-400 text-white shadow-lg'
                variant='solid'
                color='danger'
                radius='md'
                size='lg'
                isIconOnly
                onClick={() => {
                  navigate('/my-events-likes')
                }}
              >
                <HeartIcon />
              </Button>
              <Button
                className='text-tiny bg-gradient-to-tr from-green-500 to-blue-400 text-white shadow-lg'
                variant='solid'
                color='danger'
                radius='md'
                size='lg'
                isIconOnly
                onClick={() => {
                  navigate('/my-tickets')
                }}
              >
                <TicketIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Layout
