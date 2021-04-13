const con = require('../functions/dbConnection.js');
const {  validationResult } = require("express-validator");


exports.addAdvisor = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400);
  }

  var sql = "insert into advisor(name, photo) values('" + req.body.name + "','" + req.body.photo + "');" ;

  await con.query(sql, (err,result)=>{
    if(err){

      res.sendStatus(400);
    }else{
      res.sendStatus(200);
    }
  })

};
