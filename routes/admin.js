const express = require("express");
const {addAdvisor} = require("../controllers/admin");
const { body} = require("express-validator");


const router = express.Router();

router.post("/advisor" ,
  body('photo').isLength({ min: 2 }),
  body('name').isLength({ min: 2 }),
  addAdvisor);


module.exports = router;
