// Get the 'type' parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type') || 'president'; // Default to 'president' if no type parameter
// Store the type in localStorage
localStorage.setItem('type', type);

// Loop through 14 images and set their CSS properties
for (let i = 1; i <= 14; i++) {
    const imagePath = `url("../collections/${type}/${i}.png")`;
    document.documentElement.style.setProperty(`--image-${i}-path`, imagePath);
}