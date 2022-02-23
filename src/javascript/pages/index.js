const header = document.querySelector(".header")
const main = document.querySelector(".main")

header.innerHTML =
  `<a href="../../../index.html">
      <img class="header_logo" src="./src/assets/images/logo.svg" alt="image du logo fisheye"/>
    </a>
    <h1 class="header_title">Nos Photographes</h1>`

const viewPhotographers = (photographersTable) => {
  photographersTable.forEach((photographe) => {
    main.innerHTML +=
      `<div class="card">
        <a role="button" class="card_buttonContent"  href="./photographer.html?nom=${photographe.name}&identifiant=${photographe.id}">
          <img src="./src/assets/photographers/Photographers ID Photos/${photographe.portrait}" alt="portrait de ${photographe.name}" />
          <h2 class="card_title">${photographe.name}</h2>
        </a>
        <div class="card_info">
          <h3 class="card_info_title">${photographe.city}, ${photographe.country}</h3>
          <p class="card_info_subTitle"> ${photographe.tagline}</p>
          <p class="card_info_price" aria-label="${photographe.price}€ par jour">${photographe.price}€/jour</p>
        </div>
      </div>`
  })
}
