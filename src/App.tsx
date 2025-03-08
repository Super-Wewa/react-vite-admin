import { routes } from "./config/routes"
import DashboardPage from "./presentation/screens/auth/dashboard"
import LoginScreen from "./presentation/screens/guest/login-screen"
import { useAuthStore } from "./store/auth-store"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  const { user, token } = useAuthStore()

  if (!user || !token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginScreen />} path={routes.index} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardPage />} path={routes.index} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
