/**
 * Set prototype object for all instances created by the Factory
 * (can be used to provide additional instance methods)
 */ 
const setInstanceProto = protoObj => Factory =>
	(...args) => {
		let factoryObj = Factory(...args)
		let newObj = Object.create(protoObj)
		Object.assign(newObj, factoryObj)
		return newObj
	}

module.exports = { setInstanceProto }