import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import allLessons from './lessons.json';
import axios from 'axios';

export default class LessonList extends Component {
    constructor() {
        super();
        this.state = {
            listOfLessons: []
        };
    }

    componentDidMount() {
        axios.get('https://corelessons.herokuapp.com/lessons/')
            .then(res => {
                console.log(res.data);
                this.setState({ listOfLessons: res.data.data });
                //might be res.data.data
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let lesson = this.state.listOfLessons.map(lessonName => {
            return (
                <div key={lessonName.attributes.name}>
                    <ul >
                    <Link className="individual-lesson" to={`/lesson/${lessonName.id}`} >{lessonName.attributes.name}:</Link>
                        <li>A lesson on {lessonName.attributes.topic} for grade {lessonName.attributes.grade}.</li>
                    </ul>
                </div>
            );
        });
        return <div>
            <h1 className="heading">Welcome to Crafting Core Lesson Plans</h1>
            <h2 className="title-black">Browse the list of lessons and click on the link to view the individual plan.</h2>
            {lesson}
        </div>
    }
}
