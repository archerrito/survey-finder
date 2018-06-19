import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    //when component mounted on screen
    componentDidMount() {
        //access actions component via props, then action creator
        this.props.fetchUser();

    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container"> 
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};
//first mapstatetoproviders, pass in actions, assigned to app component as props
export default connect(null, actions)(App);