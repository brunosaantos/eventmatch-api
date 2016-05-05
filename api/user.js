var db = require('../models');

// GET: /api/users
exports.get = (req, res, next) => {
   db.users.findAll()
    .then((users) => {
      res.send(users);
      return next();
    })
    .catch((err) => res.send({}));
   
};

// GET: /api/user/:id
exports.getOne = (req, res, next) => {
   db.users.find({where: {id:req.params.id}})
    .then((todos) => {
      res.send(todos);
      return next();
    })
    .catch((err) => res.send({}));
   
};

// POST: /api/users
exports.post = (req, res, next) => {
  res.send({
    message: "Not implemented yet."
  })
  // var sql;
  // if(req.body.text != ""){
  //   sql = {text:req.body.text};
  // } 
  //  if (req.body.details != ""){
  //   sql = {text:req.body.text,details:req.body.details};
  // } 
  // db.users.create(sql).then(function(user){
  //   db.users.findAll().then(function(users){
  //     res.send(users);
  //     return next();
  //    });
  // });
  
  //  return next();
};

// D: /api/todos
exports.del = (req, res, next) => {
  res.send({
    message: "Not implemented yet."
  })
  // db.users.destroy({id:req.params.id}).then(function(affectedRows){
  //   console.log(affectedRows);
    
  //   db.users.findAll().then(function(users){
  //     res.send(users);
  //     return next();
  //    });
  // }); 
};


