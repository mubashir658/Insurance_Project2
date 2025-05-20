import React from "react";
   import { Routes, Route } from "react-router-dom";
   import Nav from "./components/Nav.jsx";
   import Homepage from "./components/Homepage.jsx";
   import Login from "./components/Login.jsx";
   import BasicQuestions from './components/BasicQuestions';
   import Results from './components/Results';
   import About from "./components/About.jsx";
   import HelpLine from "./components/HelpLine.jsx";
   import UserDashboard from "./components/UserDashboard.jsx";
   import AgentDashboard from "./components/AgentDashboard.jsx";
   import ProtectedRoute from "./components/ProtectedRoute.jsx";
   import HealthPoliciesPage from './components/HealthPoliciesPage';
   import FullDetailWrapper from "./components/FullDetailWrapper";
   import ThankYouPage from "./components/ThankYouPage";
  import HPolicy1 from './components/health-policies/HPolicy1';
   import HPolicy2 from './components/health-policies/HPolicy2';
     import HPolicy3 from './components/health-policies/HPolicy3';
   import HPolicy4 from './components/health-policies/HPolicy4';
   import HPolicy5 from './components/health-policies/HPolicy5';
   import HPolicy6 from './components/health-policies/HPolicy6';
   import HPolicy7 from './components/health-policies/HPolicy7';
   import HPolicy8 from './components/health-policies/HPolicy8';
   import HPolicy9 from './components/health-policies/HPolicy9';
   import HPolicy10 from './components/health-policies/HPolicy10';
   import HPolicy11 from './components/health-policies/HPolicy11';
   import HPolicy12 from './components/health-policies/HPolicy12';
   import Profile from './components/Profile';
   import GovernmentPolicies from './components/GovernmentPolicies';
   import Chatbot from './components/Chatbot';

   function App() {
     return (
       <>
         <Nav />
         <Routes>
           <Route path="/" element={<Homepage />} />
           <Route path="/login" element={<Login />} />
           <Route path="/about" element={<About />} />
           <Route path="/helpline" element={<HelpLine />} />
           <Route
             path="/basic-questions"
             element={<ProtectedRoute><BasicQuestions /></ProtectedRoute>}
           />
           <Route path="/results" element={<Results />} />
           <Route
             path="/user-dashboard"
             element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}
           />
           <Route
             path="/agent-dashboard"
             element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>}
           />
           <Route
             path="/profile"
             element={<ProtectedRoute><Profile /></ProtectedRoute>}
           />
           <Route path="/full-detail" element={<FullDetailWrapper />} />
           <Route path="/thankyou" element={<ThankYouPage />} />
           <Route path="/health-policies" element={<HealthPoliciesPage />} />
           <Route path="/hpolicy1" element={<HPolicy1 />} />
           <Route path="/hpolicy2" element={<HPolicy2 />} />
           <Route path="/hpolicy3" element={<HPolicy3 />} />
           <Route path="/hpolicy4" element={<HPolicy4 />} />
           <Route path="/hpolicy5" element={<HPolicy5 />} />
           <Route path="/hpolicy6" element={<HPolicy6 />} />
           <Route path="/hpolicy7" element={<HPolicy7 />} />
           <Route path="/hpolicy8" element={<HPolicy8 />} />
           <Route path="/hpolicy9" element={<HPolicy9 />} />
           <Route path="/hpolicy10" element={<HPolicy10 />} />
           <Route path="/hpolicy11" element={<HPolicy11 />} />
           <Route path="/hpolicy12" element={<HPolicy12 />} />
           <Route path="/government-policies" element={<GovernmentPolicies />} />
           <Route path="/government-policy/:id" element={<GovernmentPolicies />} />
           <Route path="*" element={<div>404 - Page Not Found</div>} />
         </Routes>
         <Chatbot />
       </>
     );
   }

   export default App;