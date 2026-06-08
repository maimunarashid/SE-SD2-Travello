const train =
  JSON.parse(
    localStorage.getItem("selectedTrain")
  );

const details =
  document.getElementById("train-details");

details.innerHTML = `
  <div class="bg-green-700 text-white p-8">

    <h1 class="text-4xl font-bold">
      ${train.origin} → ${train.destination}
    </h1>

    <p class="mt-2">
      ${train.train_name}
    </p>

  </div>

  <div class="p-8">

    <p class="mb-2">
      <strong>Date:</strong>
      ${train.departure_date}
    </p>

    <p class="mb-2">
      <strong>Time:</strong>
      ${train.departure_time}
      -
      ${train.arrival_time}
    </p>

    <p class="mb-2">
      <strong>Duration:</strong>
      ${train.duration}
    </p>

    <p class="mb-2">
      <strong>Class:</strong>
      ${train.class}
    </p>

    <p class="mb-2">
      <strong>Available Seats:</strong>
      ${train.seats_available}
    </p>

    <p class="text-2xl font-bold text-green-600 mt-4">
      ৳${train.price_bdt}
    </p>

    <div class="mt-6">

      <h3 class="font-bold text-xl mb-2">
        About This Train
      </h3>

      <p>
        Enjoy a comfortable journey with
        ${train.train_name}.
        Travel safely from
        ${train.origin}
        to
        ${train.destination}
        with comfortable seating and reliable service.
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

    fetch("train.json")
      .then(res => res.json())
      .then(trains => {

        const selected =
          trains.find(
            item => item.id === train.id
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
              "Train - " +
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
            Train booking for
            <b>${selected.destination}</b>
            confirmed successfully.
          `;

          successModal.showModal();

        } else {

          const alternatives =
            trains.filter(
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
                No alternative trains found.
              </p>
            `;

          } else {

            altDiv.innerHTML =
              alternatives
                .map(
                  item => `
                <div class="border rounded p-3 my-2">

                  <h4 class="font-bold">
                    ${item.train_name}
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