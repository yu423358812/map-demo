import { combineReducers } from 'redux-immutable';
import { header } from '../common/header/store';
import { home } from '../pages/home/store';
import { saved } from '../pages/saved/store';
import { crossReducer } from '../pages/saved/store';

const combinedReducer = combineReducers({
	header,
	home,
	saved
});

function crossSliceReducer(state, action) {
	switch (action.type) {
	  case 'SAVE_TO_ADDRESS_PAGE': {
		return {
		  // specifically pass state.b as an additional argument
		  header,
		  home,
		  saved: crossReducer(state.saved, action, state.home),
		}
	  }
	  default:
		return state
	}
  }

function rootReducer(state, action) {
	const intermediateState = combinedReducer(state, action)
	const finalState = crossSliceReducer(intermediateState, action)
	return finalState
}

export default rootReducer;
