const eventCache = new Proxy({}, {
  get: function(target, category) {
    return target[category];
  },
  set: function(target, category, value) {
    target[category] = value;
    localStorage.setItem('eventCache', JSON.stringify(target));
    return true;
  }
});

const cachedData = localStorage.getItem('eventCache');
if (cachedData) {
  Object.assign(eventCache, JSON.parse(cachedData));
}

const saveEventToLocalStorage = (eventName, event) => {
  const events = JSON.parse(localStorage.getItem(eventName)) || [];
  events.push(event);
  localStorage.setItem(eventName, JSON.stringify(events));
};

export default eventCache;
