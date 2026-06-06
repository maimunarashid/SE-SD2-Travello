document.addEventListener("DOMContentLoaded", () => {
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  if (!hotel) {
    window.location.href = "hotel.html";
    return;
  }

  // Fill hotel details
  document.getElementById("hotel-name").textContent = hotel.name;
  document.getElementById("hotel-description").textContent = hotel.description;
  document.getElementById("hotel-price").textContent = `৳ ${hotel.price} per room`;
  document.getElementById("hotel-image").src = hotel.image;
  document.getElementById("hotel-location").textContent = hotel.location;
  document.getElementById("hotel-room").textContent = hotel.roomType;
  document.getElementById("hotel-rating").textContent = hotel.rating;

  // Availability check
  let isAvailable = false; // flag

  document.getElementById("checkAvailability").addEventListener("click", () => {
    const rooms = document.getElementById("rooms").value;
    const date = document.getElementById("date").value;

    if (!rooms || !date) {
      alert("Please enter rooms and date");
      return;
    }

    const selectedDate = new Date(date);
    const fromDate = new Date(hotel.available_from);
    const toDate = new Date(hotel.available_to);

    if (
      selectedDate >= fromDate &&
      selectedDate <= toDate &&
      rooms <= hotel.max_rooms
    ) {
      document.getElementById("availability-status").textContent =
        "✅ Rooms are available!";
      const total = hotel.price * rooms;
      document.getElementById("total-price").textContent = `Total: ৳ ${total}`;
      isAvailable = true;
    } else {
      // show modal with info
      const infoModal = document.getElementById("hotelInfoModal");
      infoModal.querySelector("#infoText").innerHTML = `
        Booking is only available from <b>${hotel.available_from}</b> 
        to <b>${hotel.available_to}</b>.<br>
        Maximum rooms: <b>${hotel.max_rooms}</b>.
      `;
      infoModal.classList.remove("hidden");
      infoModal.classList.add("flex");

      document.getElementById("closeInfoModal").onclick = () => {
        infoModal.classList.add("hidden");
        infoModal.classList.remove("flex");
      };

      document.getElementById("availability-status").textContent =
        "❌ Not available for selected date/rooms";
      document.getElementById("total-price").textContent = "Total: ৳ 0";
      isAvailable = false;
    }
  });

  // Confirm booking
  document.getElementById("confirmHotelBooking").addEventListener("click", () => {
    const rooms = document.getElementById("rooms").value;
    const date = document.getElementById("date").value;

    if (!rooms || !date) {
      alert("Please fill all fields");
      return;
    }

    if (!isAvailable) {
      alert("Please check availability first!");
      return;
    }

    const booking = {
      id: hotel.id,
      name: hotel.name,
      date,
      rooms: Number(rooms),
      total: hotel.price * rooms,
      status: "Pending",
      service: "Hotel"
    };

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Show confirmed modal
    const confirmModal = document.getElementById("hotelBookingModal");
    confirmModal.classList.remove("hidden");
    confirmModal.classList.add("flex");

    document.getElementById("closeHotelModal").onclick = () => {
      window.location.href = "booking.html";
    };
  });
});




// map
function initMap(hotel) {
  const hotelLocation = [hotel.latitude, hotel.longitude];

  const map = L.map('map').setView(hotelLocation, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // হোটেল marker
  L.marker(hotelLocation).addTo(map)
    .bindPopup(`<b>${hotel.name}</b><br>${hotel.location}`)
    .openPopup();
}

document.addEventListener("DOMContentLoaded", () => {
  const hotel = JSON.parse(localStorage.getItem("selectedHotel"));
  if (!hotel) {
    window.location.href = "hotel.html";
    return;
  }

  // হোটেল details দেখানোর পর ম্যাপ লোড করো
  initMap(hotel);
});

