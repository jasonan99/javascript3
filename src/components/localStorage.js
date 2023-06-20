function saveEvent(eventType, eventId) {
  const eventHtml = document.getElementById(eventId).outerHTML;

  let events = JSON.parse(localStorage.getItem(eventType)) || [];

  const existingEventIndex = events.findIndex((storedEvent) => storedEvent.id === eventId);

  if (existingEventIndex > -1) {
    events[existingEventIndex].html = eventHtml;
  } else {
    events.push({ id: eventId, html: eventHtml });
  }

  localStorage.setItem(eventType, JSON.stringify(events));
}

export { saveEvent }