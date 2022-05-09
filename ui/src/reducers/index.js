import ThemeOptions from './ThemeOptions';
import {UserLicence} from "./licence";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    ThemeOptions,
    UserLicence
});

export default rootReducer;