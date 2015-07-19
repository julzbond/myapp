var express = require('express');
var router = express.Router();

var chatroom = require('../app/lib/chatroom.js');
chatroom.setDirectory('./app/data');

var validator = require('../app/lib/validator.js');

router.route('/:chatroom')
  .get(function(req, res){
    var chatroomName = req.params.chatroom;
    var messages = chatroom.readChatroom(chatroomName);
    res.json(messages);
  })
  .post(
    validator.nameIsRequired,
    validator.nameIsString,
    validator.nameMinLength,
    validator.nameMaxLength,
    validator.noSpaces,
    validator.messageIsRequired,
    validator.messageIsString,
    validator.messageMinLength,
    validator.checkSpaces,

    function(req, res){
      var messages = chatroom.postMessage(req.body, req.params.chatroom);
      res.json(messages);
    });

router.get('/:chatroom/:username', function(req, res){
  var messages = chatroom.readChatroom(req.params.chatroom, req.params.username);
  res.json(messages);
});

module.exports = router;