import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SignupForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        let name = evt.target.name;
        let value = evt.target.value;
        this.setState(prevstate => {
            let newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };
    render() {
        return (
            <form className="content" onSubmit={evt => this.props.handle_signup(evt, this.state)}>
                <h4>Sign Up</h4>
                <label className="title" htmlFor='username'>Username</label>
                <input className="box" type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                <label className="title" htmlFor='password'>Password</label>
                <input className="box" type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                <input className="individual-lesson"  type='submit'/>
            </form>
        )
    }
}

SignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
};
