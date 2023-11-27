import { config } from './config'

export const getEvents = async () => {
  const token = localStorage.getItem('token')
  console.log(token)
  const URL = `${config.url}${config.events.get}`
  try {
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get events')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const postEvent = async (body) => {
  const token = localStorage.getItem('token')
  const URL = `${config.url}${config.events.create}`
  try {
    const response = await fetch(URL, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      throw new Error('Failed to post events')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const postLike = async (eventId) => {
  const token = localStorage.getItem('token')
  const URL = `${config.url}${config.events.like}${eventId}`
  try {
    const response = await fetch(URL, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to post like')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to post like')
  }
}

export const deleteLike = async (eventId) => {
  const token = localStorage.getItem('token')
  const URL = `${config.url}${config.events.like}${eventId}`
  try {
    const response = await fetch(URL, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to post like')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to post like')
  }
}

export const getComments = async (eventId) => {
  const token = localStorage.getItem('token')
  const URL = `${config.url}${config.events.comment}${eventId}`
  try {
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get comments')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to get comments')
  }
}

export const createComment = async (eventId, comment) => {
  const token = localStorage.getItem('token')
  const URL = `${config.url}${config.events.comment}${eventId}`
  try {
    const response = await fetch(URL, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({ comment })
    })

    if (!response.ok) {
      throw new Error('Failed to post comment')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to post comment')
  }
}

export const getMyLikesEvents = async () => {
  const token = localStorage.getItem('token')
  const URL = `${config.url}${config.events.myLikes}`
  try {
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get my likes events')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to get my likes events')
  }
}

export const getEvent = async (eventId) => {
  const token = localStorage.getItem('token')
  const number = Number(eventId)
  const URL = `${config.url}${config.events.getOne}${number}`
  try {
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get event')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to get event')
  }
}

export const asistirEvento = async (eventId, boletos) => {
  const token = localStorage.getItem('token')
  const URL = `${config.url}${config.events.asistirEvento}`
  try {
    const response = await fetch(URL, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify({ eventId, boletos })
    })

    if (!response.ok) {
      throw new Error('Failed to post asistir evento')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to post asistir evento')
  }
}

export const getMyTickets = async () => {
  const token = localStorage.getItem('token')
  const URL = `${config.url}${config.events.getMyTickets}`
  try {
    const response = await fetch(URL, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to get my tickets')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to get my tickets')
  }
}
