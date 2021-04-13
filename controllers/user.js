const con = require('../functions/dbConnection.js');
const {  validationResult } = require("express-validator");
const {hashPassword} = require("../functions/functions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400);
  }

  req.body.password = await hashPassword(req.body.password);

  var sql = "insert into user(name, email, password) values('" + req.body.name + "','" + req.body.email + "','" + req.body.password + "');" ;

  await con.query(sql, (err,result)=>{
    if(err){
      res.sendStatus(400);
    }else{
      var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
      //console.log(result.insertId);
      res.status(200).json({
        token: token,
        user_id : result.insertId
      });
    }
  })

};

exports.login = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400);
  }

  var sql = "select * from user where email = '" + req.body.email + "'";
  try{
  await con.query(sql, async (err,result)=>{
    if(err) throw err;
    else if(result == null){
      //invalid email
      res.sendStatus(401);
    }
    else{
      //email matched
      try{

      const match = await bcrypt.compare(req.body.password, result[0].password);
      if(match){
        //password matched
        var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
        res.status(200).json({
          token: token,
          user_id : result[0].user_id
        });
      }else{
        res.sendStatus(401);
      }
    }catch{
      console.log("1");
      res.sendStatus(500);
    }


    }
  })
}catch{
  console.log("2");
  res.sendStatus(500);
}

};

exports.listOfAdvisors = async (req, res)=>{
  var sql = "select * from advisor";
  try{
    await con.query(sql, (err,result)=>{
      if(err) throw err;

      console.log(result);
      res.status(200).send(result);
    });
  }catch{
    res.sendStatus(500);
  }
};


exports.bookACall = async (req, res)=>{
  var sql = "insert into bookings(user_id, advisor_id, booking_time) values("+ req.params.user_id +","
    + req.params.advisor_id + ",'" + req.body.bookingtime +"');" ;

  try{
    await con.query(sql, (err,result)=>{
      if(err) throw err;
      res.sendStatus(200);
    });
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
};

exports.bookings = async(req,res)=>{
      var sql = "select advisor_id, name, photo, booking_id, booking_time from bookings natural join advisor where user_id =  "
          + req.params.user_id + ";" ;

      try{
        await con.query(sql, (err,result)=>{
          if(err) throw err;
          res.status(200).send(result);
        });
      }catch(error){
        console.log(error);
        res.sendStatus(500);
      }

};
