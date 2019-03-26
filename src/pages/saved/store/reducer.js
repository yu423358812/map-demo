import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	addresses: []
});

export default function saved(state = defaultState, action){
	switch(action.type) {
		case constants.SAVE_TO_ADDRESS_PAGE:
			let temp = state.toJS().addresses;
			for (let i = 0; i < temp.length; i++) {
				if(temp[i].address){
					console.log(temp[i].address);
					if(temp[i].address == action.addressName){
						console.log('true');
						return state;
					}
				}
				if(i == (temp.length - 1)){
					console.log('enter');
					temp.push({key: temp.length, address: action.addressName});
					console.log(temp);
					return state.set('addresses', fromJS(temp));
				}
			};
			if(temp.length == 0){
				temp.push({key: temp.length, address: action.addressName});
				return state.set('addresses', fromJS(temp));
			}
		case constants.DELETE_ADDRESS:
			return state.set('addresses', fromJS(action.newAddresses));
		default:
			return state;
	}
}

export function crossReducer(state = defaultState, action, stateHomePage){
	switch(action.type) {
		
		default:
			return state;
	}
}

