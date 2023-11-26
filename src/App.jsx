import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import { useAuthSelector } from './hooks/useAuth'
import Home from './pages/home'
import SignUp from './pages/auth/signup'
import Layout from './layouts/layout'
import CreateEvent from './pages/CreateEvent'
import CreateCompany from './pages/CreteCompany'
import Profile from './pages/Profile'
import MyLikesEvents from './pages/MyLikesEvents'
import Users from './pages/users'
import Event from './pages/Event'
import MyTickets from './pages/MisBoletos'
import Chat from './pages/Chat'
import Friends from './pages/Friends'

function App() {
  const user = useAuthSelector((state) => state.auth)

  return (
    <Layout
      isAuthenticated={user.isAuthenticated}
      user={user.user}
    >
      <Routes>
        <Route
          path='/login'
          element={!user.isAuthenticated ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/signup'
          element={!user.isAuthenticated ? <SignUp /> : <Navigate to='/' />}
        />
        <Route
          path='/'
          element={user.isAuthenticated ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path='/create'
          element={
            user.isAuthenticated ? <CreateEvent /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/create-my-company'
          element={
            user.isAuthenticated ? <CreateCompany /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/profile/:id'
          element={
            user.isAuthenticated ? <Profile /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/my-events-likes'
          element={
            user.isAuthenticated ? <MyLikesEvents /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/users'
          element={user.isAuthenticated ? <Users /> : <Navigate to='/login' />}
        />
        <Route
          path='/event/:id'
          element={user.isAuthenticated ? <Event /> : <Navigate to='/login' />}
        />
        <Route
          path='/my-tickets'
          element={
            user.isAuthenticated ? <MyTickets /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/chat'
          element={
            user.isAuthenticated ? (
              <Friends user={user.user} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/chat/:id'
          element={
            user.isAuthenticated ? (
              <Chat user={user.user} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
