// Function to load external content dynamically
function loadContent(page) {
  // Store the current page in localStorage
  localStorage.setItem("currentPage", page);

  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("content-area").innerHTML = data;

      // Update active state in sidebar
      updateActiveLink(page);
    })
    .catch((error) => console.error("Error loading content:", error));
}

// Update active link in sidebar
function updateActiveLink(page) {
  const links = document.querySelectorAll(".sidebar a");
  links.forEach((link) => {
    link.classList.remove("active");
    if (
      link.getAttribute("onclick") &&
      link.getAttribute("onclick").includes(page)
    ) {
      link.classList.add("active");
    }
  });
}

// Setup mobile menu functionality
function setupMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const menuLinks = document.querySelectorAll(".sidebar a");

  // Create overlay element for mobile
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Toggle menu
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu when overlay is clicked
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.classList.remove("active");
  });

  // Close menu when a link is clicked (on mobile)
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  });
}

// Handle window resize
function handleResize() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".overlay");
  const menuToggle = document.getElementById("menu-toggle");

  if (window.innerWidth > 900) {
    sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    if (menuToggle) menuToggle.classList.remove("active");
  }
}

// Initialize everything when the page loads
window.onload = () => {
  // Check if there's a stored page in localStorage
  const storedPage = localStorage.getItem("currentPage");

  // Load stored page or default to "howitstarted.html"
  if (storedPage) {
    loadContent(storedPage);
  } else {
    loadContent("howitstarted.html");
  }

  // Setup mobile menu
  setupMobileMenu();

  // Handle window resize
  window.addEventListener("resize", handleResize);
};
