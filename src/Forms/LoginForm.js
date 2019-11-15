import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
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
            <form onSubmit={evt => this.props.handle_login(evt, this.state)}>
                <h4>Log In</h4>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                <input type='submit'/>
            </form>
        )
    }
}

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired
};
