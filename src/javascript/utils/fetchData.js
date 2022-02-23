const fetchData = async() => {
  return await fetch("photographers.json")
    .then((response) => response.json())
    .then((data) => {
      let photographes = data.photographers
      viewPhotographers(photographes)
    })
}
fetchData()
