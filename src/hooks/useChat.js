import { useDispatch, useSelector } from 'react-redux'
import { addChat, addMessage, addMessages } from '../store/chats/slice'

export const useChatSelector = useSelector

export const useChatActions = () => {
  const dispatch = useDispatch()

  const saveChat = (chat) => {
    dispatch(addChat(chat))
  }

  const saveMessage = (payload) => {
    dispatch(addMessage(payload))
  }

  const saveMessages = (payload) => {
    dispatch(addMessages(payload))
  }

  return { saveChat, saveMessage, saveMessages }
}
