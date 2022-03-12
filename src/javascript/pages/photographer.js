const idPhotographer = new URLSearchParams(window.location.search).get("identifiant")
const header = document.querySelector(".header")
const photographerProfile = document.querySelector(".photographer")
const dropDown = document.querySelector(".dropDown")
const mediaContainer = document.querySelector(".mediaContainer")


const fetchPhotographer = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
}

fetchPhotographer().then((data) => {
  let selectedPhotographer = data.photographers.find(photographer => photographer.id == idPhotographer)
  let mediasPhotographer = data.media.filter(media => idPhotographer == media.photographerId)
  profileDescription(selectedPhotographer)
  dropDownFilter(selectedPhotographer)
  ListMediaPhotographer(selectedPhotographer, mediasPhotographer)
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
      alt="${selectedPhotographer.name}"
      src="./src/assets/photographersAndMedia/PhotographersPhotos/${selectedPhotographer.portrait}" 
    />
  `
}

const dropDownFilter = () => {
  dropDown.innerHTML = `    
    <p class="dropDown_label">Trier par</p>
    <div class="dropDown_list">
      <button class="dropDown_list_visible">
        Popularité <img class="dropDown_list_visible_image" src="./src/assets/images/chevron-down.png" alt="Fisheye Home page"/>
      </button>
      <div class="dropDown_list_border"></div>
      <button class="dropDown_list_hide">Date</button>
      <div class="dropDown_list_border"></div>
      <button class="dropDown_list_hide">Titre</button>
    </div>
  `
}

const ListMediaPhotographer = (selectedPhotographer, mediasPhotographer) => {
  mediasPhotographer.forEach((photographeMedia) => {
    mediaContainer.innerHTML += `
      <div class="mediaCard">
        <button class="mediaCard_link" title="${photographeMedia.title}">
          ${photographeMedia.hasOwnProperty("video") ? (
      `<video class="mediaCard_link_media" src="./src/assets/photographersAndMedia/${selectedPhotographer.name}/${photographeMedia.video}"/>`
    ) : (
      `<img class="mediaCard_link_media" src="./src/assets/photographersAndMedia/${selectedPhotographer.name}/${photographeMedia.image}" alt="${photographeMedia.image}">`
    )}
        </button>
        <div class="mediaCard_details">
          <h3 class="mediaCard_details_title">${photographeMedia.title}</h3>
          <button class="mediaCard_details_favorites" data-select="false" data-likes="${photographeMedia.likes}" type="button">
            <span class="mediaCard_details_favorites_heart">${photographeMedia.likes}</span>
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    `
  })
}
