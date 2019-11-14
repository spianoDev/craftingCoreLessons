import React, { Component } from 'react';
import allLessons from '../LessonList/lessons.json';
import standardList from '../StandardList/standards.json';

export default class OneLesson extends Component {
    render() {

        let chosenLesson = allLessons.find(lesson => lesson.id === this.props.match.params.id);
        // console.log(chosenLesson.relationships.standard_title.data[0]);
        let standards = [];
        let standardData = [];
        for(let i = 0; i < chosenLesson.relationships.standard_title.data.length; i++) {
                  standards.push(chosenLesson.relationships.standard_title.data[i].id);
            let standardId = standardList.filter(standard => standard.id === standards[i]);
                standardData.push(standardId[0].attributes);
            // console.log(standardId[0].attributes);
                // standards.push([standardId[0].attributes]);
            // console.log(standardId.attributes.heading);
            }

            // for (let data of standardData) {
            //     console.log(data);
            //     // return data;
            // }
            // let newInfo = {};
      // standardData.forEach(function(element) {
      //       console.log(element.anchor_standard_text);
      //   });
        let dataInfo = [];
        for(let i = 0; i < standardData.length; i++) {
            dataInfo.push(<div>
                <h4>{standardData[i].heading} {standardData[i].anchor_standard_number}: {standardData[i].anchor_standard_text}</h4>
                <p>{standardData[i].standard_title}: {standardData[i].standard_text}</p>

            </div>)
        }

            console.log(standardData);
            console.log(standards);
            console.log(dataInfo);
            return (
                <div key={chosenLesson.attributes.name}>

                    <h2>Lesson: {chosenLesson.attributes.name}, Grade {chosenLesson.attributes.grade} - {chosenLesson.attributes.topic}</h2>
                    <h3>Standards:</h3>
                    {dataInfo}
                    <h4>Important Vocabulary: {chosenLesson.attributes.vocab}</h4>
                    <p>Description: {chosenLesson.attributes.description}</p>
                    <p>Activities: {chosenLesson.attributes.activities}</p>
                    <p>Accommodations: {chosenLesson.attributes.accommodations}</p>

                </div>
            )
    }
}
