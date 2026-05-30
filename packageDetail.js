// Get package id
const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get('id');

fetch('package.json')
  .then(res => res.json())
  .then(data => {

   const pkg = data.packages.find(p => p.id == packageId);

if (!pkg) {
  alert("Package not found!");
  return;
}

    // ===== FILL DATA =====
    document.getElementById('package-name').textContent = pkg.name;
    document.getElementById('package-description').textContent = pkg.description;
    document.getElementById('package-price').textContent =
      `৳ ${pkg.price_per_adult_bdt} per person`;

    document.getElementById('package-image').src = pkg.image;

    document.getElementById('package-overview').textContent =
      pkg.overview || "No overview available.";

    document.getElementById('package-include').innerHTML =
      pkg.includes.map(i => `<li>${i}</li>`).join("");

    document.getElementById('package-exclude').innerHTML =
      pkg.excludes.map(i => `<li>${i}</li>`).join("");

    // document.getElementById('package-itinerary').textContent =
    //   JSON.stringify(pkg.itinerary, null, 2);

    // document.getElementById('package-food').textContent =
    //   JSON.stringify(pkg.food, null, 2);

    // document.getElementById('package-hotel').textContent =
    //   JSON.stringify(pkg.hotels, null, 2);

    // replace 
    // ===== ITINERARY =====
let itineraryHTML = "";

for (const day in pkg.itinerary) {

  itineraryHTML += `
  
    <div class="mb-4 p-4 bg-gray-50 rounded-lg">

      <h4 class="font-bold text-blue-500 text-lg mb-2">
        ${day.toUpperCase()} - ${pkg.itinerary[day].title}
      </h4>

      <p class="text-gray-600">
        ${pkg.itinerary[day].details}
      </p>

    </div>
  `;
}

document.getElementById('package-itinerary').innerHTML =
  itineraryHTML;


// ===== FOOD =====
let foodHTML = `
  <ul class="list-disc pl-5 text-gray-600 space-y-2">
`;

for (const item in pkg.food) {

  foodHTML += `
    <li>
      <span class="font-semibold capitalize">
        ${item}:
      </span>

      ${pkg.food[item]}
    </li>
  `;
}

foodHTML += `</ul>`;

document.getElementById('package-food').innerHTML =
  foodHTML;


// ===== HOTEL =====
let hotelHTML = "";

pkg.hotels.forEach(hotel => {

  hotelHTML += `
  
    <div class="p-4 bg-gray-50 rounded-lg mb-4">

      <h4 class="text-xl font-bold text-blue-500 mb-2">
        ${hotel.name}
      </h4>

      <p class="text-gray-600 mb-2">
        Room Type: ${hotel.type}
      </p>

      <p class="font-semibold text-gray-700 mb-2">
        Amenities:
      </p>

      <ul class="list-disc pl-5 text-gray-600">
        ${hotel.amenities.map(a => `<li>${a}</li>`).join("")}
      </ul>

    </div>
  `;
});

document.getElementById('package-hotel').innerHTML =
  hotelHTML;









    // ===== PRICE CALC =====
    const peopleInput = document.getElementById('people');

    peopleInput.addEventListener('input', () => {
      const total = pkg.price_per_adult_bdt * peopleInput.value;

      document.getElementById('total-price').textContent =
        `Total: ৳ ${total}`;
    });

    // ===== BOOKING SYSTEM =====
    const confirmBtn = document.getElementById("confirmBooking");
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.getElementById("closeModal");

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const people = document.getElementById("people").value;
  const date = document.getElementById("date").value;

  if (!people || !date) {
    alert("Please fill all fields");
    return;
  }

  const booking = {
    id: pkg.id,
    name: pkg.name,
    image: pkg.image,
    price: pkg.price_per_adult_bdt,
    people: Number(people),
    date,
    total: pkg.price_per_adult_bdt * people,
    status: "pending"
  };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.push(booking);

  localStorage.setItem("bookings", JSON.stringify(bookings));

  // ❌ REMOVE ALERT (optional)
  // alert("Booking Confirmed!");

  // ✅ ONLY MODAL
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});




closeBtn.addEventListener("click", () => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");

  window.location.href = "booking.html";
});

  });