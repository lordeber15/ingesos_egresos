const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Ingresos = sequelize.define("Ingresos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ingreso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = { Ingresos };
