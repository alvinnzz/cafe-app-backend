const Employee = require("../models/employee");
const Cafe = require("../models/cafe");

// GET /employees?cafe=<cafe>
exports.getEmployees = async (req, res) => {
  try {
    const cafeId = req.query.cafe;
    let query = {};
    if (cafeId) {
      query.cafe = cafeId;
    }

    const employees = await Employee.find(query).populate("cafe");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees", error });
  }
};

// POST /employee
exports.createEmployee = async (req, res) => {
  try {
    const { id, name, email_address, phone_number, gender, start_date, cafe } =
      req.body;
    const newEmployee = new Employee({
      id,
      name,
      email_address,
      phone_number,
      gender,
      start_date,
      cafe,
    });

    const savedEmployee = await newEmployee.save();

    if (cafe) {
      const cafeDoc = await Cafe.findById(cafe);
      cafeDoc.employees.push(savedEmployee._id);
      await cafeDoc.save();
    }

    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

// PUT /employee/:id
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// DELETE /employee/:id
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};
