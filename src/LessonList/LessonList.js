import React, { Component } from 'react';
import allLessons from './lessons.json';

export default class LessonList extends Component {
    render() {
        let lesson = allLessons.map(lessonName => {
            return (
                <div>
                    <h2>{lessonName.attributes.name}</h2>
                </div>
            );
        });
        return <div>
            <h2>Lessons</h2>
            {lesson}
        </div>
    }
}
