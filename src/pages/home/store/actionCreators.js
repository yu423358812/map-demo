import axios from 'axios';
import * as constants from './constants';
import * as constantsSaved from '../../saved/store/constants';
import { fromJS } from 'immutable';

export const changeCenter = (latTemp, lngTemp) => ({
	type: constants.CHANGE_CENTER,
    latTemp, 
    lngTemp
});

export const changeMarker = (latTemp, lngTemp) => ({
	type: constants.CHANGE_MARKER,
    latTemp, 
    lngTemp
});

export const setInfoWindow = (address) => ({
	type: constants.SET_INFO_WINDOW,
    address
});

export const setInfoOpen= (isInfoOpen) => ({
	type: constants.SET_INFO_OPEN,
    isInfoOpen
});

export const saveToAddressPage= (addressName) => ({
	type: constantsSaved.SAVE_TO_ADDRESS_PAGE,
    addressName
});