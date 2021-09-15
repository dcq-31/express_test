const UserModel = require('./../models/user');

exports.user_list = (req, res, next) => {
  UserModel.find({}, "name cars", (err, users) => {
    if (err) res.send(err);
    else res.json(users);
  });
}

exports.user_create = (req, res, next) => {
  res.send("New user created");
}

exports.user_read = (req, res, next) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) res.send(err);
    else res.json(user);
  })
}

exports.user_update = (req, res, next) => {
  res.send(`Update user with id: ${req.params.id}`);
}

exports.user_delete = (req, res, next) => {
  res.send(`Delete user with id: ${req.params.id}`);
}