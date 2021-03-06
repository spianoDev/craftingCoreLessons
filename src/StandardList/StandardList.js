import React, { Component } from 'react';
import standardList from '../StandardList/standards.json';

export default class StandardList extends Component {
    render() {
        let item = standardList.map(standardName => {
            return (
                <div key={standardName.attributes.standard_title}>
                    <h2 className="title">Grade: {standardName.attributes.grade} - {standardName.attributes.heading}, {standardName.attributes.anchor_standard_number}</h2>
                    <h3 >{standardName.attributes.anchor_standard_text}</h3>
                    <h4 className='standard-name'>{standardName.attributes.standard_title}: {standardName.attributes.standard_text}</h4>
                    <hr/>
                </div>
            );
        });
        return <div>
            <h1 className="heading">Browse the Illinois CCSS for Music</h1>
            {item}
        </div>
    }
}
