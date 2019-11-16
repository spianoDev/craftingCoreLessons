import React, { Component } from 'react';
import axios from 'axios';
// import Checkbox from "../Checkbox/Checkbox";


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
            musicStandards: [],
            standard_title: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCheckbox = this.addCheckbox.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost:8000/standards/`)
            .then(res => {
                // console.log(res.data.data);
                this.setState({musicStandards: res.data.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
    addCheckbox(evt) {
        evt.preventDefault();
        let boxValue = evt.target.value;
        let value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        if (value) {
            this.setState({
                standard_title: [...this.state.standard_title, boxValue]
            });

        }
        console.log(boxValue);
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
        let lessonStandards = this.state.standard_title;

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
                accommodations: newAccommodations,
                standard_title: lessonStandards

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
        // console.log(this.state.name);
    }

    render() {
    console.log(this.state);
        let title = this.state.musicStandards.map(title => {
            return (
                <div >
                    <label htmlFor='label'>{title.attributes.standard_title}
                    <input value={title.attributes.pk} name='label' type='checkbox' onClick={this.addCheckbox} /></label>
                </div>
            )

        });
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
                    <label htmlFor='materials'>Materials </label>
                        <input onChange={this.handleChange} name='materials' type="text" placeholder="list materials" value={this.state.materials} />
                    <label htmlFor='vocab'>Vocabulary </label>
                        <input onChange={this.handleChange} name='vocab' type="text" placeholder="list vocabulary" value={this.state.vocab} />
                    <label htmlFor='description'>Description </label>
                        <input onChange={this.handleChange} name='description' type="text" placeholder="type description" value={this.state.description} />
                    <label htmlFor='activities'>Activities </label>
                        <input onChange={this.handleChange} name='activities' type="text" placeholder="type activities" value={this.state.activities} />
                    <label htmlFor='accommodations'>Accommodations </label>
                        <input onChange={this.handleChange} name='accommodations' type="text" placeholder="list accommodations" value={this.state.accommodations} />
                    <label> Choose Standards </label>
                    {title}
                    <button onClick={this.handleSubmit} type="submit">Submit</button>

                </form>

            </div>
        )
    }
}
