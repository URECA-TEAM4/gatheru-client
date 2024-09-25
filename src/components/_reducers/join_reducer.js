import { JOIN_USER, UNJOIN_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case JOIN_USER:
      return { ...state, joinSuccess: action.payload };
      case UNJOIN_USER:
      return { ...state, unJoinSuccess: action.payload };
    default:
      return state;
  }
}