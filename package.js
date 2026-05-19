// Fetch JSON and load packages dynamically
fetch('package.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('package-container');

    data.packages.forEach(pkg => {
      // Create card element
      const card = document.createElement('div');
      card.className = "bg-white rounded-lg shadow-md flex flex-col";

      card.innerHTML = `
        <img src="${pkg.image}" alt="${pkg.name}" class="w-full h-48 object-cover">
        <div class="p-4 flex-grow flex flex-col">
          <h3 class="text-xl font-bold text-blue-500">${pkg.name}</h3>
          <p class="text-gray-500 text-sm mb-2">${pkg.district}</p>
          <p class="text-gray-700 text-sm mb-4">${pkg.description}</p>
          <p class="text-lg font-semibold text-orange-600 mb-4">৳ ${pkg.price_per_adult_bdt} per adult</p>
          <button class="w-full bg-blue-500 text-white font-semibold py-2 rounded mt-auto">
            Book Now
          </button>
        </div>
      `;

      container.appendChild(card);
    });
  })

