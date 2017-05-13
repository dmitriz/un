/**
 * Transforms a _plain_ object creating Factory F to the new Factory T(F)
 * creating the same plain objects with the additional specified prototype set on each object
 * (can be used to provide additional instance methods on the object created)
 *
 * Warning. If the objects were created by F with prototypes, they will be overwritten by T(F).
 * This is by design, to avoid performance overheads overusing prototype chains.
 * In particular, this transform may not be suitable for Factories using constructors
 * and relying on their prototypal chains.
 */ 
const setInstanceProto = protoObj => Factory =>
  (...args) => {
    const factoryObj = Factory(...args)
    let newObj = Object.create(protoObj)
    Object.assign(newObj, factoryObj)
    return newObj
  }

module.exports = { setInstanceProto }
