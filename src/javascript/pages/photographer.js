const idPhotographer = new URLSearchParams(window.location.search).get("identifiant")
const header = document.querySelector(".header")
const photographerProfile = document.querySelector(".photographer")
const mediaContainer = document.querySelector(".mediaContainer")
const dropDownButton = document.querySelector(".dropDown_list_visible")
const dropDownImage = document.querySelector(".dropDown_list_visible_image")
const dropDownHide = document.querySelectorAll(".dropDown_list_hide")

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
  incrementationLike()
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
}


const calculTotalLike = () => {
  const nombreDeLikes = document.querySelectorAll(".nombres-de-likes")
  nombreDeLikes.forEach((element) => {
    element = Number(element.textContent)
    count += element
    totalLikes.textContent = count
  })
}

const ajoutLike = (like) => {
  if (like.dataset.select == "true") {
    like.dataset.select = "false"
    like.childNodes[1].textContent = Number(like.childNodes[1].textContent) - 1
    like.childNodes[2].classList.remove("remplissage")
  } else {
    like.dataset.select = "true"
    like.childNodes[1].textContent = Number(like.childNodes[1].textContent) + 1
    like.childNodes[2].classList.add("remplissage")
  }
}

const incrementationLike = () => {
  const likes = document.querySelectorAll(".carte__infos__favs")
  likes.forEach((element) =>
    element.addEventListener("click", () => {
      ajoutLike(element)
      count = 0
      calculTotalLike()
    })
  )
}

const ListMediaPhotographer = (selectedPhotographer, mediasPhotographer) => {
  let trie = ""
  if (trie === "") {
    mediasPhotographer.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  }
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
