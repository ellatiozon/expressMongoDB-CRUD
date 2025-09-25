const express = require('express');
const router = express.Router();

// Require the Employee controller
const employeeController = require("../controllers/EmployeeController.js");

// Define routes for CRUD operations

//get all employees
router.get('/', employeeController.list);

//get single employee by id
router.get('/show/:id', employeeController.show);

//create employee
router.get('/create', employeeController.create);

//save employee
router.post('/save', employeeController.save);

//edit employee
router.get('/edit/:id', employeeController.edit);

//update employee
router.post('/update/:id', employeeController.update);

//delete employee
router.post('/delete/:id', employeeController.delete);

//export router as a module
module.exports = router;

const Employee = require('../models/Employee');

const employeeController = {};

employeeController.list = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render("../views/employees/index", { employees: employees });
    } catch (err) {
        console.error("Error:",err);
        res.status(500).send("Internal Server Error");
    }
};

employeeController.show = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send("Employee not found");
        }
        res.render("../views/employees/show", { employee});
    } catch (err) {
        console.error("Error:",err);
        res.status(500).send("Internal Server Error");
    }
};

employeeController.create = (req, res) => {
    res.render("../views/employees/create");
};

employeeController.save = async (req, res) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            address: req.body.address,
            position: req.body.position,
            salary: req.body.salary,
            updated_at: Date.now()
        });
        await newEmployee.save();
        console.log("Succesfully created an employee.");
        res.redirect("/employees/show/" + employee._id);
    }catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const validationErrors = Object.values(err.errors).map(e => e.message);
            return res.status(400).render("../views/employees/create", { errors: validationErrors});
        }
        res.status(500).send("Internal Server Error");
    }
};

employeeController.edit = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send("Employee not found");
        }
        res.render("../views/employees/edit", { employee });
    } catch (err) {
        console.error("Error:",err);
        res.status(500).send("Internal Server Error");
    }
};

employee.employeeController.update = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect("/employees/show/" + employee._id);
    } catch (err) {
        console.error(err);
        res.status(400).render("../views/employee/edit", { employee: req.body, error: "Failed to update employee: " + err.message });
    }
};

employeeController.delete = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).send("Employee not found");
        }
        console.log("Employee deleted!");
        res.redirect("/employees");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = employeeController;
