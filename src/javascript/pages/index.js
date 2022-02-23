const header = document.querySelector(".header")
const main = document.querySelector(".main")

header.innerHTML =
  `<a href="./index.html" tabindex="1">
      <img class="header_logo" src="./src/assets/images/logo.svg" alt="Fisheye Home page"/>
    </a>
    <h1 class="header_title" tabindex="2">Nos Photographes</h1>`

const viewPhotographers = (photographersTable) => {
  let tabIndex = 3
  photographersTable.forEach((photographe) => {

    main.innerHTML +=
      `<div class="card">
        <a role="button" tabindex=${tabIndex++} class="card_buttonContent" aria-label="portrait de ${photographe.name}" href="./photographer.html?nom=${photographe.name}&identifiant=${photographe.id}">
          <img src="./src/assets/photographers/Photographers ID Photos/${photographe.portrait}" />
          <h2 class="card_title">${photographe.name}</h2>
        </a>
        <div class="card_info" tabindex=${tabIndex++}>
          <h3 class="card_info_title">${photographe.city}, ${photographe.country}</h3>
          <p class="card_info_subTitle"> ${photographe.tagline}</p>
          <p class="card_info_price">${photographe.price}€/jour</p>
        </div>
      </div>`
  })
}
