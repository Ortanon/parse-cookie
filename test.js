require = require('esm')(module)
const { default: parseCookie } = require('.')

test('argument validation', () => {
    expect(() => parseCookie()).toThrow(TypeError)
    expect(() => parseCookie(null, 42)).toThrow(TypeError)
})

test('basic', () => {
    expect(parseCookie('foo=bar')).toEqual({ foo: 'bar' })
    expect(parseCookie('foo=123')).toEqual({ foo: '123' })
})

test('ignore spaces', () => {
    expect(parseCookie('FOO    = bar;   baz  =   raz'))
        .toEqual({ FOO: 'bar', baz: 'raz' })
})

// I don't see why I'd want a library like this to do these
/* 
test('escaping', function () {
    assert.deepEqual({ foo: 'bar=123456789&name=Magic+Mouse' },
        cookie.parse('foo="bar=123456789&name=Magic+Mouse"'));

    assert.deepEqual({ email: ' ",;/' },
        cookie.parse('email=%20%22%2c%3b%2f'));
});

test('ignore escaping error and return original value', () => {
    assert.deepEqual({ foo: '%1', bar: 'bar' }, cookie.parse('foo=%1;bar=bar'));
}); 

test('unencoded', function () {
    assert.deepEqual({ foo: 'bar=123456789&name=Magic+Mouse' },
        cookie.parse('foo="bar=123456789&name=Magic+Mouse"', {
            decode: function (value) { return value; }
        }));

    assert.deepEqual({ email: '%20%22%2c%3b%2f' },
        cookie.parse('email=%20%22%2c%3b%2f', {
            decode: function (value) { return value; }
        }));
});
*/

test('dates', () => {
    expect(parseCookie('priority=true; expires=Wed, 29 Jan 2014 17:43:25 GMT; Path=/'))
        .toEqual({ priority: 'true', Path: '/', expires: 'Wed, 29 Jan 2014 17:43:25 GMT' })
})

test('missing value', () => {
    expect(parseCookie('foo; bar=1; fizz= ; buzz=2'))
        .toEqual({ bar: '1', fizz: '', buzz: '2' })
})

test('assign only once', () => {
    expect(parseCookie('foo=%1;bar=bar;foo=boo'))
        .toEqual({ foo: '%1', bar: 'bar' })
    expect(parseCookie('foo=false;bar=bar;foo=true'))
        .toEqual({ foo: 'false', bar: 'bar' })
    expect(parseCookie('foo=;bar=bar;foo=boo'))
        .toEqual({ foo: '', bar: 'bar' })
})