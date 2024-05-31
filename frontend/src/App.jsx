
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import LoginPage from "./pages/user/Login";
import SignupPage from "./pages/user/Signup";
import ProfilePage from "./pages/user/Profile";
import HomePage from './pages/user/Home';
import store from './redux/store';
import Adminlogin from './components/admin/login/Adminlogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <>
        <Provider store={store}>
          <div>
            <div>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/adminlogin" element={<Adminlogin />} />
                  <Route path="/adminDashboard" element={<AdminDashboard />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </Provider>
    </>
  );
}

export default App;