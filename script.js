// Function to load external content dynamically
function loadContent(page) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("content-area").innerHTML = data;
      // After loading content, check for sections to enable scrollspy
      setupScrollSpy();
    })
    .catch((error) => console.error("Error loading content:", error));
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
  });

  // Close menu when overlay is clicked
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Close menu when a link is clicked (on mobile)
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
      }
    });
  });
}

// Setup scroll spy functionality
function setupScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".sidebar a");

  if (sections.length > 0) {
    window.onscroll = () => {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (
          link.getAttribute("href") &&
          link.getAttribute("href").includes(current)
        ) {
          link.classList.add("active");
        }
      });
    };
  }
}

// Handle window resize
function handleResize() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".overlay");

  if (window.innerWidth > 900) {
    sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  }
}

// Initialize everything when the page loads
window.onload = () => {
  // Load initial content
  loadContent("howitstarted.html");

  // Setup mobile menu
  setupMobileMenu();

  // Handle window resize
  window.addEventListener("resize", handleResize);
};
