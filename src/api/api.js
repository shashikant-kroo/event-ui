function getMicroservicesData() {
  return new Promise((resolve,reject) => {
    fetch('https://gist.githubusercontent.com/shashikant-kroo/0333752651f3e6d2cadaf8d4139e03ad/raw/6b65149345b86694ad8a899ffcbd97383739d783/microserviceData.json', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error)
      });
  })
}

export {
  getMicroservicesData
}
