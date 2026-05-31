// previous code
// document.addEventListener("DOMContentLoaded", function () {

//   const list = document.getElementById("list");

//   let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

//   function saveBookings() {
//     localStorage.setItem("bookings", JSON.stringify(bookings));
//   }

//   function render() {
//     list.innerHTML = "";

//     if (bookings.length === 0) {
//       list.innerHTML = "<p>No bookings found</p>";
//       return;
//     }

//     bookings.forEach((b, index) => {
//       const div = document.createElement("div");

//       div.className = "p-8 border border-gray-300 rounded shadow bg-white";

//       div.innerHTML = `
//         <h3 class="text-xl font-bold text-blue-400 mb-2">${b.name}</h3>
//         <p class="text-gray-600 font-bold">Date: ${b.date}</p>
//         <p class="text-gray-600 font-bold">Service: ${b.service}</p>
//         <p class="text-gray-600 font-bold">Status: ${b.status || "Pending"}</p>

//         <div class="flex gap-4 mt-8">
//           <button onclick="payNow(${index})" class="btn bg-blue-500 hover:bg-blue-900 text-white p-5">Pay</button>
//           <button onclick="cancelBooking(${index})" class="btn bg-red-500 hover:bg-red-600 text-white btn-md rounded">Cancel</button>
//         </div>
//       `;

//       list.appendChild(div);
//     });
//   }

//   window.payNow = function(index) {
//     bookings[index].status = "Paid";
//     alert("Payment successful (demo)");
//     saveBookings();
//     render();
//   };

//   window.cancelBooking = function(index) {
//     bookings.splice(index, 1);
//     saveBookings();
//     render();
//   };

//   render();

// });






document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("list");

  // Load all confirmed bookings (hotel + package)
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  function saveBookings() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }

  function render() {
    list.innerHTML = "";

    if (bookings.length === 0) {
      list.innerHTML = "<p>No bookings found</p>";
      return;
    }

    bookings.forEach((b, index) => {
      const div = document.createElement("div");
      div.className = "p-8 border border-gray-300 rounded shadow bg-white";

      div.innerHTML = `
        <h3 class="text-xl font-bold text-blue-400 mb-2">${b.name}</h3>
        <p class="text-gray-600 font-bold">Date: ${b.date}</p>
        <p class="text-gray-600 font-bold">Service: ${b.service}</p>
        <p class="text-gray-600 font-bold">Status: ${b.status || "Pending"}</p>

        <div class="flex gap-4 mt-8">
          <button onclick="payNow(${index})" class="btn bg-blue-500 hover:bg-blue-900 text-white p-5">Pay</button>
          <button onclick="cancelBooking(${index})" class="btn bg-red-500 hover:bg-red-600 text-white btn-md rounded">Cancel</button>
        </div>
      `;

      list.appendChild(div);
    });
  }

  window.payNow = function (index) {
    bookings[index].status = "Paid";
    alert("Payment successful (demo)");
    saveBookings();
    render();
  };

  window.cancelBooking = function (index) {
    bookings.splice(index, 1);
    saveBookings();
    render();
  };

  render();
});
