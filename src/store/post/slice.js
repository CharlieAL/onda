import { createSlice } from '@reduxjs/toolkit'

const initialState = (() => {
  const posts = localStorage.getItem('posts')
  if (posts) return { data: JSON.parse(posts), loading: false, error: null }
  else return { data: [], loading: false, error: null }
})()

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPostSuccess: (state, action) => {
      state.data.push(action.payload)
    },
    fetchPostsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchPostsSuccess: (state, action) => {
      // quiero que si esta la misma data no la guarde
      if (state.data.length === action.payload.length) {
        state.loading = false
        return
      }
      state.loading = false
      state.data = action.payload
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    incrementLike: (state, action) => {
      const { payload } = action
      const post = state.data.find((post) => post.event_id === payload)
      if (post) {
        post.num_likes += 1
        post.liked_by_user = 1
      }
    },
    reduceLike: (state, action) => {
      const { payload } = action
      const post = state.data.find((post) => post.event_id === payload)
      if (post) {
        if (post.num_likes > 0) {
          post.num_likes -= 1
          post.liked_by_user = 0
        }
      }
    },
    rollbackLikes: (state, action) => {
      console.log('rollback')
      const { payload } = action
      console.log(payload)
      const post = state.data.find((post) => post.event_id === payload.id)
      if (post) {
        post.num_likes = payload.num_likes
        post.liked_by_user = payload.liked_by_user
      }
    },
    addNumComments: (state, action) => {
      const { payload } = action
      const post = state.data.find((post) => post.event_id === payload)
      if (post) {
        post.num_comments += 1
      }
    },
    addNumAsist: (state, action) => {
      const { payload } = action
      const post = state.data.find((post) => post.event_id === payload)
      if (post) {
        post.num_people_asist += 1
      }
    }
  }
})

export default postSlice.reducer

export const {
  addPostSuccess,
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
  incrementLike,
  reduceLike,
  rollbackLikes,
  addNumComments,
  addNumAsist
} = postSlice.actions
