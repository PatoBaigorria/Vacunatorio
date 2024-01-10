const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/", controllers.depositoNacionalController.listarDepositosNacionales);
router.get("/alta", controllers.depositoNacionalController.formDepNac);
router.post("/", controllers.depositoNacionalController.createDepNac);
router.get("/:id", controllers.depositoNacionalController.editDepNac);
router.put("/:id", controllers.depositoNacionalController.updateDepositoNacional);
router.delete("/:id", controllers.depositoNacionalController.deleteDepositoNacional);
router.put("/:id/baja", controllers.depositoNacionalController.bajaDepositoNacional);
router.put("/:id/alta", controllers.depositoNacionalController.altaDepositoNacional);

module.exports = router;