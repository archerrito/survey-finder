//SVF shos users their inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from'./formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

//receive form values from maptatetoprops
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });
    
    return (
        <div>
            <h5>Please confim your entries</h5>
            {reviewFields}
            <div>
                <div>
                    <label>Survey Title</label>
                    <div>{formValues.title}</div>
                </div>
            </div>
            <button
                className= "yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
            Back
            </button>
            <button 
            //called from actions
            onClick={() => submitSurvey(formValues, history)}
            className="green btn-flat white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button> 
        </div>
    );
};

//taking redux state, transforming to props, sending to component
function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

//with router, gives access to history object
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));