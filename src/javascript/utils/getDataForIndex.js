const fetchData = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
}
fetchData()
  .then(data => {
    let photographers = data.photographers
    viewPhotographers(photographers)
    console.log(' get photographers =>', photographers)
  })
  .catch(erreur => console.log("Error in get data index ===>", erreur.message))
