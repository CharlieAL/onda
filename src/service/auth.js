import { toast } from 'sonner'
import { config } from './config'

export const login = async (user_handle, password) => {
  const URL = `${config.url}${config.auth.login}`
  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_handle, password })
  })

  if (response.status === 400) {
    toast.error('Invalid credentials')
    throw new Error('credentials are invalid')
  }

  if (!response.ok) {
    throw new Error('Failed to login')
  }

  const data = await response.json()
  return data
}

export const signUp = async (userData) => {
  const URL = `${config.url}${config.auth.signup}`

  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    throw new Error('Failed to sign up')
  }

  const data = await response.json()
  return data
}

export const sendLogout = async () => {
  const URL = `${config.url}${config.auth.logout}`
  const response = await fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Failed to logout')
  }

  const data = await response.json()
  return data
}

export const verifyToken = async () => {
  try {
    const URL = `${config.url}${config.auth.verifyToken}`
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to verify token')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getUser = async (userId) => {
  try {
    const URL = `${config.url}${config.auth.getUser}${userId}`
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get user')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateUser = async (userId, userData) => {
  try {
    const URL = `${config.url}${config.auth.updateUser}${userId}`
    const response = await fetch(URL, {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      throw new Error('Failed to update user')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getUsers = async () => {
  try {
    const URL = `${config.url}${config.auth.getUsers}`
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get users')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendFriendRequest = async (friendId) => {
  try {
    const URL = `${config.url}${config.auth.sendFriendRequest}${friendId}`
    const response = await fetch(URL, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to send friend request')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const acceptFriendRequest = async (friendId) => {
  try {
    const URL = `${config.url}${config.auth.acceptFriendRequest}${friendId}`
    const response = await fetch(URL, {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to accept friend request')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getFriends = async () => {
  try {
    const URL = `${config.url}${config.auth.friends}`
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get friends')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getMessages = async (friendId) => {
  try {
    const URL = `${config.url}${config.auth.messages}${friendId}`
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get messages')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendPermission = async (id) => {
  try {
    const URL = `${config.url}${config.auth.sendPermission}${id}`
    const response = await fetch(URL, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get messages')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getPermissions = async () => {
  try {
    const URL = `${config.url}${config.auth.permissions}`
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed get permissions')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const givePermission = async (userId) => {
  try {
    const URL = `${config.url}${config.auth.givePermission}${userId}`
    const response = await fetch(URL, {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed give permission')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const removePermission = async (userId) => {
  try {
    const URL = `${config.url}${config.auth.removerPermission}${userId}`
    const response = await fetch(URL, {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed remove permission')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
