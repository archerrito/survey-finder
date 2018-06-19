import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
    //key that reducer output stored on, state maintained by redux
    //state.auth
    auth: authReducer,
    form: reduxForm
});