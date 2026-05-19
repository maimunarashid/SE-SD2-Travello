// Fetch JSON and load packages dynamically
fetch('package.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('package-container');

    data.packages.forEach(pkg => {
      // Create card element
      const card = document.createElement('div');
      card.className = "bg-white rounded-lg shadow-md flex flex-col h-full justify-between";

      card.innerHTML = `
        <img src="${pkg.image}" alt="${pkg.name}" class="w-full h-50 object-cover rounded-t-lg">
        <div class="p-3 flex flex-col justify-between">
          <h3 class="text-xl font-bold text-blue-500">${pkg.name}</h3>
          <p class="text-gray-500 text-sm mb-2">${pkg.district}</p>
          <p class="text-gray-700 text-sm mb-4">${pkg.description}</p>
          <p class="text-lg font-semibold text-orange-600 mb-4">৳ ${pkg.price_per_adult_bdt} per person</p>
          <a href="packageDetail.html?id=${pkg.id}"><button class="w-full bg-blue-500 text-white font-semibold py-2 rounded mt-auto">
            Book Now
          </button></a>
        </div>
      `;

      container.appendChild(card);
    });
  })

