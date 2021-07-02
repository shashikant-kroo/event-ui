function getMicroservicesData() {
  return new Promise((resolve,reject) => {
    fetch('https://gist.githubusercontent.com/shashikant-kroo/0333752651f3e6d2cadaf8d4139e03ad/raw/51b86379482ba907cbd5bd66afc9301d1c0b79ce/microserviceData.json', {
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
