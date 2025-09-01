import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidenav from './components/Sidenav';
import CompanyList from './pages/CompanyList';
import AddCompany from './pages/AddCompany';
import Home from './pages/Home';
import OrganizationList from './pages/OrgList';
import path from 'path';
import ViewCompany from './pages/ViewCompany';
import UpdateCompany from './pages/UpdateCompany';
import BankList from './pages/BankList';
import BankOTP from './components/BankOTP';
import AddBank from './pages/AddBank';
import ViewBank from './pages/ViewBank';
import UpdateBank from './pages/UpdateBank';
import McaList from './pages/McaList';
import AddMCA from './pages/AddMCA';
import ViewMCA from './pages/ViewMCA';
import UpdateMCA from './pages/UpdateMCA';
import IncomeTaxList from './pages/IncomeTaxList';
import AddIncomeTax from './pages/AddIncomeTax';
import ViewIncomeTax from './pages/ViewIncomeTax';
import UpdateIncomeTax from './pages/UpdateIncomeTax';
import TdsList from './pages/TdsList';
import AddTds from './pages/AddTds';
import ViewTDS from './pages/ViewTDS';
import UpdateTDS from './pages/UpdateTDS';
import GstList from './pages/GstList';
import AddGST from './pages/AddGST';
import ViewGst from './pages/ViewGst';
import UpdateGst from './pages/UpdateGst';
import EpfList from './pages/EpfList';
import AddEPF from './pages/AddEPF';
import ViewEpf from './pages/ViewEpf';
import UpdateEpf from './pages/UpdateEpf';
import EsiList from './pages/EsiList';
import AddESI from './pages/AddESI';
import ViewEsi from './pages/ViewEsi';
import UpdateEsi from './pages/UpdateEsi';
import PtList from './pages/PtList';
import AddPt from './pages/AddPt';
import ViewPt from './pages/ViewPt';
import UpdatePt from './pages/UpdatePt';
import DirectorList from './pages/DirectorList';
import AddDirector from './pages/AddDirector';
import ViewDirector from './pages/ViewDirector';
import UpdateDirector from './pages/UpdateDirector';
import KmpList from './pages/KmpList';
import AddKMP from './pages/AddKMP';
import ViewKmp from './pages/ViewKmp';
import UpdateKmp from './pages/UpdateKmp';
import bg from './assets/francesco-ungaro.jpg'

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const companyId=localStorage.getItem("companyid");
  const isLogged=localStorage.getItem("isLogged")|| "";
  
  // Hide Sidenav on non-authorized pages
  // const hideSidenav = ["/", "/register", "/forgot-password", "/companylist"].includes(location.pathname) && companyId;
  
  useEffect(() => {
    if (!sessionStorage.getItem('isRefreshed')) {
      sessionStorage.setItem('isRefreshed', 'true');
    } 

    const handleBeforeUnload = () => {
      if (!sessionStorage.getItem('isRefreshed')) {
        localStorage.clear();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // window.addEventListener('unload', () => {
    //   localStorage.clear();
    // });
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  
  
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#96e8ff', backgroundSize: 'cover', minHeight: '100vh' }}>
      {/* Conditionally render Sidebar */}
      {companyId && <Sidenav collapsed={collapsed} setCollapsed={setCollapsed} />}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1,transition: 'margin-left 0.3s' }}>
        <Header />
        
        <Box sx={{ p: 3 }}>
          <Routes>
          {isLogged?(
            <>
            <Route path="/companylist" element={<CompanyList />} />
            <Route path="/addcompany" element={<AddCompany />} />
            <Route path="/home" element={<Home />} />
            <Route path="/orglist" element={<OrganizationList />} />
            <Route path="/vieworg/:id" element={<ViewCompany />} />
            <Route path="/updateorg/:id" element={<UpdateCompany />} />
            <Route path="/banklist" element={<BankList />} />
            <Route path="/bankotp" element={<BankOTP />} />
            <Route path="/addbank" element={<AddBank />} />
            <Route path="/updatebank/:id" element={<UpdateBank />} />
            <Route path="/viewbank/:id" element={<ViewBank />} />
            <Route path="*" element={<Navigate to={"/home"}/>} />
            <Route path="/mcalist" element={<McaList />} />
            <Route path="/addmca" element={<AddMCA />} />
            <Route path="/viewmca/:id" element={<ViewMCA />} />
            <Route path="/updatemca/:id" element={<UpdateMCA />} />
            <Route path="/incometaxlist" element={<IncomeTaxList />} />
            <Route path="/addincometax" element={<AddIncomeTax />} />
            <Route path="/viewIncomeTax/:id" element={<ViewIncomeTax />} />
            <Route path="/updateIncomeTax/:id" element={<UpdateIncomeTax />} />
            <Route path="/tdslist" element={<TdsList />} />
            <Route path="/addtds" element={<AddTds />} />
            <Route path="/viewtds/:id" element={<ViewTDS />} />
            <Route path="/updatetds/:id" element={<UpdateTDS />} />
            <Route path="/gstlist" element={<GstList />} />
            <Route path="/addgst" element={<AddGST />} />
            <Route path="/viewgst/:id" element={<ViewGst />} />
            <Route path="/updategst/:id" element={<UpdateGst />} />
            <Route path="/epflist" element={<EpfList />} />
            <Route path="/addepf" element={<AddEPF/>} />
            <Route path="/viewepf/:id" element={<ViewEpf/>} />
            <Route path="/updateepf/:id" element={<UpdateEpf />} />
            <Route path="/esilist" element={<EsiList />} />
            <Route path="/addesi" element={<AddESI/>} />
            <Route path="/viewesi/:id" element={<ViewEsi/>} />
            <Route path="/updateesi/:id" element={<UpdateEsi />} />
            <Route path="/ptlist" element={<PtList />} />
            <Route path="/addpt" element={<AddPt/>} />
            <Route path="/viewpt/:id" element={<ViewPt/>} />
            <Route path="/updatept/:id" element={<UpdatePt />} />
            <Route path="/directorlist" element={<DirectorList />} />
            <Route path="/adddirector" element={<AddDirector />} />
            <Route path="/viewdirector/:id" element={<ViewDirector />} />
            <Route path="/updatedirector/:id" element={<UpdateDirector />} />
            <Route path="/kmplist" element={<KmpList />} />
            <Route path="/addkmp" element={<AddKMP />} />
            <Route path="/viewkmp/:id" element={<ViewKmp />} />
            <Route path="/updatekmp/:id" element={<UpdateKmp />} />
            </>
          ):(
            <>
            
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to={"/"}/>} />
            </>
          )}
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

const App: React.FC = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
