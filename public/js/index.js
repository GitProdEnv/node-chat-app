var socket = io();

// Don't use ES6 since Safari or other browsers are not compatible
// This is why tools like babeljs have gotten so popular. It let's you
// transpile your ES6 code into ES5 code that can be run by older browsers.
// It's a great tool and I'd recommend checking it out if you get more into client-side JavaScript development.
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yup, that works for me.'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message)
});