fetch("bus.json")
  .then(res => res.json())
  .then(buses => {

    const list = document.getElementById("bus-list");

    buses.forEach(bus => {

      const card = document.createElement("div");

      card.className =
        "bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300";

      card.innerHTML = `
        <div class="bg-orange-600 text-white p-4">

          <h2 class="text-xl font-semibold">
            ${bus.origin} → ${bus.destination}
          </h2>

          <p class="text-sm">
            ${bus.bus_name}
          </p>

        </div>

        <div class="p-6">

          <p>
            <span class="font-bold">
              Date:
            </span>
            ${bus.departure_date}
          </p>

          <p>
            <span class="font-bold">
              Time:
            </span>
            ${bus.departure_time}
            -
            ${bus.arrival_time}
          </p>

          <p>
            <span class="font-bold">
              Duration:
            </span>
            ${bus.duration}
          </p>

          <p>
            <span class="font-bold">
              Seats:
            </span>
            ${bus.seats_available}
          </p>

          <p class="mb-4">
            <span class="font-bold">
              Class:
            </span>
            ${bus.class}
          </p>

          <div class="p-4 border-t border-gray-200 flex items-center justify-between">

            <p class="text-orange-600 font-bold">
              ৳${bus.price_bdt}
            </p>

            <button
              class="book-btn bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700">

              Book Now

            </button>

          </div>

        </div>
      `;

      const bookBtn =
        card.querySelector(".book-btn");

      bookBtn.addEventListener("click", () => {

        localStorage.setItem(
          "selectedBus",
          JSON.stringify(bus)
        );

        window.location.href =
          "busDetails.html";
      });

      list.appendChild(card);
    });

  })
  .catch(error => {
    console.error(error);

    document.getElementById(
      "bus-list"
    ).innerHTML = `
      <p class="text-red-500">
        Failed to load buses.
      </p>
    `;
  });