import React, { Component } from 'react';
import {  BrowserRouter as  Switch, Route, withRouter } from "react-router-dom";
import ViewArticle from "../viewArticle/viewArticle";
import EditArticle from "../editArticle/editArticle";
import NewArticle from "../newArticle/newArticle";
import LoginPage from "../loginPage/loginPage";
import Contact from "../contact/contact";
import About from "../about/about";
import Main from "../homePage/main/main";
import { connect } from "react-redux";
import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
const AdminOnly = (ComponsedComponent, auth) => {
    class AdminOnly extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isPass: false
            }
        }
        componentWillMount() {
            if (!auth.isEmpty) {
                firebase.auth().currentUser.getIdTokenResult()
                    .then((idTokenResult) => {
                        if (idTokenResult.claims.type === 'administrator') {
                            this.setState({
                                isPass: true
                            })
                        } else {
                            alert("You're not an administrator! Pleas login with user administrator!");
                            this.props.history.push('/login');
                        }
                    })
            } else {
                this.props.history.push('/login')
            }
        }
        render() {
            if (this.state.isPass) {
                return <ComponsedComponent location={this.props.location} history={this.props.history}
                    auth={auth} />
            }
            else {
                return (
                    <div>
                        Checking...
                    </div>
                )
            }
        }
    }
    return AdminOnly;
}
class RouterManager extends Component {
    constructor(props) {
        super(props);
        this.setState = {}
    }
    render() {
        return (
            <Switch>
                <Route path="/my-blog" exact component={Main} />
                <Route path="/contact" component={Contact} />
                <Route path="/about" component={About} />
                <Route path="/login" component={LoginPage} />
                <Route path="/article/:id" component={ViewArticle} />
                <Route path="/new-article" component={AdminOnly(NewArticle, this.props.auth)} />
                <Route path="/editArticle/:id" component={AdminOnly(EditArticle, this.props.auth)} />
            </Switch>
        );
    }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile,
}));
export default enhance(withRouter(RouterManager));
