const idPhotographer = new URLSearchParams(window.location.search).get("identifiant")
const header = document.querySelector(".header")
const photographerProfile = document.querySelector(".photographer")
const mediaContainer = document.querySelector(".mediaContainer")
const dropDownButton = document.querySelector(".dropDown_list_visible")
const currentFilter = document.querySelector(".dropDown_list_visible_current")
const dropDownImage = document.querySelector(".dropDown_list_visible_image")
const dropDownHide = document.querySelectorAll(".dropDown_list_hide")
const likeContainerPriceOneDay = document.querySelector(".likeContainer_price_oneDay")
const likesTotal = document.getElementById("likeContainer_likes_total")

let count = 0
let sorted = ""
let typeFilter = ""
let selectedPhotographer = ""
let mediasPhotographer = []

const fetchPhotographer = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
}

fetchPhotographer().then((data) => {
  selectedPhotographer = data.photographers.find(photographer => photographer.id == idPhotographer)
  mediasPhotographer = data.media.filter(media => idPhotographer == media.photographerId)
  profileDescription(selectedPhotographer)
  mediaPhotographerListWithIncrementalLikes()
  dropDownFilter()
  displayDailyPrice()
  totalLikesCalculation()
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

dropDownButton.addEventListener("click", () => {
  dropDownImage.classList.toggle("chevronUp")
  dropDownHide.forEach((element) => {
    element.classList.toggle("displayBlock")
  })
})

const dropDownFilter = () => {
  dropDownHide.forEach((element) => {
    element.addEventListener("click", (event) => {
      typeFilter = currentFilter.innerHTML
      sorted = event.currentTarget.innerHTML
      if (sorted === "Popularité") {
        mediasPhotographer.sort((a, b) => (a.likes < b.likes ? 1 : -1))
        element.innerHTML = typeFilter
        currentFilter.innerHTML = sorted
      } else if (sorted.includes("Date")) {
        mediasPhotographer.sort((a, b) => (a.date > b.date ? 1 : -1))
        element.innerHTML = typeFilter
        currentFilter.innerHTML = sorted
      } else if (sorted.includes("Titre")) {
        mediasPhotographer.sort((a, b) => (a.title > b.title ? 1 : -1))
        element.innerHTML = typeFilter
        currentFilter.innerHTML = sorted
      }
      mediaContainer.innerHTML = ""
      mediaPhotographerListWithIncrementalLikes()
    })
  })
}

// Affichage des médias-----------------------------------------------------
function mediaTypeDisplay(item) {
  if (item.hasOwnProperty("video")) {
    return `<video class="mediaCard_link_media" src="./src/assets/photographersAndMedia/${selectedPhotographer.name}/${item.video}" autoplay/>`
  } else {
    return `<img class="mediaCard_link_media" src="./src/assets/photographersAndMedia/${selectedPhotographer.name}/${item.image}" alt="${item.image}">`
  }
}

const mediaPhotographerListWithIncrementalLikes = () => {
  if (sorted === "") {
    mediasPhotographer.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  }
  mediasPhotographer.forEach((photographeMedia) => {
    mediaContainer.innerHTML += `
      <div class="mediaCard">
        <button class="mediaCard_link" title="${photographeMedia.title}" data-mediaId="${photographeMedia.id}">
          ${mediaTypeDisplay(photographeMedia)}
        </button>
        <div class="mediaCard_details">
          <h3 class="mediaCard_details_title">${photographeMedia.title}</h3>
          <button type="button" class="mediaCard_details_favorites" data-select="false" data-likes="${photographeMedia.likes}">
            <span class="mediaCard_details_favorites_likes">${photographeMedia.likes}</span>
            <img class="mediaCard_details_favorites_heart" src="./src/assets/images/redHeart.png" alt="red heart"/>
          </button>
        </div>
      </div>
    `
  })
  const buttonLikes = document.querySelectorAll(".mediaCard_details_favorites")
  buttonLikes.forEach((e) =>
    e.addEventListener("click", () => {
      if (e.dataset.select === "true") {
        e.dataset.select = "false"
        e.firstElementChild.textContent = Number(e.firstElementChild.textContent) - 1
      } else {
        e.dataset.select = "true"
        e.firstElementChild.textContent = Number(e.firstElementChild.textContent) + 1
      }
      count = 0
      totalLikesCalculation()
    })
  )
}

const displayDailyPrice = () => {
  likeContainerPriceOneDay.innerHTML = `
      ${selectedPhotographer.price} / jour
        `
}

const totalLikesCalculation = () => {
  const numberLikesByMedia = document.querySelectorAll(".mediaCard_details_favorites_likes")
  numberLikesByMedia.forEach((element) => {
    element = Number(element.innerHTML)
    count += element
    likesTotal.innerHTML = count
  })
}
