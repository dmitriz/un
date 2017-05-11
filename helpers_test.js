const { methodToFactory } = require('./helpers')

// simple test to make sure karma is working
describe('Addition', function () {
	const add = (x,y) => x+y
  it('should add numbers', function () {
    expect(add(2, 4)).toBe(6)
    expect(add(2, 4)).not.toBe(2)
  })
})

const Factory = {
	// simply return the array of its args
	method: (...args) => [...args]
}
const InheritedFactory = Object.create(Factory)

// const TransformedFactory = methodToFactory('method')(Factory)
// const TransformedInheritedFactory = methodToFactory('method')(InheritedFactory)

const testFactory = Factory => {
	const TransformedFactory = alias('from', 'to')(Factory)

	describe(`Factory transformer`, () => {

		it('should get called with all arguments', () => {
			expect(Factory.method()).toEqual([])
			expect(Factory.method(1,2,'a3')).toEqual([1,2,'a3'])
		})
		it('should transform factory into function executing method provided', () => {
			expect(TransformedFactory(1,2,'a3')).toEqual([1,2,'a3'])
		})
		it('should keep all methods', () => {
			expect(TransformedFactory.method()).toEqual([])
			expect(TransformedFactory.method(1,2,'a3')).toEqual([1,2,'a3'])		
		})
		it('should not create own properties', () => {
			expect(Object.keys(Factory)).toEqual([])
		})
	})
}

;[Factory, InheritedFactory].map(testFactory)


