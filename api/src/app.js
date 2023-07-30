const express = require("express");
const ingresosRoutes = require("./routes/ingresos.routes");
const egresosRoutes = require("./routes/egresos.routes");
const reportRoutes = require("./routes/reporte.routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(ingresosRoutes);
app.use(egresosRoutes);
app.use(reportRoutes);

module.exports = app;
