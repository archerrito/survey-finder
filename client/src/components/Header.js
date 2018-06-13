import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render() {
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper"> 
                    <Link to={this.props.auth ? '/surveys' : '/'}
                    className="left brand-logo">
                        Survey Finder 
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(auth) {
    //auth piece of state in reducer index.js
    //assigned authreducer to auth property
    return { auth };
}

export default connect(mapStateToProps)(Header);