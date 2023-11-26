import { useEffect } from 'react'
import ListCards from '../components/ListCards'
import { usePostSelector, usePostActions } from '../hooks/usePosts'

function Home() {
  const { getPost } = usePostActions()
  const posts = usePostSelector((state) => state.post.data)
  const loading = usePostSelector((state) => state.post.loading)
  const error = usePostSelector((state) => state.post.error)
  useEffect(() => {
    getPost()
  }, [])
  return (
    <div className='pb-28'>
      <ListCards
        data={posts}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default Home
