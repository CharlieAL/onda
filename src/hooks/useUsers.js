import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  addFriend,
  aceptFriend
} from '../store/users/slice'
import { getUsers } from '../service/auth'

export const useUserSelector = useSelector

export const useUserActions = () => {
  const dispatch = useDispatch()

  const fetchUsers = () => {
    dispatch(fetchUsersStart())
    getUsers()
      .then((res) => {
        console.log(res)
        dispatch(fetchUsersSuccess(res))
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error))
      })
  }

  const fetchRequestFriend = (friendId) => {
    dispatch(addFriend(friendId))
  }

  const fetchAcceptFriend = (friendId) => {
    dispatch(aceptFriend(friendId))
  }

  return { fetchUsers, fetchRequestFriend, fetchAcceptFriend }
}
