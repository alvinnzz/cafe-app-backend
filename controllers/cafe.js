const Cafe = require("../models/cafe");

// GET /cafes?location=<location>
exports.getCafes = async (req, res) => {
  try {
    const location = req.query.location;
    let query = {};
    if (location) {
      query.location = location;
    }

    const cafes = await Cafe.find(query).populate("employees");
    res.status(200).json(cafes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cafes", error });
  }
};

// POST /cafe
exports.createCafe = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const newCafe = new Cafe({ name, description, location });
    await newCafe.save();
    res.status(201).json(newCafe);
  } catch (error) {
    res.status(500).json({ message: "Error creating cafe", error });
  }
};

// PUT /cafe/:id
exports.updateCafe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location } = req.body;
    const updatedCafe = await Cafe.findByIdAndUpdate(
      id,
      { name, description, location },
      { new: true }
    );
    res.status(200).json(updatedCafe);
  } catch (error) {
    res.status(500).json({ message: "Error updating cafe", error });
  }
};

// DELETE /cafe/:id
exports.deleteCafe = async (req, res) => {
  try {
    const { id } = req.params;
    await Cafe.findByIdAndDelete(id);
    res.status(200).json({ message: "Cafe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cafe", error });
  }
};
