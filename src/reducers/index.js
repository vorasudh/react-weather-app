import { combineReducers } from 'redux';

import * as ActionTypes from '../actions';

function weatherData(state = null, action) {
	switch (action.type) {
	case ActionTypes.WEATHER_DATA:
		return action.payload;
	default:
		return state;
	}
}

const rootReducer = combineReducers({ weatherData });

export default rootReducer;
