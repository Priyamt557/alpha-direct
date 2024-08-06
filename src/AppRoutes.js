import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import { checkAuth } from './components/utilities/helpers';
import OnBoarding from './components/OnBoarding';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {
  AddPolicy,
  AdditionalInfo,
  Promotions,
  AgentDirectory,
  Compliances,
  MyBonuses,
  Notifications,
  Dashboard,
  Profile,
} from "./components/Users";
import {
  AdminAdditinalInfo,
  AdminAgentCompliances,
  AdminAgentsList,
  AdminBonuses,
  AdminDashboard,
  AdminNotification,
  AdminProfile,
  AdminSettings
} from './components/Admin'



const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(checkAuth())
  const [type, setType] = useState(checkAuth() ? JSON.parse(localStorage["userAuthDetails"])?.type : '')
  const [isVisited, setIsVisited] = useState(JSON.parse(localStorage.getItem("isVisited")) === true ? true : false)


  const setVisit = () => {
    setIsVisited(true);
    localStorage.setItem('isVisited', true)
  }


  const LogoutUser = () => {
    localStorage.removeItem("userAuthDetails");
    setisLoggedIn(false)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn && <Layout type={type} LogoutUser={LogoutUser} />}>

          {
            isLoggedIn && type === 'agent' && <>
              <Route path="*" element={<Navigate replace to="/dashboard" />} />
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard LogoutUser={LogoutUser} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-policy" element={<AddPolicy />} />
              <Route path="/additional-info" element={<AdditionalInfo />} />
              <Route path="/additional-info/promotions" element={<Promotions />} />
              <Route path="/additional-info/rules-and-norms" element={<AdditionalInfo />} />
              <Route path="/additional-info/insurance-policies" element={<AdditionalInfo />} />
              <Route path="/agent-directory" element={<AgentDirectory />} />
              <Route path="/compliances" element={<Compliances />} />
              <Route path="/my-bonuses" element={<MyBonuses />} />
              <Route path="/notifications" element={<Notifications />} />
            </>
          }
          {
            isLoggedIn && type === 'admin' && <>
              <Route path="*" element={<Navigate replace to="/dashboard" />} />
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<AdminDashboard LogoutUser={LogoutUser} />} />
              <Route path="/profile" element={<AdminProfile />} />
              <Route path="/bonuses" element={<AdminBonuses />} />
              <Route path="/agents-compliances" element={<AdminAgentCompliances />} />
              <Route path="/agents-list" element={<AdminAgentsList />} />
              <Route path="/additional-info" element={<AdminAdditinalInfo />} />
              <Route path="/additional-info/promotions" element={<AdminAdditinalInfo />} />
              <Route path="/additional-info/rules-and-norms" element={<AdminAdditinalInfo />} />
              <Route path="/additional-info/insurance-policies" element={<AdminAdditinalInfo />} />
              <Route path="/notifications" element={<AdminNotification />} />
              <Route path="/settings" element={<AdminSettings />} />
            </>
          }
          {
            !isLoggedIn && <>
              <Route
                exact path="*"
                element={isVisited ? <Navigate replace to="/login" /> : <Navigate replace to="/onboarding" />}
              />
              <Route
                path="/"
                element={isVisited ? <Navigate replace to="/login" /> : <Navigate replace to="/onboarding" />}
              />
              <Route
                exact path="/login"
                element={isVisited ? <Login setType={setType} setisLoggedIn={setisLoggedIn} /> : <Navigate replace to="/onboarding" />}
              />
              <Route
                exact path="/onboarding" element={isVisited ? <Navigate replace to="/login" /> : <OnBoarding setVisit={setVisit} setisLoggedIn={setisLoggedIn} />}
              />
            </>
          }
        </Route>
      </Routes>
    </Router >
  );
};

export default App;
