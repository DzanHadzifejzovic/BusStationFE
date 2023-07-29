import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Buses from './pages/Buses';
import BusLines from './pages/BusLines';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './pages/Layout';
import RequireAuth from './components/Auth/RequireAuth';
import Unauthorized from './components/Auth/Unauthorized';
import BusDetails from './components/BusesSection/BusDetails';
import AdminPanelUsers from './components/AdminPanel/AdminPanelUsers';
import AdminPanelRequests from './components/AdminPanel/AdminPanelRequests';
import BusForm from './components/BusesSection/BusForm';
import DriverSchedule from './components/DriverPanel';
import ConductorSchedule from './components/ConductorPanel';
import BusLineDetail from './components/BusLineSection/BusLineDetail';
import BusLineForm from './components/BusLineSection/BusLineForm';
import BusLineEdit from './components/BusLineSection/BusLineEdit';

const ROLES = {
  'Admin': "Admin",
  'Buyer': "Buyer",
  'Conductor': "Conductor",
  'CounterWorker':"CounterWorker",
  'Driver':"Driver"
}

function App() {
  return (
  <>
    <Navbar  />

    <Routes>
      <Route path='/' element={<Layout />}>

         {/* public routes */}
          <Route path='/' element={<Home />}></Route>
          <Route exact path='/bus-lines' element={<BusLines />}></Route>
          <Route path='/bus-lines/bus-line/:busLineId' element={<BusLineDetail />}></Route>
          <Route path='/login-page' element={<LoginPage/>}></Route>
          <Route path='/register-page' element={<RegisterPage/>}></Route>
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* protected routes */}
          {/* ADMIN */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='/admin-panel/users' element={<AdminPanelUsers />}></Route>
            <Route path='/admin-panel/requests' element={<AdminPanelRequests />}></Route>
            <Route path='/buses/bus-form' element={<BusForm />}></Route>
            <Route path='/bus-lines/bus-line/edit/:busLineId' element={<BusLineEdit />}></Route>
            <Route path='/bus-lines/busLine-form' element={<BusLineForm />}></Route>
          </Route>

          {/* DRIVER */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Driver]} />}>
            <Route path='/driver-panel/drive-schedule' element={<DriverSchedule />}></Route>
          </Route>

          {/* CONDUCTOR */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Conductor]} />}>
            <Route path='/conductor-panel/conductor-schedule' element={<ConductorSchedule /> }></Route>
          </Route>

          {/* COUNTERWORKER */}
          <Route element={<RequireAuth allowedRoles={[ROLES.CounterWorker]} />}>
            <Route path='/bus-lines/bus-line/edit/:busLineId' element={<BusLineEdit />}></Route>
            <Route path='/bus-lines/busLine-form' element={<BusLineForm />}></Route>
          </Route>

          {/* ADMIN-CONDUCTOR-COUNTERWORKER-DRIVER */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Conductor, ROLES.CounterWorker, ROLES.Driver]} />}>
            <Route path='/buses' element={<Buses />}></Route>
            <Route path='/buses/:busId' element={<BusDetails />}></Route>
          </Route>


          {/* catch all */}
          <Route path='*' element></Route> {/* add missing component */}
      </Route>  
    </Routes>   
    
    <Footer  />
 
  </>
  );
}


  {/*
        <Navbar  />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/admin-panel' element={<AdminPanel />}></Route>
          <Route exact path='/bus-lines' element={<BusLines />}></Route>
          <Route path='/buses' element={<Buses />}></Route>
          
          <Route path='/login-page' element={<LoginPage/>}></Route>
          <Route path='/register-page' element={<RegisterPage/>}></Route>
        </Routes>

        <Footer  />
  */} 

export default App;

