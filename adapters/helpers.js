// aliases for different factory api

// replace Factory.method() with Factory.of()
const methodToFactory = methodName => Factory => {

	// prototypally inherit from Factory
	// const Transformed = Object.create(Factory)

	const Transformed = Factory[methodName]
	// Transformed.prototype = Factory
	Transformed.__proto__ = Factory

	return Transformed
}


/**
 * Set proto object for all instances created by the Factory
 * (can be used to provide additional instance methods)
 */ 
const setInstanceProto = protoObj => Factory =>
	(...agrs) => {
		let obj = Factory(...args)
		obj.__proto__ = protoObj
		return obj
	}
	

module.exports = { methodToFactory }
