import {microserviceData} from "../mock-data/mock-data"

function getMicroservicesData() {
  console.log("fetching data")
  return new Promise((resolve,reject) => {
    fetch('https://gist.githubusercontent.com/shashikant-kroo/0333752651f3e6d2cadaf8d4139e03ad/raw/9655e1c8127b3287466af6ee3524dfd45e06f222/microserviceData.json', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        console.log("getched data :", result)
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