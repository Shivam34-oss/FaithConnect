import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@core/store/authStore'
import Layout from '@widgets/Layout/Layout'
import Chatbot from '@widgets/Chatbot/Chatbot'
import HomeView from '@views/HomeView/HomeView'
import LoginView from '@views/AuthView/LoginView'
import RegisterView from '@views/AuthView/RegisterView'
import ProfileView from '@views/ProfileView/ProfileView'
import CommunityView from '@views/CommunityView/CommunityView'
import PostDetailView from '@views/PostDetailView/PostDetailView'
import CreatePost from '@views/CreatePost/CreatePost'
import PrayersView from '@views/PrayersView/PrayersView'
import ScripturesView from '@views/ScripturesView/ScripturesView'
import SettingsView from '@views/SettingsView/SettingsView'
import NotFoundView from '@views/NotFoundView/NotFoundView'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="community" element={<CommunityView />} />
          <Route path="prayers" element={<PrayersView />} />
          <Route path="scriptures" element={<ScripturesView />} />
          <Route path="settings" element={<SettingsView />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="posts/:id" element={<PostDetailView />} />
        </Route>
        
        <Route path="*" element={<NotFoundView />} />
      </Routes>
      
      {/* Chatbot - Available on all pages */}
      <Chatbot />
    </>
  )
}

export default App
