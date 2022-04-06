const idPhotographer = new URLSearchParams(window.location.search).get("identifiant")
const body = document.querySelector("body")
const header = document.querySelector(".header")
const photographerProfile = document.querySelector(".photographer_profile")
const photographerPhoto = document.querySelector(".photographer_photo")
const mediaContainer = document.querySelector(".mediaContainer")
const dropDownButton = document.querySelector(".dropDown_list_visible")
const currentFilter = document.querySelector(".dropDown_list_visible_current")
const dropDownImage = document.querySelector(".dropDown_list_visible_image")
const dropDownHide = document.querySelectorAll(".dropDown_list_hide")
const likeContainerPriceOneDay = document.querySelector(".likeContainer_price_oneDay")
const likesTotal = document.getElementById("likeContainer_likes_total")
const lightbox = document.querySelector(".lightbox")
const lightboxContainer = document.querySelector(".lightbox_container_media")
const endLightbox = document.querySelector(".lightbox_container_end")
const nextLightbox = document.querySelector(".lightbox_container_next")
const prevLightbox = document.querySelector(".lightbox_container_previous")
const target = document.getElementsByClassName("target")
const modal = document.querySelector(".modal")
const photographerName = document.getElementById("photographer_name")
const photographerContact = document.querySelector(".photographer_contact")
const closeModal = document.querySelector(".modal_content_close")
const focusModal = document.getElementsByClassName("focus-modal")
const form = document.querySelector("form")

let count = 0
let sorted = ""
let typeFilter = ""
let selectedPhotographer = ""
let mediasPhotographer = []
let currentIndex = 0
let firstTargetLightbox = target[0]
let lastTargetLightbox = target[target.length - 1]
let firstFocusModal = focusModal[0]
let lastFocusModal = focusModal[focusModal.length - 1]

// ------------ Recuperation et traitement des données depuis le fichier photographers.json ------------
const fetchPhotographer = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
}
fetchPhotographer().then((data) => {
  selectedPhotographer = data.photographers.find(photographer => photographer.id == idPhotographer)
  mediasPhotographer = data.media.filter(media => idPhotographer == media.photographerId)
  profileDescription()
  profilePhoto()
  dropDownFilter()
  mediaPhotographerList()
  displayPriceOneDay()
  totalLikesCalculation()
})

// ----------- Affichage du logo avec header ----------------------
header.innerHTML =
  `<a href="./index.html" tabindex="1">
    <img class="header_logo" src="./src/assets/logo.svg" alt="Fisheye Home page"/>
  </a>`

// ------------ Affichage de la description du profil actuel ------------------
const profileDescription = () => {
  photographerProfile.innerHTML = `
      <h1 class="photographer_profile_name">${selectedPhotographer.name}</h1>
      <h2 class="photographer_profile_address">${selectedPhotographer.city}, ${selectedPhotographer.country}</h2>
      <p class="photographer_profile_description">${selectedPhotographer.tagline}</p>
  `
}

// ------------ Affichage de la photo du profil actuel ------------------
const profilePhoto = () => {
  photographerPhoto.innerHTML = `
    <img            
      alt="${selectedPhotographer.name}"
      src="./src/assets/photographersAndMedia/PhotographersPhotos/${selectedPhotographer.portrait}" 
    />
  `
}

// Écoutez les événements au moment du click du bouton déroulant.
dropDownButton.addEventListener("click", () => {
  dropDownImage.classList.toggle("chevronUp")
  dropDownHide.forEach((element) => {
    element.classList.toggle("displayBlock")
  })
})

// définir une boucle pour trier les médias en fonction du filtre actuel
const dropDownFilter = () => {
  dropDownHide.forEach((element) => {
    element.addEventListener("click", (event) => {
      typeFilter = currentFilter.innerHTML
      sorted = event.currentTarget.innerHTML
      if (sorted.includes("Popularité")) {
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
      mediaPhotographerList()
    })
  })
}

// incrementer les like dynamiquement avec au click
const incrementalLikes = () => {
  const buttonLikes = document.querySelectorAll(".mediaCard_details_favorites")
  buttonLikes.forEach((e) =>
    e.addEventListener("click", () => {
      if (e.dataset.select === "true") {
        e.dataset.select = "false"
        e.firstElementChild.textContent = Number(e.firstElementChild.innerHTML) - 1
      } else {
        e.dataset.select = "true"
        e.firstElementChild.textContent = Number(e.firstElementChild.textContent) + 1
      }
      count = 0
      totalLikesCalculation()
    })
  )
}

// afficher la balise correspondent au type de média
const displayMediaType = (item) => {
  if (item.hasOwnProperty("video")) {
    return `<video class="mediaCard_link_media" src="./src/assets/photographersAndMedia/${selectedPhotographer.name}/${item.video}" autoplay/>`
  } else {
    return `<img class="mediaCard_link_media" src="./src/assets/photographersAndMedia/${selectedPhotographer.name}/${item.image}" alt="${item.image}">`
  }
}

// afficher la liste des médias en fonction du photographe actuel
const mediaPhotographerList = () => {
  if (sorted === "") {
    mediasPhotographer.sort((a, b) => (a.likes < b.likes ? 1 : -1))
  }
  mediasPhotographer.forEach((photographeMedia) => {
    mediaContainer.innerHTML += `
      <div class="mediaCard">
        <button class="mediaCard_link" title="${photographeMedia.title}" data-id="${photographeMedia.id}">
          ${displayMediaType(photographeMedia)}
        </button>
        <div class="mediaCard_details">
          <h3 class="mediaCard_details_title">${photographeMedia.title}</h3>
          <button type="button" class="mediaCard_details_favorites" data-select="false" data-likes="${photographeMedia.likes}">
            <span class="mediaCard_details_favorites_likes">${photographeMedia.likes}</span>
            <img class="mediaCard_details_favorites_heart" src="./src/assets/redHeart.png" alt="red heart"/>
          </button>
        </div>
      </div>
    `
  })
  openLightbox()
  incrementalLikes()
}

// affichage du tarif journalier du photographe actuel
const displayPriceOneDay = () => likeContainerPriceOneDay.innerHTML = `${selectedPhotographer.price} / jour`

// affichage total des likes du photographe actuel
const totalLikesCalculation = () => {
  const numberLikesByMedia = document.querySelectorAll(".mediaCard_details_favorites_likes")
  numberLikesByMedia.forEach((element) => {
    element = Number(element.innerHTML)
    count += element
    likesTotal.innerHTML = count
  })
}

// Ouverture de la Lightbox
const openLightbox = () => {
  firstTargetLightbox.focus()
  const cartes = document.querySelectorAll(".mediaCard_link")
  cartes.forEach((carte, index) =>
    carte.addEventListener("click", () => {
      currentIndex = index
      lightbox.style.display = "flex"
      lightbox.setAttribute
      lightboxView(currentIndex)
      const video = lightboxContainer.childNodes[1]
      video.setAttribute("controls", "controls")
    })
  )
}

// Affichage Lightbox
const lightboxView = (id) => {
  lightboxContainer.innerHTML = `
    ${displayMediaType(mediasPhotographer[id])}
    <figcaption>${mediasPhotographer[id].title}</figcaption>
  `
}

// Fermeture Lightbox
const closeLightbox = () => {
  lightbox.style.display = "none"
}
endLightbox.addEventListener("click", closeLightbox)

const nextDisplay = () => {
  currentIndex++
  if (currentIndex === mediasPhotographer.length) {
    currentIndex = 0
  }
  lightboxView(currentIndex)
  const video = lightboxContainer.childNodes[1]
  video.setAttribute("controls", "controls")
}
nextLightbox.addEventListener("click", nextDisplay)

const previousDisplay = () => {
  currentIndex--
  if (currentIndex < 0) {
    currentIndex = mediasPhotographer.length - 1
  }
  lightboxView(currentIndex)
  const video = lightboxContainer.childNodes[1]
  video.setAttribute("controls", "controls")
}
prevLightbox.addEventListener("click", previousDisplay)

// Navigation Clavier
const navigateKeyboardLightbox = () => {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      closeLightbox()
    } else if (e.key === "ArrowLeft") {
      previousDisplay()
    } else if (e.key === "ArrowRight") {
      nextDisplay()
    }
  })
}
navigateKeyboardLightbox()

// Navigation avec la touche tab
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === firstTargetLightbox) {
        e.preventDefault()
        lastTargetLightbox.focus()
      }
    } else {
      if (document.activeElement === lastTargetLightbox) {
        e.preventDefault()
        firstTargetLightbox.focus()
      }
    }
  }
})

// La Modal
photographerContact.addEventListener("click", () => {
  body.style.overflow = "hidden"
  modal.style.display = "block"
  firstFocusModal.focus()
  photographerName.textContent = selectedPhotographer.name
})

const modalClosure = (e) => {
  e.preventDefault()
  body.style.overflow = "visible"
  modal.style.display = "none"
}

closeModal.addEventListener("click", (e) => {
  modalClosure(e)
})

// navigation avec la touche tab
modal.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusModal) {
        e.preventDefault()
        lastFocusModal.focus()
      }
    } else {
      if (document.activeElement === lastFocusModal) {
        e.preventDefault()
        firstFocusModal.focus()
      }
    }
  }
  if (e.key === "Escape" || e.key === "Esc") {
    modalClosure(e)
  }
})

// récupération des entrées à la soumission
form.addEventListener("submit", e => {
  e.preventDefault()
  console.log(`Nom => ${form.elements['last'].value} Prénom => ${form.elements['first'].value}`)
  console.log(`Email => ${form.elements['email'].value} Message => ${form.elements['message'].value}`)
  form.reset()
})
