var socket = io();

function scrolltoBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight(); // taking into account the padding aswell
    var lastMessageHeight = newMessage.prev().innerHeight(); // second last list

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrolltoBottom();
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    //
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrolltoBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    //
    // li.text(`${message.from} ${formattedTime}: `); // Not adding anfällig code in simple template strings, because there could be stored malicious code. We use here .text or .attr
    // a.attr('href', message.url);
    //
    // li.append(a);
    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {  // Acknowledgment If some Error from client to server the server can pass back "OK" status or error status
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {  // geolocation has callback if failure then
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});
