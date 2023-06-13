const createEvent = (event) => {
  const priceFormatted = event.price === 0 ? 'Free' : event.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const date = new Date(event.date);
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return `
    <div class="events-card">
      <img src="${event.image}" alt="">
      <div class="events-card_info">
        <h2>${event.title}</h2>
        <p>${formattedDate}</p>
        <p>${event.location.address} - ${event.location.city}, ${event.location.state}</p>
        <p>${priceFormatted}</p>
      </div>
    </div>
  `;
};

export { createEvent };