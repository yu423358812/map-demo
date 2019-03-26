import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from 'axios';

export const changePage = (selectedPage) => ({
	type: constants.CHANGE_PAGE,
	selectedPage
});