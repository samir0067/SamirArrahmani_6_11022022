const openingData = () => {
  return fetch('photographers.json')
    .then(response => response.json())
}

openingData()
  .then(data => {
    console.log('data ==>', data)
    return data
  })
  .catch(error => console.log('error =>', error))
