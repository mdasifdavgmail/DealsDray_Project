const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Employee = require('../models/Employee'); 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


router.post('/', upload.single('image'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newEmployee = new Employee({ name, email, mobile, designation, gender, course, image });
    await newEmployee.save();
    res.json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});

module.exports = router;
