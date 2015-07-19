var chatRoomContainer = document.createElement('div');
chatRoomContainer.id = "chatRoomContainer";
document.body.appendChild(chatRoomContainer);

var loginScreen = document.createElement('div');
loginScreen.id = "loginScreen";
chatRoomContainer.appendChild(loginScreen);

var loginText = document.createElement('h1');
loginText.innerHTML = "Chat World";
loginScreen.appendChild(loginText);

var login = document.createElement('form');

createLogin();

var roomVal;
var nameVal;

function createLogin(){

  var roomWrapper = document.createElement('p');
  roomWrapper.id = "roomWrapper";
  roomWrapper.innerHTML = "Room: ";
  login.appendChild(roomWrapper);

  var room = new InputField('room', roomWrapper, "Enter Room");
  room.id = "room";

  var userWrapper = document.createElement('p');
  userWrapper.id = "userWrapper";
  userWrapper.innerHTML = "Name: ";
  login.appendChild(userWrapper);

  var username = new InputField('username', userWrapper, "Enter Name");
  username.id = "username";

  var join = document.createElement('button');
  join.id = "join";
  join.innerHTML = "Join";
  join.type = "submit";

  login.onsubmit = function(event){
    event.preventDefault();
    roomVal = document.getElementById('room').value;
    nameVal = document.getElementById('username').value;
    var req = new XMLHttpRequest();
    req.onload = function(){
      loginScreen.remove();
      var messages = JSON.parse(this.responseText);
      loadChat(messages);
    };
    req.open("GET", "http://localhost:3000/" + roomVal, true);
    req.send(JSON.stringify());
  };
  loginScreen.appendChild(login);
  login.appendChild(join);
}

var chatRoomMessages;
var idTracker;

function loadChat(messages){
  var chatRoomContainer = document.getElementById("chatRoomContainer");

  var chatRoom = document.createElement('div');
  chatRoom.id = "chatRoom";
  chatRoomContainer.appendChild(chatRoom);

  chatRoomMessages = document.createElement('div');
  chatRoomMessages.id = "messageDiv";
  chatRoom.appendChild(chatRoomMessages);

  messages.forEach(addMessage);
  messageDiv.scrollTop = messageDiv.scrollHeight;

  var postForm = document.createElement('form');
  postForm.id = "postForm";

  var messageWrapper = document.createElement('p');
  messageWrapper.id = "messageWrapper";
  messageWrapper.innerHTML = "Message: ";
  postForm.appendChild(messageWrapper);

  var messageField = new InputField('message', messageWrapper, "Type your message here");

  var post = document.createElement('button');
  post.innerHTML = "Post";
  post.type = "submit";

  chatRoom.appendChild(postForm);
  postForm.appendChild(post);

  idTracker = messages.length;

  setInterval(function(){appendNew(messages);}, 1000);
  postMessage();
}

function addMessage (message){
  var msg = document.createElement('p');
  msg.innerHTML = message.name + ": " + message.message;
  msg.id = "msg";
  chatRoomMessages.appendChild(msg);
}

function appendNew (){
  var messageDiv = document.getElementById("messageDiv");
  var req = new XMLHttpRequest();
  var filteredArray = [];
  req.onload = function(){
    var messages = JSON.parse(this.responseText);
    if (messages.length > idTracker){
      for (var i = idTracker; i < messages.length; i++){
        filteredArray.push(messages[i]);
      }
    filteredArray.forEach(addMessage);
    messageDiv.scrollTop = messageDiv.scrollHeight;
    idTracker = messages.length;
    }
  };
  req.open("GET", "http://localhost:3000/" + roomVal, true);
  req.send(JSON.stringify());
  return true;
}

function postMessage(){
    postForm.onsubmit = function(event){
      event.preventDefault();
      var newMessage = {
        name: nameVal,
        message: document.getElementById('message').value
      };
      var req = new XMLHttpRequest();
      req.onload = function (){
        var messages = JSON.parse(this.responseText);
        appendNew();
        document.getElementById('message').value = " ";
      };
      req.open("POST", "http://localhost:3000/" + roomVal, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.responseText = 'text';
      req.send(JSON.stringify(newMessage));
    };
}

function InputField(name, target, placeholder_text){
  var input = document.createElement('input');
  input.id = name;
  input.placeholder = placeholder_text;
  target.appendChild(input);
}