// aliases for different factory api

// replace Factory.method() with Factory()
const methodToFactory = methodName => Factory => {
	// const Transformed = Object.create(Factory)
	const Transformed = Factory[methodName]

	return Transformed
}

module.exports = { methodToFactory }
