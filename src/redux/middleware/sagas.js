import {call, put, takeEvery} from 'redux-saga/effects'
import {getMicroservicesData} from "../../api/api"

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchServiceAndItsResources(action) {
  console.log("coming here saga!!!!!!")
  try {
    const microservicesData = yield call(getMicroservicesData);
    yield put({type: "MICROSERVICE_FETCH_SUCCEEDED", payload: microservicesData});
  } catch (e) {
    yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export default function* microserviceSaga() {
  yield takeEvery("FETCH_SERVICE_RESOURCES_EVENTS", fetchServiceAndItsResources);
}