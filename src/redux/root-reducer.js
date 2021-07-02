import { combineReducers } from "redux";

import microserviceReducer from "./microservice/microservice.reducer";

export default combineReducers(({
  microserviceData: microserviceReducer,
}))