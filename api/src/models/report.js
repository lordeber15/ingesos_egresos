const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const { Ingresos } = require("./ingresos");
const { Egresos } = require("./egresos");

const Report = sequelize.define("report", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  report: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Report.hasMany(Ingresos, {
  foreingKey: "ingresoId",
  sourKey: "id",
});
Report.hasMany(Egresos, {
  foreingKey: "egresosId",
  sourKey: "id",
});
Ingresos.belongsTo(Report, {
  foreingKey: "ingresoId",
  targetId: "id",
});
Egresos.belongsTo(Report, {
  foreingKey: "egresoId",
  targetId: "id",
});

module.exports = { Report };
