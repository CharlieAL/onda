import { useCallback, useEffect, useRef, useState } from 'react'

import { io } from 'socket.io-client'
import { toast } from 'sonner'
import { useChatActions } from './useChat'
import { config } from '../service/config'

export const useSocket = (uid) => {
  const socket = useRef(null)
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const { saveMessage } = useChatActions()

  const connect = useCallback(() => {
    socket.current = io(config.url, {
      query: {
        uid
      }
    })
    socket.current.on('connect', () => {
      setIsConnected(true)
    })
    socket.current.on('disconnect', () => {
      setIsConnected(false)
    })
    socket.current.on('message', (message) => {
      setMessages((messages) => [...messages, message])
    })
    socket.current.on('users', (users) => {
      setUsers(users)
    })
    socket.current.on('user', (user) => {
      setUser(user)
    })
    socket.current.on('typing', (isTyping) => {
      setIsTyping(isTyping)
    })
  }, [uid])

  const disconnect = useCallback(() => {
    if (socket.current) {
      socket.current.disconnect()
      socket.current = null
    }
  }, [])

  const sendMessage = useCallback((payload) => {
    if (socket.current) {
      socket.current.emit('mensaje-personal', payload)
    }
  }, [])

  const receiveMessage = useCallback(() => {
    if (socket.current) {
      socket.current.on('mensaje-personal', (mensaje) => {
        console.log(mensaje)
        saveMessage({
          idFriend: mensaje.de,
          message: {
            de: mensaje.de,
            para: mensaje.para,
            mensaje: mensaje.mensaje,
            created_at: mensaje.created_at
          }
        })
        // Maneja el mensaje recibido como desees en tu frontend
      })
    }
  }, [])

  const receiveMessageNoSee = useCallback(() => {
    if (socket.current) {
      socket.current.on('mensaje-personal', (mensaje) => {
        console.log(mensaje)

        toast.info(`${mensaje.deName}`, {
          description: `mensaje: ${mensaje.mensaje}`
        })

        saveMessage({
          idFriend: mensaje.de,
          message: {
            de: mensaje.de,
            para: mensaje.para,
            mensaje: mensaje.mensaje,
            created_at: mensaje.created_at
          }
        })
        // Maneja el mensaje recibido como desees en tu frontend
      })
    }
  }, [])

  const sendTyping = useCallback((isTyping) => {
    if (socket.current) {
      socket.current.emit('typing', isTyping)
    }
  }, [])

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [connect, disconnect])

  return {
    isConnected,
    isTyping,
    messages,
    users,
    user,
    sendMessage,
    sendTyping,
    receiveMessage,
    receiveMessageNoSee
  }
}
