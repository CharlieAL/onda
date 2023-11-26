import { useEffect, useState } from 'react'
import { getMyLikesEvents } from '../service/events'
import ListCards from '../components/ListCards'

function MyLikesEvents() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getMyLikesEvents()
      .then((res) => setPosts(res))
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className='pb-28'>
      <ListCards
        update={true}
        data={posts}
      />
    </div>
  )
}

export default MyLikesEvents
