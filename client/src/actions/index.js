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
//action creator, handle token send to backend
export const handleToken = (token) => async dispatch => {
    //post request, want to send info along with request to backend
    //updated user model with new number of credits
    const res = await axios.post('/api/stripe', token);
    //dispatch action type to update user type in auth reducer
    //updates header credits, components re-render with new state
    dispatch({ type: FETCH_USER, payload:res.data });
}

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data })
};