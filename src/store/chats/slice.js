import { createSlice } from '@reduxjs/toolkit'
// import { verifyToken } from '../../service/auth'

const initialState = (() => {
  const chats = localStorage.getItem('chats')
  if (chats)
    return {
      data: JSON.parse(chats)
    }
  return {
    data: []
  }
})()

export const chatsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action) => {
      // si existe no
      const { idFriend } = action.payload
      const chat = state.data.find((chat) => chat.idFriend === idFriend)
      if (chat) {
        state.data.push(action.payload)
      }
    },
    addMessage: (state, action) => {
      const { idFriend } = action.payload
      const chat = state.data.find((chat) => chat.idFriend === idFriend)
      if (chat) {
        chat.messages.push(action.payload.message)
        localStorage.setItem('chats', JSON.stringify(state.data))
        return
      } else state.data.push({ idFriend, messages: [action.payload.message] })
    },
    addMessages: (state, action) => {
      const { idFriend } = action.payload
      const chat = state.data.find((chat) => chat.idFriend === idFriend)
      if (chat) {
        chat.messages = action.payload.messages
        localStorage.setItem('chats', JSON.stringify(state.data))
        return
      } else state.data.push({ idFriend, messages: action.payload.messages })
    }
  }
})

export default chatsSlice.reducer

export const { addChat, addMessage, addMessages, getLastMessage } =
  chatsSlice.actions
