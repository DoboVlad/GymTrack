const express = require("express");
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const bodyCompositionController = require('../controllers/bodyCompositionController');

router.post("/", auth, bodyCompositionController.createBodyComposition);
router.get("/", auth, bodyCompositionController.getBodyCompositions);
router.delete("/:id", auth, bodyCompositionController.deleteBodyComposition);
router.put("/:id", auth, bodyCompositionController.updateBodyComposition);

module.exports = router;