const express = require("express");
const router = express.Router();
const depositoNacionalController = require("../controllers/depositonacionalController");
const authorize = require("../middleware/authorize");

router.get("/localidades/:provinciaNombre", authorize(["Super Admin"]), depositoNacionalController.getLocalidadesByProvinciaFromAPI);

router.get(
	"/",
	authorize(["Super Admin"]),
	depositoNacionalController.listarDepositosNacionales
);
router.get("/depnacJSON", authorize(["Operador de logistica"]), depositoNacionalController.listarDepositosNacionalesJSON);
router.get(
	"/alta",
	authorize(["Super Admin"]),
	depositoNacionalController.formDepNac
);
router.post(
	"/",
	authorize(["Super Admin"]),
	depositoNacionalController.createDepNac
);
router.get(
	"/:id",
	authorize(["Super Admin"]),
	depositoNacionalController.editDepNac
);
router.put(
	"/:id",
	authorize(["Super Admin"]),
	depositoNacionalController.updateDepositoNacional
);
router.delete(
	"/:id",
	authorize(["Super Admin"]),
	depositoNacionalController.deleteDepositoNacional
);
router.put(
	"/:id/baja",
	authorize(["Super Admin"]),
	depositoNacionalController.bajaDepositoNacional
);
router.put(
	"/:id/alta",
	authorize(["Super Admin"]),
	depositoNacionalController.altaDepositoNacional
);

module.exports = router;
