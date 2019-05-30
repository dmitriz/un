// aliases for different factory api

// replace Factory.method() with Factory.of()
const methodToFactory = methodName => Factory => {

	// prototypally inherit from Factory
	// const Transformed = Object.create(Factory)

	const Transformed = Factory[methodName]
	// Transformed.prototype = Factory
	Object.setPrototypeOf(Transformed, Factory)

	return Transformed
}


/**
 * Set proto object for all instances created by the Factory
 * (can be used to provide additional instance methods)
 */ 
const setInstanceProto = protoObj => Factory =>
	(...agrs) => {
		let obj = Factory(...args)
		Object.setPrototypeOf(obj, protoObj)
		return obj
	}
	

module.exports = { methodToFactory }
