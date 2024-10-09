import './App.css'
import Header from "./components/Header.tsx";
import ChatScreen from "./components/ChatScreen.tsx";
import {authStore} from "./store/auth.js";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Login from "./components/Login.tsx";
import SingUp from "./components/SingUp.tsx";

//
/*import Deneme from "./comp/Deneme.tsx";*/

function App() {
    const user = authStore((state) => state.user)


  return (
      <div>
          <BrowserRouter>
              <div>
                  <Routes>
                      <Route
                        path="/"
                        element={user ?
                            <div>
                                <Header/>
                                <ChatScreen/>
                            </div>
                            : <Navigate to="/login"/>}
                      />
                      <Route
                          path="/login"
                          element={!user ? <Login/> : <Navigate to="/"/>}
                      />
                      <Route
                          path="/signup"
                          element={!user ? <SingUp/> : <Navigate to="/"/>}
                      />
                  </Routes>
              </div>
          </BrowserRouter>
      </div>

  )
}

export default App
