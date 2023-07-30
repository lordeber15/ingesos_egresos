const { Router } = require("express");
const {
  getIngresos,
  createIngresos,
} = require("../controllers/ingreso.controller.js");
const router = Router();

router.get("/ingresos", getIngresos);
router.post("/ingresos", createIngresos);

module.exports = router;
