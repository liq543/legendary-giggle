
//vars for main (top) nav items
var navHomeBtn = document.getElementById("homeBtn");

// Event listeners for Main navbar
navHomeBtn.addEventListener('click', () => {
  if (window.location.href.endsWith('index.html')) {
  window.location.href ='index.html';
  } else {
      window.location.href = './index.html';
  }
});

