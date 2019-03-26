import axios from 'axios';
import * as constants from './constants';

export const deleteAddress = (newAddresses) => ({
	type: constants.DELETE_ADDRESS,
    newAddresses
});