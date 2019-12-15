import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


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
        this.setRedirectToLessons = this.setRedirectToLessons.bind(this);
        this.renderRedirectToLessons = this.renderRedirectToLessons.bind(this);
    }

    componentDidMount() {
        axios.get(`https://corelessons.herokuapp.com/standards/`)
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

        let lesson = {

            data: {
                type: "Lesson",
                attributes: {
                    name: newName,
                    grade: newGrade,
                    topic: newTopic,
                    materials: newMaterials,
                    vocab: newVocab,
                    description: newDescription,
                    activities: newActivities,
                    accommodations: newAccommodations,
                    standard_title: lessonStandards
                }
            }
        };
        axios.post(`https://corelessons.herokuapp.com/lessons/`,

            lesson, {
                headers: {
                    'Content-Type': 'application/vnd.api+json'
                },
                body: JSON.stringify({data: lesson})
            })
            .then(res => {
                console.log(res);
                this.setRedirectToLessons();
            })
            .catch(err => {
                console.log(err);
            });

    }

    handleChange(evt) {
        evt.preventDefault();
        let name = evt.target.name;
        let value = evt.target.value;
        this.setState(prevstate => {
            let newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
        // console.log(this.state.name);
    }
    setRedirectToLessons() {
        this.setState({ redirect: true });
    }

    renderRedirectToLessons() {
        if (this.state.redirect) {
            return <Redirect to="/lessons" />;
        }
    }
    render() {
        console.log(this.state);
        console.log(this.state.standard_title);
        let title = this.state.musicStandards.map(title => {
            return (
                <div key={'standards'}>
                    <p className="text">{title.attributes.standard_text}</p>
                    <label className="title" htmlFor='label'>{title.attributes.standard_title}
                        <input  value={title.attributes.pk} name='label' type='checkbox'
                               onClick={this.addCheckbox}/></label>
                     <hr/>
                </div>
            )

        });
        return (
            <div key={this.state}>
                {this.renderRedirectToLessons()}
                <form key={this.state.name}>
                    <label className="title" htmlFor='name'>Lesson Name </label>
                    <input className="box" onChange={this.handleChange} name='name' type="text" placeholder="type lesson name"
                           value={this.state.name}/>
                    <label className="title" htmlFor='grade'>Grade Level </label>
                    <input className="box" onChange={this.handleChange} name='grade' type="text" placeholder="grade"
                           value={this.state.grade}/>
                    <label className="title" htmlFor='topic'>Lesson Topic </label>
                    <input className="box" onChange={this.handleChange} name='topic' type="text" placeholder="type topic"
                           value={this.state.topic}/>
                    <label className="title" htmlFor='materials'>Materials </label>
                    <input className="box-medium" onChange={this.handleChange} name='materials' type="text" placeholder="list materials"
                           value={this.state.materials}/>
                    <label className="title" htmlFor='vocab'>Vocabulary </label>
                    <input className="box-medium" onChange={this.handleChange} name='vocab' type="text" placeholder="list vocabulary"
                           value={this.state.vocab}/>
                    <label className="title" htmlFor='description'>Description </label>
                    <input className="box-large" onChange={this.handleChange} name='description' type="text" placeholder="type description"
                           value={this.state.description}/>
                    <label className="title" htmlFor='activities'>Activities </label>
                    <input className="box-large" onChange={this.handleChange} name='activities' type="text" placeholder="type activities"
                           value={this.state.activities}/>
                    <label className="title" htmlFor='accommodations'>Accommodations </label>
                    <input className="box-large" onChange={this.handleChange} name='accommodations' type="text"
                           placeholder="list accommodations" value={this.state.accommodations}/>
                    <label className="title"> Choose Standards </label>
                    {title}
                    <button className="individual-lesson" onClick={this.handleSubmit} type="submit">Submit</button>

                </form>

            </div>
        )
    }
}
