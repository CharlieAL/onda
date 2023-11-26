import { useDispatch, useSelector } from 'react-redux'
import { signUser, logout, update } from '../store/auth/slice'
import { sendLogout } from '../service/auth'

export const useAuthSelector = useSelector

export const useAuthActions = () => {
  const dispatch = useDispatch()

  const saveUser = (user) => {
    dispatch(signUser(user))
  }
  const logoutUser = () => {
    sendLogout()
      .then((res) => {
        console.log(res)
        dispatch(logout())
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const updateUser = (user) => {
    dispatch(update(user))
  }

  return { saveUser, logoutUser, updateUser }
}
