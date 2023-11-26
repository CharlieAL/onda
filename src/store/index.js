import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/slice'
import postSlice from './post/slice'
import {
  acceptFriendRequest,
  sendFriendRequest,
  verifyToken
} from '../service/auth'
import { deleteLike, postLike } from '../service/events'
import { toast } from 'sonner'
import userSlice from './users/slice'
import chatsSlice from './chats/slice'

const isUserSignedIn = (store) => (next) => (action) => {
  next(action)

  const { auth } = store.getState()
  if (!auth.isAuthenticated) return
  verifyToken()
    .then((res) => {
      if (auth.isAuthenticated) return
      store.dispatch({ type: 'auth/signUser', payload: res.payload })
    })
    .catch((error) => {
      console.log(error)
      store.dispatch({ type: 'auth/logout' })
    })
}

const persistanceMiddleware = (store) => (next) => (action) => {
  next(action)
  const { post } = store.getState()
  localStorage.setItem('posts', JSON.stringify(post.data))
}

const syncLikesOnDatabase = (store) => (next) => (action) => {
  const { type } = action
  if (type == 'post/incrementLike' || type == 'post/reduceLike') {
    const { auth, post } = store.getState()
    const item = post.data.find((post) => post.event_id === action.payload)
    console.log(item)
    next(action)
    if (!auth.isAuthenticated) return
    const { payload } = action
    if (type === 'post/incrementLike') {
      postLike(payload)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al dar like')

          store.dispatch({
            type: 'post/rollbackLikes',
            payload: {
              id: payload,
              num_likes: item.num_likes,
              liked_by_user: item.liked_by_user
            }
          })
        })
    }
    if (type === 'post/reduceLike') {
      deleteLike(payload)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al quitar like')
          store.dispatch({
            type: 'post/rollbackLikes',
            payload: {
              id: payload,
              num_likes: item.num_likes,
              liked_by_user: item.liked_by_user
            }
          })
        })
    }
  } else {
    next(action)
  }
}

const syncFriendsOnDatabase = (store) => (next) => (action) => {
  const { type } = action
  if (
    type == 'user/addFriend' ||
    type == 'user/removeFriend' ||
    type == 'user/aceptFriend'
  ) {
    const { auth, user } = store.getState()
    const item = user.data.find((user) => user.user_id === action.payload)

    next(action)
    if (!auth.isAuthenticated) return
    const { payload } = action
    console.log(payload)
    if (type === 'user/addFriend') {
      sendFriendRequest(payload)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al dar like')

          store.dispatch({
            type: 'user/rollbackLikes',
            payload: {
              id: payload,
              num_likes: item.num_likes,
              liked_by_user: item.liked_by_user
            }
          })
        })
    }
    if (type === 'user/aceptFriend') {
      acceptFriendRequest(payload)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
          toast.error('Error al dar like')

          store.dispatch({
            type: 'user/rollbackStatus',
            payload: {
              id: payload,
              oldStatus: item.friend_status
            }
          })
        })
    }

    // if (type === 'user/removeFriend') {
    //   deleteLike(payload)
    //     .then((res) => {
    //       console.log(res)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       toast.error('Error al quitar like')
    //       store.dispatch({
    //         type: 'user/rollbackLikes',
    //         payload: {
    //           id: payload,
    //           num_likes: item.num_likes,
    //           liked_by_user: item.liked_by_user
    //         }
    //       })
    //     })
    // }
  } else {
    next(action)
  }
}

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    user: userSlice,
    chat: chatsSlice
  },
  middleware: [
    isUserSignedIn,
    persistanceMiddleware,
    syncLikesOnDatabase,
    syncFriendsOnDatabase
  ]
})
