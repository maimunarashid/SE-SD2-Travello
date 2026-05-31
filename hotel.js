let hotels = [];

const hotelContainer = document.getElementById("hotelContainer");

// Load JSON
fetch("./hotel.json") // ✅ Correct path (no 'data/' folder)
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to load JSON");
    }
    return res.json();
  })
  .then(data => {
    hotels = data;
    renderHotels(hotels);
    console.log("Hotels loaded:", hotels);
  })
  .catch(err => {
    console.error("ERROR loading JSON:", err);
  });

// Render Hotels
function renderHotels(hotelList) {
  hotelContainer.innerHTML = "";

  if (!hotelList.length) {
    hotelContainer.innerHTML = `
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-semibold">No hotels found</h2>
      </div>
    `;
    return;
  }

  hotelList.forEach(hotel => {
    hotelContainer.innerHTML += `
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <img src="${hotel.image}" class="w-full md:w-72 h-56 object-cover" alt="${hotel.name}">
          <div class="p-5 flex-1">
            <h2 class="text-2xl font-bold mb-2">${hotel.name}</h2>
            <p class="text-gray-500 mb-2">📍 ${hotel.location}</p>
            <p class="text-gray-600 mb-3">${hotel.description}</p>
            <p class="mb-1"><b>Room:</b> ${hotel.roomType}</p>
            <p class="mb-1"><b>Rating:</b> ⭐ ${hotel.rating}</p>
            <p class="mb-1 text-blue-600 font-bold">৳${hotel.price}</p>
            <p class="mb-3">
              ${
                hotel.availability
                  ? `<span class="text-green-600 font-semibold">Available</span>`
                  : `<span class="text-red-600 font-semibold">Not Available</span>`
              }
            </p>
            <div class="flex gap-3">
              <button onclick="viewDetails(${hotel.id})" class="bg-gray-700 text-white px-4 py-2 rounded-lg">View Details</button>
              ${
                hotel.availability
                  ? `<button onclick="bookHotel(${hotel.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Book Now</button>`
                  : ""
              }
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// FILTER (Sidebar)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    const location = e.target.dataset.location;
    if (location === "all") {
      renderHotels(hotels);
      return;
    }
    const filtered = hotels.filter(h => h.location === location);
    renderHotels(filtered);
  }
});

// VIEW DETAILS
function viewDetails(id) {
  const hotel = hotels.find(h => h.id === id);
  localStorage.setItem("selectedHotel", JSON.stringify(hotel));
  window.location.href = "hotelDetail.html"; // ✅ match your actual detail page name
}

// BOOK HOTEL
function bookHotel(id) {
  const hotel = hotels.find(h => h.id === id);
  localStorage.setItem("selectedHotel", JSON.stringify(hotel));
  window.location.href = "hotelDetail.html";
}
