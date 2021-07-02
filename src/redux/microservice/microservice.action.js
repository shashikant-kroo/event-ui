import {serviceRequestType} from "./microservice.type";

export const fetchMicroserviceData = () => ({
  type: serviceRequestType.FETCH_SERVICE_RESOURCES_EVENTS
})

