// aliases for different factory api

// replace Factory.method() with Factory.of()
const methodToFactory = methodName => Factory => {

	// prototypally inherit from Factory
	const Transformed = Object.create(Factory)

	// const Transformed = Factory[methodName]
	// Transformed.prototype = Factory
	// Transformed.__proto__ = Factory

	return Transformed
}

module.exports = { methodToFactory }
