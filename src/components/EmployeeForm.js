import { useState } from 'react';
import axios from 'axios';

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    imageUrl: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateMobile = (mobile) => {
    
    return /^\d{10}$/.test(mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!validateMobile(employee.mobile)) {
      setErrorMessage('Phone number must be exactly 10 digits long and contain only numbers.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/employees', employee);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setEmployee({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
        imageUrl: ''
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile No (10 digits)"
          value={employee.mobile}
          onChange={handleChange}
          required
          pattern="\d{10}"
          title="Phone number must be exactly 10 digits long and contain only numbers."
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
          required
        />
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              checked={employee.gender === 'Male'}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              checked={employee.gender === 'Female'}
            /> Female
          </label>
        </div>
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={employee.course}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={employee.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default EmployeeForm;
