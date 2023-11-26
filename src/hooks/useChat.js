import { useDispatch, useSelector } from 'react-redux'
import { addChat, addMessage } from '../store/chats/slice'

export const useChatSelector = useSelector

export const useChatActions = () => {
  const dispatch = useDispatch()

  const saveChat = (chat) => {
    dispatch(addChat(chat))
  }

  const saveMessage = (payload) => {
    dispatch(addMessage(payload))
  }

  return { saveChat, saveMessage }
}
