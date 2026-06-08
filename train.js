fetch("train.json")
  .then(res => res.json())
  .then(trains => {

    const list =
      document.getElementById("train-list");

    trains.forEach(train => {

      const card =
        document.createElement("div");

      card.className =
        "bg-white shadow-lg rounded-lg overflow-hidden";

      card.innerHTML = `
        <div class="bg-green-700 text-white p-4">

          <h2 class="text-xl font-bold">
            ${train.origin} → ${train.destination}
          </h2>

          <p>
            ${train.train_name}
          </p>

        </div>

        <div class="p-6">

          <p>Date: ${train.departure_date}</p>

          <p>
            Time:
            ${train.departure_time}
            -
            ${train.arrival_time}
          </p>

          <p>
            Class:
            ${train.class}
          </p>

          <p>
            Seats:
            ${train.seats_available}
          </p>

          <div class="flex justify-between items-center mt-4">

            <span class="font-bold text-green-600">
              ৳${train.price_bdt}
            </span>

            <button
              class="book-btn bg-orange-500 text-white px-4 py-2 rounded">
              Book Now
            </button>

          </div>

        </div>
      `;

      const btn =
        card.querySelector(".book-btn");

      btn.addEventListener("click", () => {

        localStorage.setItem(
          "selectedTrain",
          JSON.stringify(train)
        );

        window.location.href =
          "trainDetails.html";
      });

      list.appendChild(card);
    });
  });