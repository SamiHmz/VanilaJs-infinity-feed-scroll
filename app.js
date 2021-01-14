// DOM Elements
const imagesContainer = document.getElementById("images-container");
const loader = document.getElementById("loader");
// Unsplash api
const apiKey = `dey9XH8NH0RGVX-I4N8uMXhl5lXxDELqPJHR-nafIbk`;
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
var pictures = [];

// functions

function imagesLoaded() {
  loader.hidden = true;
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    pictures = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function setPhotos() {
  loader.hidden = false;
  await getPhotos();

  for (var i = 0; i < pictures.length; i++) {
    const img = document.createElement("img");
    img.src = pictures[i].urls.regular;
    if (i === pictures.length - 1) img.addEventListener("load", imagesLoaded);
    imagesContainer.appendChild(img);
  }
}

function handllScroll() {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    loader.hidden === true
  )
    setPhotos();
}
// Event Listners
window.addEventListener("scroll", handllScroll);
// On Load

setPhotos();
