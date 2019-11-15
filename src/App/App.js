import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import LessonList from '../LessonList/LessonList';
import OneLesson from '../OneLesson/OneLesson';
import StandardList from "../StandardList/StandardList";
import LoginForm from "../Forms/LoginForm";
import SignupForm from "../Forms/SignupForm";
import Nav from '../Nav/Nav';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: !!localStorage.getItem('token'),
            username: ''
        };
        this.handle_login = this.handle_login.bind(this);
        this.handle_signup = this.handle_signup.bind(this);
        this.handle_logout = this.handle_logout.bind(this);
        this.display_form = this.display_form.bind(this);
    }


    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
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
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            // .then(res => console.log(res))
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.user.username
                });

            })
    }

    handle_signup(evt, data) {
        evt.preventDefault();
        fetch('http://localhost:8000/crafting_core_lessons/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
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
                    form = <LoginForm handle_login={this.handle_login} />;
                    break;
                case 'signup':
                    form = <SignupForm handle_signup={this.handle_signup} />
                    break;
                default:
                    form = null;
            }

        return (
            <div className="App">

                <header className="App-header">
                    <nav>
                        <Link to="/lessons"> Lesson List </Link>
                      <Link to="/standards"> All Standards </Link>
                        <Link to="/lesson/new"> New Lesson Plan </Link>
                    </nav>

                </header>
                <main>
                    <Nav logged_in={this.state.logged_in}
                         display_form={this.display_form}
                         handle_logout={this.handle_logout}/>
                    {form}
                    <h3>
                        {this.state.logged_in ? `Hey there, ${this.state.username}`
                            : 'Please Log In' }
                    </h3>
                    <Switch>
                        <Route path="/lessons" exact={true} component={LessonList}/>
                        <Route path="/standards" exact={true} component={StandardList}/>
                        <Route path="/lesson/:id" exact={true} render={routerProps => <OneLesson match={routerProps.match}/>}/>
                    </Switch>

                </main>
            </div>
        );
    }
}

