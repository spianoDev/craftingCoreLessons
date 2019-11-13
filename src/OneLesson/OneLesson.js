import React, { Component } from 'react';
import standardList from './standards.json';

export default class OneLesson extends Component {
    render() {
        let item = standardList.map(standardName => {
            return (
                <div key={item.standard_title}>
                    <h2>Grade: {item.grade}</h2>
                    <h2>{item.heading}, {item.anchor_standard_number}</h2>
                    <h3>{item.anchor_standard_text}</h3>
                    <h4>{item.standard_title}: {item.standard_text}</h4>
                </div>
            );
        });
        return <div>
            <h1>Browse the Illinois CCSS for Music</h1>
            {item}
        </div>
    }
}
