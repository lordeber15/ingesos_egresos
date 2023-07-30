const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Egresos = sequelize.define("egresos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  egreso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = { Egresos };
