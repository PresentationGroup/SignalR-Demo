var chatBox = $("#ChatBox");

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .build();

connection.start();


//connection.invoke('SendNewMessage', "Visitor", "Hi, Client Send this Message!");

  //show ChatBox for User
function showChatDialog() {
    chatBox.css("display", "block");
}

function Init() {

    setTimeout(showChatDialog, 1000);


    // execute on submit button Click
    var NewMessageForm = $("#NewMessageForm");
    NewMessageForm.on("submit", function (e) {

        e.preventDefault();
        var message = e.target[0].value;
        e.target[0].value = '';
        sendMessage(message);
    });

}

//send Message to server
function sendMessage(text) {
    connection.invoke('SendNewMessage', " Visitor ", text);
}

//recieve Message from Server
connection.on('getNewMessage', getMessage);

function getMessage(sender, message, time) {
 
    $("#Messages").append("<li><div><span class='name'>"+sender+"</span><span class='time'>"+time+"</span></div><div class='message'>"+message+"</div></li>")
};


$(document).ready(function () {
    Init();
});
