import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import LoginPage from '../components/LoginPage/login_page'
import React from 'react';
import { createLoginFormInputChangedAction, postLoginInformation } from '../actions/actions';

const handleSubmit = (dispatch, event, history) => {
    event.preventDefault();
    let formData = {
        username: event.target.username.value,
        password: event.target.password.value
    };
    console.log("Attempting login with data:");
    console.log(formData);
    dispatch(postLoginInformation(formData))
        .then(e => {
            console.log("succeeded in login!");
            console.log("Rerouting to home page");
            console.log(e);
            dispatch(push('/'))
        })
        .catch(err => {
            console.log("failed to login");
            console.log(err)
        });
};

const mapStateToProps = state => {
    return {
        username: state.username,
        password: state.password
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInputChanged: event => {
            let name = event.target.name;
            let value = event.target.value;
            let changedInput = {
                [name]: value
            };
            dispatch(createLoginFormInputChangedAction(changedInput));
        },
        handleSubmit: (event, history) => handleSubmit(dispatch, event, history)
    }
};

const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginPageContainer;
