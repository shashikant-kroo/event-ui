import {serviceRequestType} from "../microservice/microservice.type";

const INITIAL_STATE = {
  serviceData: null
}

const microserviceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case serviceRequestType.FETCH_SERVICE_RESOURCES_EVENTS:
      console.log("action :", action)
      return {
        ...state,
        serviceData: action.payload
      }

    case "MICROSERVICE_FETCH_SUCCEEDED":
      console.log("comes here")
      return {
        ...state,
        serviceData: action.payload
      }
    default:
      return state
  }
}

export default microserviceReducer;