import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';          
import Register from './components/Register';    
import Dashboard from './components/Dashboard';  
import EmployeeForm from './components/EmployeeForm';  
import EmployeeList from './components/EmployeeList';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-employee" element={<EmployeeForm />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App;
