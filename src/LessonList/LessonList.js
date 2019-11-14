import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import allLessons from './lessons.json';

export default class LessonList extends Component {
    render() {
        let lesson = allLessons.map(lessonName => {
            return (
                <div key={lessonName.attributes.name}>
                    <ul>
                    <Link to={`/lesson/${lessonName.id}`}>{lessonName.attributes.name}</Link>
                    </ul>
                </div>
            );
        });
        return <div>
            <h2>Lessons</h2>
            {lesson}
        </div>
    }
}
