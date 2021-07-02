import {microserviceData} from "../mock-data/mock-data"

function getMicroservicesData() {
  return new Promise((resolve,reject) => {
    fetch('https://www.google.com', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        resolve(microserviceData)
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