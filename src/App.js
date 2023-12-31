import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import AdminPanelUsers from './components/AdminPanel/AdminPanelUsers';
import AdminPanelRequests from './components/AdminPanel/AdminPanelRequests';
import BusLineDetail from './components/BusLineSection/BusLineDetail';
import BusLineForm from './components/BusLineSection/BusLineForm';
import BusLineEdit from './components/BusLineSection/BusLineEdit';
import Buses from './pages/Buses';
import BusDetails from './components/BusesSection/BusDetails';
import BusForm from './components/BusesSection/BusForm';
import BusLines from './pages/BusLines';
import ConductorSchedule from './components/ConductorPanel';
import DriverSchedule from './components/DriverPanel';
import Footer from './components/Footer';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RequireAuth from './components/Auth/RequireAuth';
import Unauthorized from './components/Auth/Unauthorized';


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
          </Route>

          {/* COUNTERWORKER - ADMIN */}
          <Route element={<RequireAuth allowedRoles={[ROLES.CounterWorker,ROLES.Admin]} />}>
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


export default App;

