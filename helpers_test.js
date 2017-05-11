const add = (x,y) => x+y

describe('Addition', function () {
  it('should add numbers', function () {
    expect(add(2, 4)).toBe(6)
    expect(add(2, 4)).not.toBe(2)
  })
})
