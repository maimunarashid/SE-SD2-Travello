fetch('package.json')
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("popular-container");

    // first 6 packages
    const popularPackages = data.packages.slice(0, 6);

    popularPackages.forEach(pkg => {

      const card = document.createElement("div");

      card.className =
      "max-w-[350px] bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0";

      card.innerHTML = `
      
        <img src="${pkg.image}"
        class="w-full h-52 object-cover">

        <div class="p-5">

          <p class="text-sm text-gray-400 mb-2">
            ${pkg.district}
          </p>

          <h3 class="text-2xl font-bold text-blue-500 mb-2">
            ${pkg.name}
          </h3>

          <p class="text-gray-500 text-sm mb-4">
            ${pkg.description.substring(0, 90)}...
          </p>

          <div class="flex justify-between items-center">

            <p class="text-orange-500 font-bold text-lg">
              ৳ ${pkg.price_per_adult_bdt}
            </p>

            <a href="packageDetail.html?id=${pkg.id}">
              <button class="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                Book Now
              </button>
            </a>

          </div>

        </div>
      `;

      container.appendChild(card);

    });

    // SCROLL BUTTONS
    const scrollLeft = document.getElementById("scrollLeft");
    const scrollRight = document.getElementById("scrollRight");

    scrollLeft.addEventListener("click", () => {
      container.scrollBy({
        left: -350,
        behavior: "smooth"
      });
    });

    scrollRight.addEventListener("click", () => {
      container.scrollBy({
        left: 350,
        behavior: "smooth"
      });
    });

  });