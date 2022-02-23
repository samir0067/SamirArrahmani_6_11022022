const main = document.querySelector(".main")

const viewPhotographers = (photographersTable) => {
  photographersTable.forEach((photographe) => {
    main.innerHTML +=
      `<div class="card">
        <a role="button" class="card_buttonContent"  href="./photographer.html?id=${photographe.id}&name=${photographe.name}">
          <img src="./src/assets/photographers/Photographers ID Photos/${photographe.portrait}" alt="portrait ${photographe.name}" />
          <h2 class="card_title">${photographe.name}</h2>
        </a>
        <div class="card_info">
          <h3 class="card_info_title">${photographe.city}, ${photographe.country}</h3>
          <p class="card_info_subTitle"> ${photographe.tagline}</p>
          <p class="card_info_prix" aria-label="${photographe.price}€ par jour">${photographe.price}€/jour</p>
        </div>
      </div>
      `
  })
}
