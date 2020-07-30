/**
 * Reducer to disable or enable
 * tutorials, help info from screens
 * this is accessiable through settings
 */
import {ENABLE_TUTORIALS, DISABLE_TUTORIALS} from '../Actions/ActionTypes';

export default function (state = {showTutorial: true}, actions) {
  switch (actions.type) {
    case ENABLE_TUTORIALS:
      return {
        ...state,
        showTutorial: true,
      };

    case DISABLE_TUTORIALS:
      return {
        ...state,
        showTutorial: false,
      };
    default:
      return state;
  }
}
