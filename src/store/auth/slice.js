import { createSlice } from '@reduxjs/toolkit'
// import { verifyToken } from '../../service/auth'

const initialState = (() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) return { user, isAuthenticated: true }
  else return { user: null, isAuthenticated: false }
})()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
    },
    update: (state, action) => {
      const updatedUser = { ...state.user, ...action.payload }
      state.user = updatedUser
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }
})

export default authSlice.reducer

export const { signUser, logout, update } = authSlice.actions
