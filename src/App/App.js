import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import LessonList from '../LessonList/LessonList';
import OneLesson from '../OneLesson/OneLesson';

export default class App extends Component {
    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <nav>
                        <Link to="/"> Lesson List </Link>
                      <Link to="/lesson/:id"> Individual Lesson </Link>
                        <Link to="/lesson/new"> New Lesson Plan </Link>
                    </nav>
                </header>
                <main>
                    <Switch>
                        <Route path="/" exact={true} component={LessonList}/>
                        <Route path="/lesson/:id" exact={true} render={routerProps => <OneLesson match={routerProps.match}/>}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

