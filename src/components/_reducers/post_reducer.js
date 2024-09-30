import { DELETE, UPDATE } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE:
      return { ...state, deleteSuccess: action.payload };
      case UPDATE:
      return { ...state, updateSuccess: action.payload };
    default:
      return state;
  }
}