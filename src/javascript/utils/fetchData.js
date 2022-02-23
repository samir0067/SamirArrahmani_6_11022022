const fetchData = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
}
fetchData()
  .then(data => {
    console.log('données récupérées =>', data)
    let photographes = data.photographers
    viewPhotographers(photographes)
  })
  .catch(erreur => console.log("Erreur dans la récupération des données =>", erreur.message))
