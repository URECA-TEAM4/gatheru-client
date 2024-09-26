import { combineReducers } from "redux";
import user from "./user_reducer";
import join from "./join_reducer";

// 여러개의 reducer를 하나로 합쳐준다.
const rootReducer = combineReducers({
  user,
  join,
});

export default rootReducer;
