const sum = require('./sum');

test('debe de regresar 3 cuando la a = 1 y b = 2', () => {
    let result = sum(1, 2);
    expect(result).toBe(3);
});