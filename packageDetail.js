// Scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Show Overview only
function showSection(id) {
  document.querySelectorAll('#overview, #include, #exclude, #itinerary, #food, #hotel')
    .forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Get package id from URL
const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get('id');

// Load package data
fetch('package.json')
  .then(res => res.json())
  .then(data => {
    const pkg = data.packages.find(p => p.id == packageId);

    if (pkg) {
      document.getElementById('package-name').textContent = pkg.name;
      document.getElementById('package-description').textContent = pkg.description;
      document.getElementById('package-price').textContent = `৳ ${pkg.price_per_adult_bdt} per person`;
      document.getElementById('package-image').src = pkg.image;

      document.getElementById('package-overview').textContent = pkg.overview || "No overview available.";
      document.getElementById('package-include').textContent = pkg.include || "Not Included.";
      document.getElementById('package-exclude').textContent = pkg.exclude || "Not Mentioned.";
      document.getElementById('package-itinerary').textContent = pkg.itinerary || "No itinerary available.";
      document.getElementById('package-food').textContent = pkg.food || "Food not included.";
      document.getElementById('package-hotel').textContent = pkg.hotel || "Hotel not included.";

      // Price calculation
      const peopleInput = document.getElementById('people');
      peopleInput.addEventListener('input', () => {
        const total = pkg.price_per_adult_bdt * peopleInput.value;
        document.getElementById('total-price').textContent = `Total: ৳ ${total}`;
      });
    }
  });
