const flight =
  JSON.parse(
    localStorage.getItem("selectedFlight")
  );

const details =
  document.getElementById("flight-details");

details.innerHTML = `
  <div class="bg-sky-700 text-white p-8">

    <h1 class="text-4xl font-bold">
      ${flight.origin} → ${flight.destination}
    </h1>

    <p class="mt-2">
      ${flight.airline}
    </p>

  </div>

  <div class="p-8">

    <p class="mb-2">
      <strong>Date:</strong>
      ${flight.departure_date}
    </p>

    <p class="mb-2">
      <strong>Time:</strong>
      ${flight.departure_time}
      -
      ${flight.arrival_time}
    </p>

    <p class="mb-2">
      <strong>Duration:</strong>
      ${flight.duration}
    </p>

    <p class="mb-2">
      <strong>Class:</strong>
      ${flight.class}
    </p>

    <p class="mb-2">
      <strong>Available Seats:</strong>
      ${flight.seats_available}
    </p>

    <p class="text-2xl font-bold text-blue-600 mt-4">
      ৳${flight.price_bdt}
    </p>

    <div class="mt-6">

      <h3 class="font-bold text-xl mb-2">
        About This Flight
      </h3>

      <p>
        Enjoy a comfortable journey with
        ${flight.airline}.
        Travel safely from
        ${flight.origin}
        to
        ${flight.destination}
        with premium service.
      </p>

    </div>

  </div>
`;

document
  .getElementById("bookingForm")
  .addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
      document.getElementById("name").value;

    const date =
      document.getElementById("date").value;

    const travellers =
      Number(
        document.getElementById("travellers")
          .value
      );

    fetch("flights.json")
      .then(res => res.json())
      .then(flights => {

        const selected =
          flights.find(
            item => item.id === flight.id
          );

        const dateMatch =
          date === selected.departure_date;

        const seatMatch =
          travellers <=
          selected.seats_available;

        if (dateMatch && seatMatch) {

          let bookings =
            JSON.parse(
              localStorage.getItem(
                "bookings"
              )
            ) || [];

          bookings.push({
            name: name,
            date: date,
            service:
              selected.origin +
              " → " +
              selected.destination,
            status: "Confirmed"
          });

          localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
          );

          document.getElementById(
            "successText"
          ).innerHTML = `
            Booking for
            <b>${selected.destination}</b>
            confirmed successfully.
          `;

          successModal.showModal();

        } else {

          const alternatives =
            flights.filter(
              item =>
                item.destination ===
                  selected.destination &&
                item.id !== selected.id &&
                item.seats_available > 0
            );

          const altDiv =
            document.getElementById(
              "alternatives"
            );

          if (alternatives.length === 0) {

            altDiv.innerHTML = `
              <p class="text-red-500">
                No alternative flights found.
              </p>
            `;

          } else {

            altDiv.innerHTML =
              alternatives
                .map(
                  item => `
                <div class="border rounded p-3 my-2">

                  <h4 class="font-bold">
                    ${item.airline}
                  </h4>

                  <p>
                    ${item.origin}
                    →
                    ${item.destination}
                  </p>

                  <p>
                    Seats:
                    ${item.seats_available}
                  </p>

                  <p>
                    Date:
                    ${item.departure_date}
                  </p>

                </div>
              `
                )
                .join("");
          }

          alternativeModal.showModal();
        }
      });
  });

function goToBookings() {
  window.location.href =
    "booking.html";
}