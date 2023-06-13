const eventCache = new Proxy({}, {
  get: function(target, category) {
    return target[category];
  },
  set: function(target, category, value) {
    target[category] = value;
    return true;
  }
});

export default eventCache;