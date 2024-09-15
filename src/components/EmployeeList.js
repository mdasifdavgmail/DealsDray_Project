import { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeList.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editEmployee, setEditEmployee] = useState(null); 
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = () => {
    const filtered = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee._id); 
    setEditForm(employee); 
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      fetchEmployees(); 
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/employees/${editEmployee}`, editForm);
      setEditEmployee(null); 
      fetchEmployees(); 
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td><img src={employee.imageUrl} alt="Employee" style={{ width: '100px' }} /></td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {editEmployee && (
        <div className="edit-form">
          <h3>Edit Employee</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editForm.name}
              onChange={handleEditFormChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={editForm.email}
              onChange={handleEditFormChange}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile No"
              value={editForm.mobile}
              onChange={handleEditFormChange}
              required
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={editForm.designation}
              onChange={handleEditFormChange}
              required
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={editForm.course}
              onChange={handleEditFormChange}
              required
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={editForm.imageUrl}
              onChange={handleEditFormChange}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
