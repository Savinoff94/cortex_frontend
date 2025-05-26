import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./HOC/ProtectedRoute/ProtectedRoute";
import { Main } from "./pages/Main/Main";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import { TrafficDataContextProvider } from "./Context/TrafficDataContext/TrafficDataContext";
import { Registration } from "./pages/Registration/Registration";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ChartPage } from "./pages/ChartPage/ChartPage";
import './tailwind.css'
import './App.css'



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/main"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              } 
            >
              <Route index element={<TrafficDataContextProvider><Dashboard/></TrafficDataContextProvider>} />
              <Route path="/main/charts" element={<ChartPage/>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
