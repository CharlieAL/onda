import { Button } from '@nextui-org/react'
import { ArrowRightIcon } from '../assets/icons/svg'

export default function ProfileButton({
  label,
  children,
  onClick = () => {},
  value
}) {
  return (
    <li
      className='w-full flex items-center gap-x-8'
      onClick={onClick}
    >
      <Button
        isIconOnly
        className={
          label !== 'Logout'
            ? `text-tiny bg-gradient-to-tr from-azul to-purple-500 text-white shadow-lg`
            : `text-tiny bg-gradient-to-tr from-red-500 to-red-400 text-white shadow-lg`
        }
      >
        {children}
      </Button>
      {/* label */}
      <div className=' text-gray-300 flex flex-col flex-grow basis-0'>
        <span className='font-semibold text-xl'>{label}</span>
        {label === 'Birth' ? (
          new Date(value).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        ) : (
          <span className='text-small'>{value}</span>
        )}
      </div>
      {/* value */}
      {/* arrow */}
      <ArrowRightIcon />
    </li>
  )
}
