import { combineReducers } from "redux";
import generalStore from './general';

export default combineReducers({
    general: generalStore
})