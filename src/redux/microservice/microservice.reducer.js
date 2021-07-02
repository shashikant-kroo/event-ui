import {serviceRequestType} from "../microservice/microservice.type";

const INITIAL_STATE = {
  serviceData: null,
  resourceServiceMap : null
}

const extractResources = (payload) => {
  const entries = Object.entries(payload);
  const resources = []
  entries.forEach(entry => {
    resources.push(Object.keys(entry[1].projections))
  })

  return resources
}

const createResourceToServiceMap =(payload) => {
  const entries = Object.entries(payload);
  const resourceServiceMap = {}
  entries.forEach(entry => {
    const serviceName = entry[0]
    const resourcesForService = Object.keys(entry[1].projections)
    resourcesForService.forEach(resource => resourceServiceMap[resource] = serviceName)
  })

  return resourceServiceMap
}

const microserviceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case serviceRequestType.FETCH_SERVICE_RESOURCES_EVENTS:
      return {
        ...state
      }

    case "MICROSERVICE_FETCH_SUCCEEDED":
      return {
        ...state,
        serviceData: action.payload,
        resourceServiceMap : createResourceToServiceMap(action.payload)
      }
    default:
      return state
  }
}

export default microserviceReducer;
