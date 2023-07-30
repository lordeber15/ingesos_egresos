const { Router } = require("express");
const {
  getReport,
  createReport,
} = require("../controllers/reporte.controller");
const router = Router();

router.get("/reportes", getReport);
router.post("/reportes", createReport);

module.exports = router;
