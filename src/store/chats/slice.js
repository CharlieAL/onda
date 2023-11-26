import { createSlice } from '@reduxjs/toolkit'
// import { verifyToken } from '../../service/auth'

// const initialState = (() => {
//   const chats = localStorage.getItem('chats')
//   if (chats) return JSON.parse(chats)
//   return []
// })()

export const chatsSlice = createSlice({
  name: 'chat',
  initialState: {
    data: [
      {
        idFriend: '4',
        messages: [
          {
            de: '1',
            para: '4',
            mensaje: 'Hola'
          }
        ]
      }
    ]
  },
  reducers: {
    addChat: (state, action) => {
      // si existe no
      const { idFriend } = action.payload
      const chat = state.data.find((chat) => chat.idFriend === idFriend)
      if (chat) state.data.push(action.payload)
    },
    addMessage: (state, action) => {
      const { idFriend } = action.payload
      const chat = state.data.find((chat) => chat.idFriend === idFriend)
      if (chat) {
        chat.messages.push(action.payload.message)
        return
      } else state.data.push({ idFriend, messages: [action.payload.message] })
    }
  }
})

export default chatsSlice.reducer

export const { addChat, addMessage } = chatsSlice.actions
