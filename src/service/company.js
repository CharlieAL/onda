import { config } from './config'

export const createCompany = async (body) => {
  const URL = `${config.url}${config.company.create}`
  try {
    const response = await fetch(URL, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
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
