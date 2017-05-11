const { methodToFactory } = require('./helpers')

// simple test to make sure karma is working
describe('Addition', function () {
	const add = (x,y) => x+y
  it('should add numbers', function () {
    expect(add(2, 4)).toBe(6)
    expect(add(2, 4)).not.toBe(2)
  })
})

describe('Factory transformer', () => {
	const Factory = {
		method: (...args) => [...args]
	}
	it('should get called with all arguments', () => {
		expect(Factory.method()).toEqual([])
		expect(Factory.method(1,2,'a3')).toEqual([1,2,'a3'])
	})
	it('should transform factory into function executing method provided', () => {
		const TransformedFactory = methodToFactory('method')(Factory)
		expect(TransformedFactory(1,2,'a3')).toEqual([1,2,'a3'])
	})
})
