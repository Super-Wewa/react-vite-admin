import { routes } from "./config/routes"
import DashboardPage from "./presentation/screens/auth/dashboard"
import LoginScreen from "./presentation/screens/guest/login-screen"
import { useAuthStore } from "./store/auth-store"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import UsersPage from "./presentation/screens/auth/users-page"
import ProvincesPage from "./presentation/screens/auth/provinces-page"
import TripsPage from "./presentation/screens/auth/trips-page"
import FeesPage from "./presentation/screens/auth/fees-page"

function App() {
  const { user, token } = useAuthStore()

  if (!user || !token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginScreen />} path={routes.index} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardPage />} path={routes.index} />
        <Route element={<UsersPage />} path={routes.users} />
        <Route element={<ProvincesPage />} path={routes.provinces} />
        <Route element={<TripsPage />} path={routes.trips} />
        <Route element={<FeesPage />} path={routes.fees} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
