fetch("flights.json")
  .then(res => res.json())
  .then(flights => {
    const list = document.getElementById("flight-list");

    flights.forEach(flight => {
      const card = document.createElement("div");

      card.className =
        "bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300";

      card.innerHTML = `
        <div class="bg-sky-700 text-white p-4">
          <h2 class="text-xl font-semibold">
            ${flight.origin} → ${flight.destination}
          </h2>
          <p class="text-sm">${flight.airline}</p>
        </div>

        <div class="p-6">
          <p>
            <span class="font-bold">Date:</span>
            ${flight.departure_date}
          </p>

          <p>
            <span class="font-bold">Time:</span>
            ${flight.departure_time} - ${flight.arrival_time}
          </p>

          <p>
            <span class="font-bold">Duration:</span>
            ${flight.duration}
          </p>

          <p>
            <span class="font-bold">Seats:</span>
            ${flight.seats_available}
          </p>

          <p class="mb-4">
            <span class="font-bold">Class:</span>
            ${flight.class}
          </p>

          <div class="p-6 border-t border-gray-200 flex items-center justify-between">

            <p class="text-blue-600 font-bold">
              ৳${flight.price_bdt}
            </p>

            <button
              class="book-btn bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded">
              Book Now
            </button>

          </div>
        </div>
      `;

      const btn = card.querySelector(".book-btn");

      btn.addEventListener("click", () => {

        localStorage.setItem(
          "selectedFlight",
          JSON.stringify(flight)
        );

        window.location.href = "flightDetails.html";
      });

      list.appendChild(card);
    });
  })
  .catch(error => {
    console.error(error);

    document.getElementById("flight-list").innerHTML =
      "<p class='text-red-500'>Failed to load flights</p>";
  });