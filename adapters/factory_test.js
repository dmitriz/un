const { setInstanceProto } = require('./factory.js')

const Factory = (val, key) => ({ [key]: val })

const SuperFactory = setInstanceProto(
	{ newKey: 'Yes' }
)(Factory)

describe('original factory', ()=>{
	it('should create object with specified key and value', ()=>{
		const obj = Factory(55, 'a')
		expect(obj.a).toBe(55)
	})
})

describe('factory with added proto', ()=>{
	const obj = SuperFactory(55, 'a')

	it('should preserve object methods', ()=>{
		expect(obj.a).toBe(55)		
	})
	it('should provide new methods from the prototype', ()=>{
		expect(obj.newKey).toBe('Yes')
	})
})