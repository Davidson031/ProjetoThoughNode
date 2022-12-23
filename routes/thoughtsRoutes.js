const express = require("express");
const router = express.Router();
const ThoughtsController = require("../controllers/ThoughtsController");

const checkAuth = require("../helpers/auth").checkAuth; //função para servir de middleware

router.post("/add", checkAuth, ThoughtsController.createThoughtPost);
router.get("/add", checkAuth, ThoughtsController.createThought);
router.post("/remove", checkAuth, ThoughtsController.removeThought);
router.get("/dashboard", checkAuth, ThoughtsController.dashboard);
router.get("/edit/:id", checkAuth, ThoughtsController.editThought);
router.post("/edit", checkAuth, ThoughtsController.editThoughtPost);
router.get("/", ThoughtsController.showThoughts);



module.exports = router;