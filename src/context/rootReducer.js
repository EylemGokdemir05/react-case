import { combineReducers } from "redux";
import productReducer from "./reducer";

const rootReducer = combineReducers({
  items: productReducer,
});

export default rootReducer;
