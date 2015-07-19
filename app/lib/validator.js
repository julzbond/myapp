module.exports = {
  nameIsRequired: _nameIsRequired,
  nameIsString: _nameIsString,
  nameMinLength: _nameMinLength,
  nameMaxLength: _nameMaxLength,
  noSpaces: _noSpaces,
  messageIsRequired: _messageIsRequired,
  messageIsString: _messageIsString,
  messageMinLength: _messageMinLength,
  checkSpaces: _checkSpaces
};

var express = require('express');
var app = express();

function _nameIsRequired (req, res, next) {
  if(!req.body.name){
    return next("There is no name.");
  }
  next();
}

function _nameIsString (req, res, next){
  if (typeof req.body.name !== 'string'){
    return next("Name is not a string.");
  }
  next();
}

function _nameMinLength (req, res, next){
  if (req.body.name.length < 3) {
    return next("Name must be at least 3 characters long.");
  }
  next();
}

function _nameMaxLength (req, res, next){
  if (req.body.name.length > 12) {
    return next("Name must be less than 12 characters long.");
  }
  next();
}

function _noSpaces (req, res, next){
  if (req.body.name.indexOf(' ') > -1) {
    return next("Name cannot contain any spaces.");
  }
  next();
}

function _messageIsRequired (req, res, next) {
  if (!req.body.message){
    return next("There is no message.");
  }
  next();
}

function _messageIsString (req, res, next) {
  if (typeof req.body.message !== 'string'){
    return next("Message is not a string.");
  }
  next();
}

function _messageMinLength (req, res, next) {
  if (req.body.message.length < 12) {
    return next("Message must be at least 12 characters long.");
  }
  next();
}

function _checkSpaces (req, res, next) {
  var message = req.body.message;
  if (message[0] === ' ' || message[message.length - 1] === ' ') {
    return next("Message must not contain leading or trailing spaces.");
  }
  next();
}

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(422).send(err);
});