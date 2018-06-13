import axios from 'axios';
import { FETCH_USER } from './types';

//aciton creator called with redux thunk
//returns function, call with dispatch
export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user')
        //make request till we get response back from api, then dispatch our action
        //res output from axios
        dispatch({ type: FETCH_USER, payload: res.data })
    };