/**
 * A stream is a list of values emitted at discrete time moments.
 */

/**
 * Create new stream
 
 const stream = createStream.of(value)

 * @param {*} value - (Optional) the initial value of the stream
 * @return {stream} the stream
  
 * @aliased:
 *
 * createStream["fantasy-land/of"]()
 *
 * mithril/stream:
 * createStream()
 *
 * flyd:
 * createStream.stream()
 */



/**
 * Creates a dependent stream whose value is set to the result of the callback function

 const stream = stream.map(callback)

 * @aliased:

 createStream["fantasy-land/map"](cb)
 stream.map(cb)
 */

 /**
 * Creates a new stream with the results of calling the reducer function 
 * on every value in the stream with an accumulator and the incoming value.
 *
 
 const childStream = parentStream.scan(reducer, initVal)

 * @param {Function} reducer: (acc, feed) -> acc
 * @param {*} initVal - the initial value of the accumulator
 * @param {stream} parentStream - the stream source
 * @return {stream} the new stream childStream
 *
 * @example
 * var numbers = flyd.stream();
 * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);
 * numbers(2)(3)(5);
 * sum(); // 10
 */

