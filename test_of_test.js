// simple test to make sure jasmine tests are working
describe('Addition', function () {
	const add = (x,y) => x+y
  it('should add numbers', function () {
    expect(add(2, 4)).toBe(6)
    expect(add(2, 4)).not.toBe(2)
  })
})
