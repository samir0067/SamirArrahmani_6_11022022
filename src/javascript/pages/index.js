const header = document.querySelector(".header")
const main = document.querySelector(".main")

const fetchIndex = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
}

fetchIndex()
  .then(data => {
    let photographers = data.photographers

    console.log(' fetch photographers =>', photographers)

    viewPhotographers(photographers)
  })
  .catch(erreur => console.log("Error fetch index ===>", erreur.message))

header.innerHTML =
  `<a href="./index.html" tabindex="1">
    <img class="header_logo" src="./src/assets/logo.svg" alt="Fisheye Home page"/>
  </a>
  <h1 class="header_title" tabindex="2">Nos Photographes</h1>`

const viewPhotographers = (photographers) => {
  let tabIndex = 3
  photographers.forEach((photographer) => {
    main.innerHTML +=
      `<div class="card">
        <a 
          role="button" 
          tabindex=${tabIndex++} 
          class="card_imageContent" 
          aria-label="portrait de ${photographer.name}" 
          href="./photographer.html?identifiant=${photographer.id}"
        >
          <img 
            src="./src/assets/photographersAndMedia/PhotographersPhotos/${photographer.portrait}" 
            alt="photo de ${photographer.name}"
          />
          <h2>${photographer.name}</h2>
        </a>
        <div class="card_info" tabindex=${tabIndex++}>
          <h3 class="card_info_title">${photographer.city}, ${photographer.country}</h3>
          <p class="card_info_description"> ${photographer.tagline}</p>
          <p class="card_info_price">${photographer.price}€/jour</p>
        </div>
      </div>`
  })
}
