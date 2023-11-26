import { Avatar } from '@nextui-org/react'
import { BackIcon, ChatIcon } from '../assets/icons/svg'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ scroll, user, isHome }) => {
  const navigate = useNavigate()
  const handleProfileClick = () => {
    navigate(`/profile/${user.user_id}`)
  }
  const backHistory = () => {
    navigate(-1)
  }
  return (
    <div
      className={`before:bg-white  border-1 left-0  py-2 sticky before:rounded-xl   top-0 shadow-small z-50  border-[#292f46] bg-gradient-to-l from-gray-900  to-black text-[#a8b0d3]  transition-all delay-200 duration-1000   ${
        scroll === 'up' ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='flex justify-between items-end h-16  text-center px-5'>
        {isHome ? (
          <div className=' w-full flex justify-between items-center'>
            <button
              className=''
              onClick={() => navigate('/chat')}
            >
              <ChatIcon />
            </button>

            <h1 className='font-bold text-xl'>Nogales</h1>
            <button onClick={handleProfileClick}>
              {user.avatar_url ? (
                <Avatar
                  src={user.avatar_url}
                  color='danger'
                  size='sm'
                  isBordered
                />
              ) : (
                <Avatar
                  size='sm'
                  color='danger'
                  isBordered
                  isFocusable
                  name={user.user_handle}
                />
              )}
            </button>
          </div>
        ) : (
          <div className=' w-full flex justify-between items-center'>
            <div className='w-1/3 flex items-center'>
              <button onClick={backHistory}>
                <BackIcon />
              </button>
            </div>
            <h1 className='font-bold text-xl'>Nogales</h1>
            <div className='w-1/3'></div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Navbar
