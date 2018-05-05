var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Jen';
        const text = 'Some message';
        const message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocation', () => {

    it('should generate correct location object', () => {
        const from = 'Adam';
        const latitude = 12;
        const longitude = 33;
        const expectUrl = 'https://www.google.com/maps?q=12,33';

        const message = generateLocationMessage(from, latitude, longitude);

        expect(message).toMatchObject({from, url: expectUrl});
        expect(typeof message.createdAt).toBe('number');
    });

});
