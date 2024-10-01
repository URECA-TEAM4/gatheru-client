import { JOIN_MOGAKO_USER, UNJOIN_MOGAKO_USER, JOIN_STUDY_USER,UNJOIN_STUDY_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case JOIN_MOGAKO_USER:
      return { ...state, joinSuccess: action.payload };
      case UNJOIN_MOGAKO_USER:
      return { ...state, unJoinSuccess: action.payload };
      case JOIN_STUDY_USER:
      return { ...state, joinSuccess: action.payload };
      case UNJOIN_STUDY_USER:
      return { ...state, unJoinSuccess: action.payload };
    default:
      return state;
  }
}