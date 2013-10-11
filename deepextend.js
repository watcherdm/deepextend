(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore'], function (_) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.deepextend = factory(_));
        });
    } else {
        // Browser globals
        root.deepextend = factory(root._);
    }
}(this, function (_) {
  var _ = require("underscore");

  function deepextend(destination, source, history){
    // setup history
    if (history == undefined) {
      history = [];
    }
    _.each(source, function(val, key){
      var newInst;
      if (history.indexOf(val) > -1) {
        destination[key] = val;
      } else if (_.isArray(val)) {
        newInst = destination[key] || [];
        destination[key] = deepextend(newInst, val, history);
        history.push(newInst);
      } else if (_.isObject(val)) {
        newInst = destination[key] || {};
        destination[key] = deepextend(newInst, val, history);
        history.push(newInst);
      } else if (_.isFunction(val)) {
        destination[key] = val;
        history.push(val);
      } else {
        destination[key] = val;
      }
    });
    return destination;
  }

  function call_deepextend(){
    var args = _.toArray(arguments),
      pair,
      result = args.pop();
    while(args.length > 0) {
      pair = [args.pop(), result]
      result = deepextend.apply(_, pair);
    }
    return result;
  }
  _.mixin({
    deepextend: call_deepextend
  });

  return call_deepextend;

}));
