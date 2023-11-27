// Componente donde necesitas obtener los usuarios
import { useEffect } from 'react'
import { useUserActions, useUserSelector } from '../hooks/useUsers'
import CardUser from '../components/CardUser'
import { Skeleton } from '@nextui-org/react'

const Users = () => {
  const { fetchUsers } = useUserActions()
  const users = useUserSelector((state) => state.user.data)
  const loading = useUserSelector((state) => state.user.loading)
  const error = useUserSelector((state) => state.user.error)

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return <p>Cargando usuarios...</p>
  }

  if (error) {
    return <p>Error al cargar usuarios: {error}</p>
  }

  return (
    <div>
      <ul>
        {users.map((user, i) => (
          <div key={i}>
            {loading ? (
              <div className=' w-full flex items-center gap-3'>
                <div>
                  <Skeleton className='flex rounded-full w-12 h-12' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <Skeleton className='h-3 w-3/5 rounded-lg' />
                  <Skeleton className='h-3 w-4/5 rounded-lg' />
                </div>
              </div>
            ) : (
              <CardUser {...user} />
            )}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Users
