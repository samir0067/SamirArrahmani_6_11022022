const openingData = () => {
  return fetch('../data/photographers.json')
    .then(response => response.json())
    .then(data => {
      console.log('openingData ==>', data)
    })
    .catch(error => {
      console.log('error openingData ==>', error)
    })
}
