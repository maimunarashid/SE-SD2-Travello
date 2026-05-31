// Get hotel id
const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('id');

fetch('hotel.json')
  .then(res => res.json())
  .then(data => {
    const hotel = data.find(h => h.id == hotelId);

    if (!hotel) {
      alert("Hotel not found!");
      return;
    }

    // ===== FILL DATA =====
    document.getElementById('hotel-name').textContent = hotel.name;
    document.getElementById('hotel-description').textContent = hotel.description;
    document.getElementById('hotel-price').textContent = `৳ ${hotel.price} per night`;
    document.getElementById('hotel-image').src = hotel.image;

    document.getElementById('hotel-location').textContent = hotel.location;
    document.getElementById('hotel-room').textContent = hotel.roomType;
    document.getElementById('hotel-rating').textContent = hotel.rating;
    document.getElementById('hotel-availability').textContent =
      hotel.availability ? "Available" : "Not Available";

    // ===== AMENITIES =====
    let amenitiesHTML = `
      <ul class="list-disc pl-5 text-gray-600 space-y-2">
        ${hotel.amenities.map(a => `<li>${a}</li>`).join("")}
      </ul>
    `;
    document.getElementById('hotel-amenities').innerHTML = amenitiesHTML;

    // ===== PRICE CALC =====
    const peopleInput = document.getElementById('people');
    peopleInput.addEventListener('input', () => {
      const total = hotel.price * peopleInput.value;
      document.getElementById('total-price').textContent = `Total: ৳ ${total}`;
    });

    // ===== BOOKING SYSTEM =====
    const confirmBtn = document.getElementById("confirmHotelBooking");
    const modal = document.getElementById("hotelBookingModal");
    const closeBtn = document.getElementById("closeHotelModal");

    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const people = document.getElementById("people").value;
      const date = document.getElementById("date").value;

      if (!people || !date) {
        alert("Please fill all fields");
        return;
      }

      const booking = {
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        price: hotel.price,
        people: Number(people),
        date,
        total: hotel.price * people,
        status: "pending",
        service: "Hotel"
      };

      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
      window.location.href = "booking.html";
    });
  });
