const bus = JSON.parse(
  localStorage.getItem("selectedBus")
);

if (!bus) {
  window.location.href = "bus.html";
}

const details =
  document.getElementById("bus-details");

details.innerHTML = `
  <div class="bg-orange-600 text-white p-8">

    <h1 class="text-4xl font-bold">
      ${bus.origin} → ${bus.destination}
    </h1>

    <p class="mt-2 text-lg">
      ${bus.bus_name}
    </p>

  </div>

  <div class="p-8">

    <p><strong>Date:</strong> ${bus.departure_date}</p>
    <p><strong>Time:</strong> ${bus.departure_time} - ${bus.arrival_time}</p>
    <p><strong>Duration:</strong> ${bus.duration}</p>
    <p><strong>Class:</strong> ${bus.class}</p>
    <p><strong>Seats:</strong> ${bus.seats_available}</p>

    <p class="text-2xl font-bold text-orange-600 mt-4">
      ৳${bus.price_bdt}
    </p>

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
        document.getElementById("travellers").value
      );

    fetch("bus.json")
      .then(res => res.json())
      .then(buses => {

        const selected =
          buses.find(b => b.id === bus.id);

        if (!selected) return;

        const dateMatch =
          date === selected.departure_date;

        const seatMatch =
          travellers <= selected.seats_available;

        // ✅ SUCCESS CASE
        if (dateMatch && seatMatch) {

          let bookings =
            JSON.parse(
              localStorage.getItem("bookings")
            ) || [];

          const bookingId =
            "BUS-" + Math.floor(10000 + Math.random() * 90000);

          bookings.push({
            name,
            date,
            travellers,
            service:
              "Bus - " +
              selected.origin +
              " → " +
              selected.destination,
            busName: selected.bus_name,
            price: selected.price_bdt,
            bookingId,
            status: "Confirmed"
          });

          localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
          );

          // 🔥 ONLY SIMPLE CONFIRM MODAL
          document.getElementById("successText").innerHTML = `
            <div class="text-center">

            </div>
          `;

          successModal.showModal();

        }

        // ❌ FAILURE CASE
        else {

          const alternatives =
            buses.filter(
              item =>
                item.destination === selected.destination &&
                item.seats_available > 0
            );

          const altDiv =
            document.getElementById("alternatives");

          if (alternatives.length === 0) {
altDiv.innerHTML = `
  <div class="text-center">

    <h2 class="text-red-600 text-xl font-bold">
      Bus Not Available
    </h2>

    <p class="mt-2">
      Selected Date:
      <b>${date}</b>
    </p>

    <p class="text-red-500 mt-2">
      No alternative buses available
    </p>

  </div>
`;
          } else {

            altDiv.innerHTML = alternatives.map(item => `
              <div class="border rounded p-3 my-2">

                <h4 class="font-bold">${item.bus_name}</h4>

                <p>${item.origin} → ${item.destination}</p>

                <p>Date: ${item.departure_date}</p>
                <p>Seats: ${item.seats_available}</p>

              </div>
            `).join("");
          }

          alternativeModal.showModal();
        }
      });
  });

function goToBookings() {
  window.location.href = "booking.html";
}