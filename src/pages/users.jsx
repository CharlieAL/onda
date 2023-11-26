// Componente donde necesitas obtener los usuarios
import { useEffect } from 'react'
import { useUserActions, useUserSelector } from '../hooks/useUsers'
import CardUser from '../components/CardUser'

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
          <CardUser
            key={i}
            {...user}
          />
        ))}
      </ul>
    </div>
  )
}

export default Users
