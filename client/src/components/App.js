import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
//const Landing = () => <h2>Landing</h2>;

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
                    <div> 
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