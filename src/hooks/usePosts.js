import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../service/events'
import {
  incrementLike,
  reduceLike,
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
  addNumComments as addNumCommentsAction,
  addNumAsist
} from '../store/post/slice'

export const usePostSelector = useSelector
export const usePostDispatch = useDispatch

export const usePostActions = () => {
  const dispatch = useDispatch()

  const getPost = async () => {
    dispatch(fetchPostsStart())
    getEvents()
      .then((res) => {
        dispatch(fetchPostsSuccess(res.data))
      })
      .catch((error) => {
        dispatch(fetchPostsFailure(error))
      })
  }

  const addLike = (event_id) => {
    dispatch(incrementLike(event_id))
  }

  const removeLike = (event_id) => {
    dispatch(reduceLike(event_id))
  }

  const addNumComments = (event_id) => {
    dispatch(addNumCommentsAction(event_id))
  }

  const addAsistById = (event_id) => {
    dispatch(addNumAsist(event_id))
  }
  return { getPost, addLike, removeLike, addNumComments, addAsistById }
}
