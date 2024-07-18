import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogg } from './pages/Blog'
import { Posts } from './pages/Posts'
import { Create } from './pages/Create'
import { UserProfile } from './pages/UserProfile'
import { PageNotFound } from './pages/NotFound'
import { ProtectedRoute } from './components/Protected'
import Hero from './pages/Hero'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute element={<Blogg />} />
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute element={<Posts />} />
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute element={<Create />} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<UserProfile />} />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}