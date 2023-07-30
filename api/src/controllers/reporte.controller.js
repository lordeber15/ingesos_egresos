const { Report } = require("../models/report");

const getReport = async (req, res) => {
  try {
    const getReport = await Report.findAll();
    res.json(getReport);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createReport = async (req, res) => {
  try {
    const { report } = req.body;
    const newReport = await Report.create({
      report,
    });
    res.json(newReport);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getReport, createReport };
