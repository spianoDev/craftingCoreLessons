import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import LessonList from '../LessonList/LessonList';
import OneLesson from '../OneLesson/OneLesson';
import StandardList from "../StandardList/StandardList";
import LoginForm from "../Forms/LoginForm";
import SignupForm from "../Forms/SignupForm";
import Nav from '../Nav/Nav';
import NewLesson from "../NewLesson/NewLesson";
import UpdateLesson from "../UpdateLesson/UpdateLesson";
import axios from 'axios';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: !!localStorage.getItem('token'),
            username: '',
            password: ''
        };
        this.handle_login = this.handle_login.bind(this);
        this.handle_signup = this.handle_signup.bind(this);
        this.handle_logout = this.handle_logout.bind(this);
        this.display_form = this.display_form.bind(this);
    }


    componentDidMount() {
        if (this.state.logged_in) {
            axios.get('https://corelessons.herokuapp.com/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    this.setState({ username: json.data.user.username });
                });
        }
    }

    handle_login(evt, data) {
        evt.preventDefault();

        console.log(data.username);
        let user = data.username;
        let passCode = data.password;

        let userLogin = {
            data: {
                type: "ObtainJSONWebToken",
                attributes: {
                    username: user,
                    password: passCode
                }
            }
        };
        axios.post('https://corelessons.herokuapp.com/token-auth/',
            userLogin, {
                headers: {
                    'Content-Type': 'application/vnd.api+json'
                },
                body: JSON.stringify({userLogin})
            })
            .then(res => console.log(res.data.data.token))
            .then(res => {
                localStorage.setItem('token', res);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: user,
                    password: passCode
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handle_signup(evt, data) {
        evt.preventDefault();
        axios.post('https://corelessons.herokuapp.com/core/users/', {
            headers: {
                'Content-Type': 'application/vnd.api+json'
            },
            body: JSON.stringify(data)
        })
            .then(res => console.log(res))
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.data.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.username
                });
            })
    }
    handle_logout() {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
    }

    display_form(form) {
        this.setState({
            displayed_form: form
        });
    }

    render() {
        let form;
            switch (this.state.displayed_form) {
                case 'login':
                    form = < LoginForm handle_login={this.handle_login} />;
                    break;
                case 'signup':
                    form = <SignupForm handle_signup={this.handle_signup} />;
                    break;
                default:
                    form = null;
            }

        return (
            <div className="behind">

                <header >
                    <nav>
                        <Link to="/lessons"> Lesson List </Link>
                      <Link to="/standards"> All Standards </Link>
                        <Link to="/lesson/new"> New Lesson Plan </Link>
                    </nav>

                </header>
                <main>
                    <div className="content" >
                        <div className="login">
                    <Nav logged_in={this.state.logged_in}
                         display_form={this.display_form}
                         handle_logout={this.handle_logout}/>
                    {form}
                    <h4 >
                        {this.state.logged_in ? `Hey there, ${this.state.username}`
                            : 'Please Log In' }
                    </h4>
                        </div>
                    <Switch>
                        <Route path="/lesson/new" exact={true} component={NewLesson} />
                        <Route path="/lesson/update/:id" exact={true} render={routerProps => <UpdateLesson match={routerProps.match} /> } />
                        <Route path="/lessons" exact={true} component={LessonList}/>
                        <Route path="/standards" exact={true} component={StandardList}/>
                        <Route path="/lesson/:id" exact={true} render={routerProps => <OneLesson match={routerProps.match}/>}/>
                    </Switch>
                    </div>
                </main>
            </div>
        );
    }
}

