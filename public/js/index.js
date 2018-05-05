var socket = io();

// Don't use ES6 since Safari or other browsers are not compatible
// This is why tools like babeljs have gotten so popular. It let's you
// transpile your ES6 code into ES5 code that can be run by older browsers.
// It's a great tool and I'd recommend checking it out if you get more into client-side JavaScript development.
socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'Andrew',
    //     text: 'Yup, that works for me.'
    // });

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {  // Acknowledgment If some Error from client to server the server can pass back "OK" status or error status

    });
});