module.exports = {
  setDirectory: setDirectory,
  getDirectory: getDirectory,
  createRoom: createRoom,
  readChatroom: readChatroom,
  postMessage: postMessage
};

var fs = require('fs');
var path = require('path');

var _chatDirectory = null;

function setDirectory (directoryPath){
  var directory = fs.statSync(path.resolve(directoryPath));
  var isDirectory = directory.isDirectory();

  if (isDirectory){
    _chatDirectory = directoryPath;
  }

  return isDirectory;
}

function getDirectory (){
  return _chatDirectory;
}

function createRoom(roomName){
  var messages = [];
  var filepath = path.resolve(_chatDirectory, roomName + ".JSON");

  fs.writeFileSync(filepath, JSON.stringify(messages));

  return messages;
}

function readChatroom(roomName, username){
  var filepath = path.resolve(_chatDirectory, roomName + ".JSON");
  var fileString = null;

  try {
    fileString = fs.readFileSync(filepath).toString();
  } catch (err) {
    return createRoom(roomName);
  }

  fileString = JSON.parse(fileString);

  if (!username) {
    return fileString;
  } else {
    return fileString.filter(function(message){
      if (message.name === username){
        return true;
      }
    });
  }
}

function postMessage(message, roomName){
  var messages = readChatroom(roomName);
  var newMessage = {
    name: message.name,
    message: message.message,
    id: messages.length + 1,
    timestamp: new Date().toString()
  };
  messages.push(newMessage);

  var filepath = path.resolve(_chatDirectory, roomName + ".JSON");

  fs.writeFileSync(filepath, JSON.stringify(messages));

  return messages;
}