const { Router } = require("express");
const {
  getEgresos,
  createEgresos,
} = require("../controllers/egreso.controller.js");
const router = Router();

router.get("/egresos", getEgresos);
router.post("/egresos", createEgresos);

module.exports = router;
