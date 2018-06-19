//SurveyForm shows surveyform and surveryformreview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview 
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        } else {
            //in SF, run callback, set state inside surveynew to true
            return (
                <SurveyForm 
                    onSurveySubmit={() => this.setState({ showFormReview: true })}
                />
            );
        }
    }
    render () {
        return (
        <div>
            {this.renderContent()}
        </div>
        );
    }   
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);