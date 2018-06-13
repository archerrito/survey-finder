//Records and decides whether user is currently logged in
import { FETCH_USER } from '../actions/types';
//null, first time runs, no clue if user logged in
export default function(state = null, action) {
    console.log(action);
    //set case to watch for FETCH user to come into this reducer
    switch (action.type) {
        case FETCH_USER:
            //return user payload, as seen in data, either object of empty string for no user
            return action.payload || false;

        default:
            return state;
    }
}