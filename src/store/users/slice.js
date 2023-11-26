import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addFriend: (state, action) => {
      console.log('first')
      const friendId = action.payload
      const user = state.data.find((user) => user.user_id == friendId)
      if (user) {
        user.friend_status = 'pendiente'
      }
    },
    aceptFriend: (state, action) => {
      const friendId = action.payload
      const user = state.data.find((user) => user.user_id == friendId)
      if (user) {
        user.friend_status = 'amigos'
      }
    },
    removeFriend: (state, action) => {
      const friendId = action.payload
      const user = state.data.find((user) => user.user_id === friendId)
      user.friend_status = 0
    },
    cancelRequest: (state, action) => {
      const friendId = action.payload
      const user = state.data.find((user) => user.user_id === friendId)
      user.friend_status = 0
    },
    rollbackStatus: (state, action) => {
      const { payload } = action
      const user = state.data.find((user) => user.user_id === payload.id)
      user.friend_status = payload.oldStatus
    }
  }
})

export default userSlice.reducer

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addFriend,
  removeFriend,
  aceptFriend
} = userSlice.actions
