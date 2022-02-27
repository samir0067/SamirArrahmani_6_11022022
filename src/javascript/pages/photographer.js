const header = document.querySelector(".header")
const photographerProfile = document.querySelector(".photographer_profile")
const photographerImage = document.querySelector(".photographer_imageContainer")

header.innerHTML =
  `<a href="./index.html" tabindex="1">
    <img class="header_logo" src="./src/assets/images/logo.svg" alt="Fisheye Home page"/>
  </a>`

const profileDescription = (photographer) => {
  photographerProfile.innerHTML =
    `<h1 class="photographer_profile_name">${photographer.name}</h1>
    <h2 class="photographer_profile_address">${photographer.city}, ${photographer.country}</h2>
    <p class="photographer_profile_description">${photographer.tagline}</p>`
}

const photographerImageContainer = (photographer) => {
  photographerImage.innerHTML =
    `<img src="./src/assets/photographers/Photographers ID Photos/${photographer.portrait}" alt="${photographer.name}"/>`
}
