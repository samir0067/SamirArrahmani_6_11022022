const body = document.querySelector("body")

let count = 0
let sorted = ""
let typeFilter = ""
let selectedPhotographer = ""
let mediasPhotographer = []
let currentValue = 0
let tabIndex = 10

//--------------------------------------------------------------------------------------------------------//
//**************************************** GESTION DES DONNÉES *******************************************//
//--------------------------------------------------------------------------------------------------------//

const idPhotographer = new URLSearchParams(window.location.search).get("identifiant")

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
  navigateKeyboardLightbox()
})

//--------------------------------------------------------------------------------------------------------//
//**************************************** PROFIL DU PHOTOGRAPHE *****************************************//
//--------------------------------------------------------------------------------------------------------//

const header = document.querySelector(".header")
const photographerProfile = document.querySelector(".photographer_profile")
const photographerPhoto = document.querySelector(".photographer_photo")

// ----------- Affichage du logo avec header ----------------------
header.innerHTML =
  `<a href="./index.html" tabindex="1">
    <img class="header_logo" src="./src/assets/logo.svg" alt="Fisheye Home page"/>
  </a>`

// ------------ Affichage de la description du profil actuel ------------------
const profileDescription = () => {
  photographerProfile.innerHTML = `
      <h1 tabindex="2" class="photographer_profile_name">${selectedPhotographer.name}</h1>
      <h2 tabindex="3" class="photographer_profile_address">${selectedPhotographer.city}, ${selectedPhotographer.country}</h2>
      <p class="photographer_profile_description">${selectedPhotographer.tagline}</p>
  `
}

// ------------ Affichage de la photo du profil actuel ------------------
const profilePhoto = () => {
  photographerPhoto.innerHTML = `
    <img
      tabindex="6"            
      alt="${selectedPhotographer.name}"
      src="./src/assets/photographersAndMedia/PhotographersPhotos/${selectedPhotographer.portrait}" 
    />
  `
}

//--------------------------------------------------------------------------------------------------------//
//****************************************** CONTENEUR DE MÉDIA ******************************************//
//--------------------------------------------------------------------------------------------------------//

const mediaContainer = document.querySelector(".mediaContainer")

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
        <button class="mediaCard_link" tabindex="${tabIndex}" title="${photographeMedia.title}" data-tabvalue="${tabIndex}" data-id="${photographeMedia.id}">
          ${displayMediaType(photographeMedia)}
        </button>
        <div class="mediaCard_details">
          <h3 tabindex="${tabIndex}" class="mediaCard_details_title">${photographeMedia.title}</h3>
          <button tabindex="${tabIndex}" type="button" class="mediaCard_details_favorites" data-select="false" data-likes="${photographeMedia.likes}">
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

// incrementer les like dynamiquement avec au click
const incrementalLikes = () => {
  const buttonLikes = document.querySelectorAll(".mediaCard_details_favorites")
  buttonLikes.forEach((element) =>
    element.addEventListener("click", () => {
      if (element.dataset.select === "true") {
        element.dataset.select = "false"
        element.firstElementChild.textContent = Number(element.firstElementChild.innerHTML) - 1
      } else {
        element.dataset.select = "true"
        element.firstElementChild.textContent = Number(element.firstElementChild.textContent) + 1
      }
      count = 0
      totalLikesCalculation()
    })
  )
}

//--------------------------------------------------------------------------------------------------------//
//*********************************************** DROPDOWN ***********************************************//
//--------------------------------------------------------------------------------------------------------//

const dropDownButton = document.querySelector(".dropDown_list_visible")
const currentFilter = document.querySelector(".dropDown_list_visible_current")
const dropDownImage = document.querySelector(".dropDown_list_visible_image")
const dropDownHide = document.querySelectorAll(".dropDown_list_hide")

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

//--------------------------------------------------------------------------------------------------------//
//******************************************* CONTENEUR DE LIKES *****************************************//
//--------------------------------------------------------------------------------------------------------//

const likeContainerPriceOneDay = document.querySelector(".likeContainer_price_oneDay")
const likesTotal = document.getElementById("likeContainer_likes_total")

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

//--------------------------------------------------------------------------------------------------------//
//*********************************************** LIGHTBOX ***********************************************//
//--------------------------------------------------------------------------------------------------------//

const main = document.querySelector("main")
const lightbox = document.querySelector(".lightbox")
const lightboxContainerMedia = document.querySelector(".lightbox_container_media")
const endLightbox = document.querySelector(".lightbox_container_end")
const nextLightbox = document.querySelector(".lightbox_container_next")
const prevLightbox = document.querySelector(".lightbox_container_previous")

// Ouverture de la Lightbox
const openLightbox = () => {
  const cartes = document.querySelectorAll(".mediaCard_link")
  cartes.forEach((element, index) =>
    element.addEventListener("click", () => {
      currentValue = index
      mediaContainer.style.display = "none"
      lightbox.style.display = "flex"
      lightboxView(currentValue)
      const video = lightboxContainerMedia.childNodes[1]
      video.setAttribute("controls", "controls")
    })
  )
}

// Affichage Lightbox
const lightboxView = (id) => {
  lightboxContainerMedia.innerHTML = `
    ${displayMediaType(mediasPhotographer[id])}
    <figcaption>${mediasPhotographer[id].title}</figcaption>
  `
}

// Fermeture Lightbox
const closeLightbox = () => {
  mediaContainer.style.display = "flex"
  lightbox.style.display = "none"
}

endLightbox.addEventListener("click", closeLightbox)

const nextDisplay = () => {
  currentValue++
  if (currentValue === mediasPhotographer.length) {
    currentValue = 0
  }
  lightboxView(currentValue)
  const video = lightboxContainerMedia.childNodes[1]
  video.setAttribute("controls", "controls")
}

nextLightbox.addEventListener("click", nextDisplay)

const previousDisplay = () => {
  currentValue--
  if (currentValue < 0) {
    currentValue = mediasPhotographer.length - 1
  }
  lightboxView(currentValue)
  const video = lightboxContainerMedia.childNodes[1]
  video.setAttribute("controls", "controls")
}

prevLightbox.addEventListener("click", previousDisplay)

// Navigation Clavier
const navigateKeyboardLightbox = () => {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      closeLightbox()
    } else if (event.key === "ArrowLeft") {
      previousDisplay()
    } else if (event.key === "ArrowRight") {
      nextDisplay()
    }
  })
}

//--------------------------------------------------------------------------------------------------------//
//*********************************************** LA MODAL ***********************************************//
//--------------------------------------------------------------------------------------------------------//

const modal = document.querySelector(".modal")
const closeModal = document.querySelector(".modal_content_close")
const photographerName = document.getElementById("photographer_name")
const photographerContact = document.querySelector(".photographer_contact")
const form = document.querySelector("form")

const modalClosure = (event) => {
  event.preventDefault()
  body.style.overflow = "visible"
  modal.style.display = "none"
}

photographerContact.addEventListener("click", () => {
  body.style.overflow = "hidden"
  modal.style.display = "block"
  photographerName.textContent = selectedPhotographer.name
})

closeModal.addEventListener("click", (event) => {
  modalClosure(event)
})

// navigation avec le clavier
modal.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    modalClosure(event)
  }
})

//--------------------------------------------------------------------------------------------------------//
//********************************************** FORMULAIRE **********************************************//
//--------------------------------------------------------------------------------------------------------//

const first = document.getElementById("first")
const last = document.getElementById("last")
const email = document.getElementById("email")
const message = document.getElementById("message")

const errorFirst = document.getElementById("error-first")
const errorLast = document.getElementById("error-last")
const errorEmail = document.getElementById("error-email")
const errorMessage = document.getElementById("error-message")

// drapeau pour valider les champs
let firstIsValid = false
let lastIsValid = false
let emailIsValid = false
let messageIsValid = false

// Fonction permettant de vérifier les champs
function validate() {
  // firstName
  if (first.value === '') {
    submissionDenied(first, errorFirst, 'Prénom requis')
    firstIsValid = false
  } else if (first.value.length < 2) {
    submissionDenied(first, errorFirst, 'Veuillez entrer minimum 2 caractères')
    firstIsValid = false
  } else {
    submissionValidate(first, errorFirst)
    firstIsValid = true
  }

  // lastName
  if (last.value === '') {
    submissionDenied(last, errorLast, 'Nom requis')
    lastIsValid = false
  } else if (last.value.length < 2) {
    submissionDenied(last, errorLast, 'Veuillez entrer 2 caractères ou plus pour le champ du nom')
    lastIsValid = false
  } else {
    submissionValidate(last, errorLast)
    lastIsValid = true
  }

  // email
  if (email.value === '') {
    submissionDenied(email, errorEmail, 'E-mail requis')
    emailIsValid = false
  } else if (!validateEmail(email.value)) {
    submissionDenied(email, errorEmail, 'Cet email n\'est pas valide')
    emailIsValid = false
  } else {
    submissionValidate(email, errorEmail)
    emailIsValid = true
  }

  // message
  if (message.value === '') {
    submissionDenied(message, errorMessage, 'Vous devez entrer un message')
    messageIsValid = false
  } else if (message.value.length < 2) {
    submissionDenied(message, errorMessage, 'message non valide')
    messageIsValid = false
  } else {
    submissionValidate(message, errorMessage)
    messageIsValid = true
  }

  if (firstIsValid &&
    lastIsValid &&
    emailIsValid &&
    messageIsValid) {
    submissionForm()
  }
}

// Handle submission
function submissionForm() {
  modal.style.display = "none"
  form.reset()
}

// Field submission denied
function submissionDenied(field, errorField, message) {
  field.style.border = "solid 2px #901c1c"
  errorField.classList.add('errorField')
  errorField.innerHTML = message
}

// Field submission validate
function submissionValidate(field, errorField) {
  field.style.border = "solid 2px limegreen"
  errorField.classList.remove('errorField')
  errorField.innerHTML = ''
}

// Validation of the email field
function validateEmail(email) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}

// récupération des entrées à la soumission
form.addEventListener("submit", function(event) {
  event.preventDefault()

  console.log(`Nom => ${form.elements['last'].value} Prénom => ${form.elements['first'].value}`)
  console.log(`Email => ${form.elements['email'].value} Message => ${form.elements['message'].value}`)

  validate()
})
