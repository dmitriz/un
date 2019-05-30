/**
 * Set prototype object for all instances created by the Factory
 * (can be used to provide additional instance methods)
 */ 
const addProto = protoObj => obj => {

	// get prototype object
	const oldProto = Object.getPrototypeOf(obj)

	// create new object with that prototype
	const newProto = Object.create(oldProto)

	return newProto
}