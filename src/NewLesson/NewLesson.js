import React, { Component } from 'react';
import axios from 'axios';
import DropDown from "../DropDown/DropDown";


export default class NewLesson extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            grade: '',
            topic: '',
            materials: '',
            vocab: '',
            description: '',
            activities: '',
            accommodations: '',
            standard_title: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleSubmit(evt) {
        evt.preventDefault();
        let newName = this.state.name;
        let newGrade = this.state.grade;
        let newTopic = this.state.topic;
        let newMaterials = this.state.materials;
        let newVocab = this.state.vocab;
        let newDescription = this.state.description;
        let newActivities = this.state.activities;
        let newAccommodations = this.state.accommodations;

        axios.post(
            `http://localhost:8000/lessons/`,
            {
                name: newName,
                grade: newGrade,
                topic: newTopic,
                materials: newMaterials,
                vocab: newVocab,
                description: newDescription,
                activities: newActivities,
                accommodations: newAccommodations
            },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(res => {
                console.log(res);
            })

    }
    handleChange(evt) {
        evt.preventDefault();
        let name = evt.target.name;
        let value = evt.target.value;
        this.setState(prevstate => {
            let newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
        console.log(this.state.name);
    }
    handleInputChange(evt) {
        let target = evt.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let standard_title = target.standard_title;

        this.setState({
            [standard_title]: value
        });
    }
    render() {

        return (
            <div>
                {/*{this.renderRedirect()}*/}
                <form>
                    <label htmlFor='name'>Lesson Name </label>
                        <input onChange={this.handleChange} name='name' type="text" placeholder="type lesson name" value={this.state.name} />
                    <label htmlFor='grade'>Grade Level </label>
                        <input onChange={this.handleChange} name='grade' type="text" placeholder="grade" value={this.state.grade} />
                    <label htmlFor='topic'>Lesson Topic </label>
                        <input onChange={this.handleChange} name='topic' type="text" placeholder="type topic" value={this.state.topic} />
                    <label htmlFor='materials'>Lesson Topic </label>
                    <input onChange={this.handleChange} name='materials' type="text" placeholder="type topic" value={this.state.materials} />
                    <label htmlFor='vocab'>Lesson Topic </label>
                    <input onChange={this.handleChange} name='vocab' type="text" placeholder="type topic" value={this.state.vocab} />
                    <label htmlFor='description'>Lesson Topic </label>
                    <input onChange={this.handleChange} name='description' type="text" placeholder="type topic" value={this.state.description} />
                    <label htmlFor='activities'>Lesson Topic </label>
                    <input onChange={this.handleChange} name='activities' type="text" placeholder="type topic" value={this.state.activities} />
                    <label htmlFor='accommodations'>Lesson Topic </label>
                    <input onChange={this.handleChange} name='accommodations' type="text" placeholder="type topic" value={this.state.accommodations} />
                    <label> Choose Standards </label>
                    {<DropDown />}
                    <button onClick={this.handleSubmit} type="submit">Submit</button>

                </form>

            </div>
        )
    }
}
