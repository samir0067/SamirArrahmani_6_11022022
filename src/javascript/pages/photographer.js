const header = document.querySelector(".header")
const photographerProfile = document.querySelector(".photographer")

const idPhotographer = new URLSearchParams(window.location.search).get("identifiant")


const fetchPhotographer = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
}

fetchPhotographer().then((data) => {
  let selectedPhotographer = data.photographers.find(photographer => photographer.id == idPhotographer)
  let photographeMedias = data.media.filter(media => idPhotographer == media.photographerId)

  console.log('fetch selectedPhotographer ==>', selectedPhotographer)
  console.log('fetch photographeMedias ==>', photographeMedias)

  profileDescription(selectedPhotographer)
})

header.innerHTML =
  `<a href="./index.html" tabindex="1">
    <img class="header_logo" src="./src/assets/images/logo.svg" alt="Fisheye Home page"/>
  </a>`

const profileDescription = (selectedPhotographer) => {
  photographerProfile.innerHTML = `
    <div class="photographer_profile">
      <h1 class="photographer_profile_name">${selectedPhotographer.name}</h1>
      <h2 class="photographer_profile_address">${selectedPhotographer.city}, ${selectedPhotographer.country}</h2>
      <p class="photographer_profile_description">${selectedPhotographer.tagline}</p>
    </div>
    <button class="photographer_contact">Contactez-moi</button>
    <img 
      src="./src/assets/photographers/Photographers ID Photos/${selectedPhotographer.portrait}" 
      alt="${selectedPhotographer.name}"
    />`
}
