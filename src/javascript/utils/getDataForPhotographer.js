const idPhotographer = new URLSearchParams(window.location.search).get("identifiant")

const getDataForPhotographer = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
}
getDataForPhotographer()
  .then(data => {
    let photographer = data.photographers.find((photographer) => {
      return photographer.id = idPhotographer
    })

    console.log(' getDataForPhotographer =>', photographer)
    profileDescription(photographer)
    photographerImageContainer(photographer)

    let media = data.media
    console.log('get media =>', media)
  })
  .catch(erreur => console.log("Error in get data photographer ===>", erreur))
