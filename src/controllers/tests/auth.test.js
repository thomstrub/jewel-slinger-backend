const sum = require('../auth');

test('adds 1 +2 to equal 3', () => {
    expect(sum.sum(1,2)).toBe(3);
})