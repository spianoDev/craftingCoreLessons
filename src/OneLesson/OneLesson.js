import React, { Component } from 'react';
import allLessons from '../LessonList/lessons.json';

export default class OneLesson extends Component {
    render() {
        let chosenLesson = allLessons.find(lesson => lesson.id === this.props.match.params.id);
            return (
                <div key={chosenLesson.attributes.name}>
                    <h2>Lesson: {chosenLesson.attributes.name}, Grade {chosenLesson.attributes.grade} - {chosenLesson.attributes.topic}</h2>
                    {/*<h3>Standards: {chosenLesson.relationships.standard_title.data[0]}</h3>*/}
                    <h4>Important Vocabulary: {chosenLesson.attributes.vocab}</h4>
                    <p>Description: {chosenLesson.attributes.description}</p>
                    <p>Activities: {chosenLesson.attributes.activities}</p>
                    <p>Accommodations: {chosenLesson.attributes.accommodations}</p>
                </div>
            )
    }
}
