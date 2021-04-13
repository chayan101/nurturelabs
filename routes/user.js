const express = require("express");
const {signup, login, listOfAdvisors, bookACall, bookings} = require("../controllers/user");
const { body} = require("express-validator");
const {isAuthorised} = require('../functions/functions');

const router = express.Router();

router.post("/register" ,
  body('password').isLength({ min: 2 }),
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  signup);

router.post("/login" ,
    body('password').isLength({ min: 2 }),
    body('email').isEmail(),
    login);

router.get('/:user_id/advisor',isAuthorised, listOfAdvisors);

router.post("/:user_id/advisor/:advisor_id" , isAuthorised, bookACall);

router.get("/:user_id/advisor/booking" , isAuthorised, bookings);
module.exports = router;
