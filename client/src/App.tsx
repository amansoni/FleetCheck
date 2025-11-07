import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { BlankPage } from "./pages/BlankPage"
import { Dashboard } from "./pages/Dashboard"
import { Drivers } from "./pages/Drivers"
import { DriverDetail } from "./pages/DriverDetail"
import { Vehicles } from "./pages/Vehicles"
import { VehicleDetail } from "./pages/VehicleDetail"
import { Inspections } from "./pages/Inspections"
import { Training } from "./pages/Training"
import { TrainingDetail } from "./pages/TrainingDetail"
import { Scorecards } from "./pages/Scorecards"
import { Reports } from "./pages/Reports"
import { Users } from "./pages/Users"

function App() {
  return (
  <AuthProvider>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="drivers/:id" element={<DriverDetail />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="vehicles/:id" element={<VehicleDetail />} />
            <Route path="inspections" element={<Inspections />} />
            <Route path="training" element={<Training />} />
            <Route path="training/:id" element={<TrainingDetail />} />
            <Route path="scorecards" element={<Scorecards />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="*" element={<BlankPage />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  </AuthProvider>
  )
}

export default App