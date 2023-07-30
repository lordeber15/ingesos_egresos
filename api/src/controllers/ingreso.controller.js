const { Ingresos } = require("../models/ingresos");

const getIngresos = async (req, res) => {
  try {
    const getIngresos = await Ingresos.findAll();
    res.json(getIngresos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createIngresos = async (req, res) => {
  try {
    const { ingreso, monto } = req.body;
    const newIngreso = await Ingresos.create({
      ingreso,
      monto,
    });
    res.json(newIngreso);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getIngresos, createIngresos };
