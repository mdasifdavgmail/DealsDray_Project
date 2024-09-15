import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Dashboard.css'; 

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      
      navigate('/');
    }
  }, [navigate]);

  const handleCreateEmployee = () => {
    navigate('/create-employee');
  };

  const handleEmployeeList = () => {
    navigate('/employee-list');
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div>
          <h1>Welcome, {user ? user.username : 'Guest'}</h1>
        </div>
        <div>
          <button onClick={handleCreateEmployee} className="create-button">Create Employee</button>
          <button onClick={handleEmployeeList} className="list-button">Employee List</button>
        </div>
      </header>

      <div className="dashboard-content">
        <h2 align="center">Welcome to Dashboard </h2>
       
      </div>
    </div>
  );
}

export default Dashboard;
