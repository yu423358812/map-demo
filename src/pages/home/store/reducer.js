import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	lat: 40.6944277, 
	lng: -73.9845459,
	mLat: 40.6944277, 
	mLng: -73.9845459,
	addressName: '',
	isInfoOpen: true
});

export default function home(state = defaultState, action){
	switch(action.type) {
		case constants.CHANGE_CENTER:
			return state.merge({
				lat: action.latTemp,
				lng: action.lngTemp,
			});
		case constants.CHANGE_MARKER:
			return state.merge({
				mLat: action.latTemp,
				mLng: action.lngTemp
			});
		case constants.SET_INFO_WINDOW:
			return state.set('addressName', action.address)
		case constants.SET_INFO_OPEN:
			return state.set('isInfoOpen', action.isInfoOpen)
		default:
			return state;
	}
}