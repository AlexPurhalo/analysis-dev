import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
	form // <- form: form  <- form: reducer
});

export default rootReducer;
