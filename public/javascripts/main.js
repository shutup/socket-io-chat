$(function () {
    var $messages = $('#messages');
    var $m = $('#m');
    var $chatForm = $('#chatForm');
    var $signInForm = $('#signInForm');
    var $username = $('#username');
    var $signInArea  = $('.signInArea');
    var $chatArea = $('.chatArea');

    var socket = io();

    $signInForm.submit(function () {
       var username = $username.val().trim();
       if (username.length >0) {
           socket.emit('sign in',username);
       }
       return false;
    });

    $chatForm.submit(function () {
        socket.emit('new message',$m.val());
        $messages.append(makeUpMessage($m.val()));
        $m.val('');
        $messages[0].scrollTop = $messages[0].scrollHeight;
        return false;
    });

    socket.on('user in',function () {

    });

    socket.on('sign in ok',function () {
        $signInArea.hide();
        $chatArea.show();
    });

    socket.on('new message',function (data) {
        $messages.append(makeUpNewMessage(data));
        $messages[0].scrollTop = $messages[0].scrollHeight;
    });

    function makeUpNewMessage(data) {
        var username = data.username;
        var message = data.message;
        var li = $('<li/>');

        var avater = $('<div class="avatar"/>');
        var avaterContent = $('<label/>');
        avaterContent.text(username.toUpperCase().charAt(0));
        avater.append(avaterContent);
        var messageBubbleLeft = $('<div class="talk-bubble tri-right left-top"/>');
        var messageContent = $('<div class="talktext"/>');
        var p = $('<p/>');
        p.text(username+": "+message);
        messageContent.append(p);
        messageBubbleLeft.append(messageContent);
        li.append(avater);
        li.append(messageBubbleLeft);
        return li;
    };

    function makeUpMessage(msg) {
        var li = $('<li/>');
        var messageBubbleRight = $('<div class="talk-bubble-right tri-right btm-right"/>');
        var messageContent = $('<div class="talktext"/>');
        var p = $('<p/>');
        p.text(msg);
        messageContent.append(p);
        messageBubbleRight.append(messageContent);
        li.append(messageBubbleRight);
        return li;
    }

});