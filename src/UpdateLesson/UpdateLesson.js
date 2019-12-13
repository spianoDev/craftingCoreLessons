import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default class UpdateLesson extends Component {
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
            .then(() => {
                axios.get(`https://corelessons.herokuapp.com/lesson/${this.props.match.params.id}`)
                    .then(res => {
                        console.log(res.data.data);
                        this.setState({
                            name: res.data.data.attributes.name,
                            grade: res.data.data.attributes.grade,
                            topic: res.data.data.attributes.topic,
                            materials: res.data.data.attributes.materials,
                            vocab: res.data.data.attributes.vocab,
                            description: res.data.data.attributes.description,
                            activities: res.data.data.attributes.activities,
                            accommodations: res.data.data.attributes.accommodations,
                            standard_title: res.data.data.relationships.standard_title

                        })
                    })
            })
            .catch(error => {
                console.log(error);
            });
    }
    setRedirectToLessons() {
        this.setState({ redirect: true });
    }

    renderRedirectToLessons() {
        if (this.state.redirect) {
            return <Redirect to="/lessons" />;
        }
    }
    addCheckbox(evt) {
        evt.preventDefault();
        let boxValue = evt.target.value;
        let value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        let standardArray = [];
        // console.log("Hello World", checkedBox);
        for (let i = 0; i < this.state.standard_title.length; i++) {
            if (this.state.standard_title[i]) {
                standardArray.push(this.state.standard_title[i]);
            }
        }

        if (value) {
            this.setState({
                standard_title: [...standardArray, boxValue]
            }, () => {

            }
            );
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();

        let updatedName = this.state.name;
        let updatedGrade = this.state.grade;
        let updatedTopic = this.state.topic;
        let updatedMaterials = this.state.materials;
        let updatedVocab = this.state.vocab;
        let updatedDescription = this.state.description;
        let updatedActivities = this.state.activities;
        let updatedAccommodations = this.state.accommodations;
        let updatedLessonStandards = this.state.standard_title;

        let updatedLesson = {

            data: {
                type: "Lesson",
                id: `${this.props.match.params.id}`,
                attributes: {
                    name: updatedName,
                    grade: updatedGrade,
                    topic: updatedTopic,
                    materials: updatedMaterials,
                    vocab: updatedVocab,
                    description: updatedDescription,
                    activities: updatedActivities,
                    accommodations: updatedAccommodations,
                    standard_title: updatedLessonStandards
                }
            }
        };
        console.log(updatedLesson);
        axios.put(`https://corelessons.herokuapp.com/lesson/update/${this.props.match.params.id}`,

            updatedLesson, {
                headers: {
                    'Content-Type': 'application/vnd.api+json'
                },
                body: JSON.stringify({data: updatedLesson})
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

    render() {
        console.log(this.state);
        console.log(this.state.standard_title);
        let title = this.state.musicStandards.map(title => {
            return (
                <div>
                    <p className="text">{title.attributes.standard_text}</p>
                    <label htmlFor='label'>{title.attributes.standard_title}
                        <input value={title.attributes.pk} name='label' type='checkbox'
                               onClick={this.addCheckbox}/></label>
                    <hr/>
                </div>
            )

        });
        return (
            <div>
                {this.renderRedirectToLessons()}
                <form>
                    <label className="title" htmlFor='name'>Lesson Name </label>
                    <input className="box"  onChange={this.handleChange} name='name' type="text" placeholder="type lesson name"
                           value={this.state.name}/>
                    <label className="title" htmlFor='grade'>Grade Level </label>
                    <input className="box"  onChange={this.handleChange} name='grade' type="text" placeholder="grade"
                           value={this.state.grade}/>
                    <label className="title" htmlFor='topic'>Lesson Topic </label>
                    <input className="box"  onChange={this.handleChange} name='topic' type="text" placeholder="type topic"
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
