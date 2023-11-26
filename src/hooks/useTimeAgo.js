import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeago(date) {
  const timestamp = Date.parse(date)
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeago = getDateDiffs(timestamp)
      setTimeago(newTimeago)
    }, 5000)
    return () => clearTimeout(interval)
  }, [timestamp])

  const { value, unit } = timeago

  const rft = new Intl.RelativeTimeFormat('es', { style: 'long' })
  const rtfUnit = unit === 'day' ? 'days' : unit
  return rft.format(value, rtfUnit)
  // return timestamp
}
