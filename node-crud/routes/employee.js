var express = require('express');
var router = express.Router();
var Employee = require('../models/Employee');

//list all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('employees/index', { employees });
  } catch (err) {
    res.status(500).send(err);
  }
});

//show create form
router.get('/create', (req, res) => {
  res.render('employees/create');
});

//handle create form/save new employee)
router.post('/save', async (req, res) => {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      address: req.body.address,
      position: req.body.position,
      salary: req.body.salary
    });
    await newEmployee.save();
    res.redirect('/employees');
  } catch (err) {
    res.status(500).send(err);
  }
});

//show single employee
router.get('/show/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.render('employees/show', { employee });
  } catch (err) {
    res.status(500).send(err);
  }
});

//show edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.render('employees/edit', { employee });
  } catch (err) {
    res.status(500).send(err);
  }
});

//handle update form
router.post('/update/:id', async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      address: req.body.address,
      position: req.body.position,
      salary: req.body.salary
    });
    res.redirect('/employees');
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete employee
router.post('/delete/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/employees');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
