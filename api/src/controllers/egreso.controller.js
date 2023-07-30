const { Egresos } = require("../models/egresos");

const getEgresos = async (req, res) => {
  try {
    const getEgresos = await Egresos.findAll();
    res.json(getEgresos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createEgresos = async (req, res) => {
  try {
    const { egreso, monto } = req.body;
    const newEgreso = await Egresos.create({
      egreso,
      monto,
    });
    res.json(newEgreso);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEgresos, createEgresos };
