const { setInstanceProto } = require('./factory.js')

const Factory = (val, key) => ({ [key]: val })
const SuperFactory = setInstanceProto(
	{ newKey: 'Yes' }
)(Factory)

const Factories = [

	// producing plain objects
	(val, key) => ({ [key]: val }),

	// producing objects with prototype
	(val, key) => Object.create({ [key]: val })
]

const protoObj = { newKey: 'Yes' }
const SuperFactories = Factories.map(setInstanceProto(protoObj))


describe('original factory', ()=>{
	it('should create object with specified key and value', ()=>{
		const obj = Factories[0](55, 'a')
		expect(obj.a).toBe(55)
		const obj1 = Factories[1](55, 'a')
		expect(obj1.a).toBe(55)
	})
})

describe('factory with added proto', ()=>{
	const obj = SuperFactories[0](55, 'a')
	const obj1 = SuperFactories[1](55, 'a')

	it('should preserve object own props', ()=>{
		expect(obj.a).toBe(55)		
	})
	it('should provide props from the new prototype', ()=>{
		expect(obj.newKey).toBe('Yes')
	})
})