import React, { useEffect, useState } from 'react'
import { getPermissions } from '../service/auth'
import CardPermission from '../components/CardPermission'

export default function Permissions() {
  const [permisos, setPermisos] = useState([])
  useEffect(() => {
    getPermissions()
      .then((res) => {
        console.log(res)
        setPermisos(res)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div>
      <ul>
        {permisos.map((permiso) => (
          <CardPermission
            key={permiso.pid}
            {...permiso}
          />
        ))}
      </ul>
    </div>
  )
}
