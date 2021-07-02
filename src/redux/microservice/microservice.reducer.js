import {serviceRequestType} from "../microservice/microservice.type";

const INITIAL_STATE = {
  serviceData: null,
  eventsByResource : null
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
        eventsByResource : action.payload.eventsByResource
      }
    default:
      return state
  }
}

export default microserviceReducer;
