import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

export default class OneLesson extends Component {
    constructor() {
        super();
        this.state = {
            lesson: [],
            lessonStandards: [],
            musicStandards: [],
        };
        this.setLessonStandards = this.setLessonStandards.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        // this.setRedirect = this.setRedirect.bind(this);
        // this.renderRedirect = this.renderRedirect.bind(this);
    }

    componentDidMount() {
        // backend call to access the individual lesson data model
        axios.get(`http://localhost:8000/lesson/${this.props.match.params.id}`)
            .then(res => {
                // console.log(res.data.data);
                console.log(res.data.data.relationships.standard_title.data);
                this.setState(
                    {
                        lesson: res.data.data,
                        lessonStandards: res.data.data.relationships.standard_title.data
                    })
            })
            .then(() => {
                // second backend call to access the music standards data model
                axios.get(`http://localhost:8000/standards/`)
                    .then(res => {
                        // console.log(res.data.data);
                        this.setState({ musicStandards: res.data.data })
                    })
            })
            .catch(error => {
                console.log(error);
            });
    }
    setLessonStandards(standards) {
        this.setState( {
            musicStandards: standards
        })
        // console.log(evt.target.value)

    }
    deleteLesson() {
        axios.delete(`http://localhost:8000/lesson/delete/${this.props.match.params.id}`)
            .then(res => {
                // this.setRedirect();
            })
            .catch(error => {
                console.log(error);
            });
    }
    // setRedirect() {
    //     this.setState({ redirect: true });
    // }
    //
    // renderRedirect() {
    //     if (this.state.redirect) {
    //         return <Redirect to="http://localhost:3000/lessons" />;
    //     }
    // }
    render() {
        // console.log(this.state);
        //  let chosenLesson = allLessons.find(lesson => lesson.id === this.props.match.params.id);
        // // console.log(chosenLesson.relationships.standard_title.data[0]);
        let standards = [];
        if (this.state.lessonStandards.length && this.state.musicStandards.length) {
            for (let i = 0; i < this.state.lessonStandards.length; i++) {
                let standardId = this.state.musicStandards.filter(standard => standard.id === this.state.lessonStandards[i].id);
                // console.log(standardId);
                console.log(standardId[0]);
                standards.push(standardId[0]);
            }
        }

        let dataInfo = [];
        if (standards.length > 0) {
            for (let i = 0; i < standards.length; i++) {
                dataInfo.push(<div key={dataInfo}>
                    <h4>{standards[i].attributes.heading} {standards[i].attributes.anchor_standard_number}: {standards[i].attributes.anchor_standard_text}
                    </h4>
                    <p>{standards[i].attributes.standard_title}: {standards[i].attributes.standard_text}</p>

                </div>)
            }
        }
        let lessonInfo = [];
        if (this.state.lesson.attributes) {
            lessonInfo = this.state.lesson.attributes;

        }
        // console.log(this.state.lesson.attributes);
        console.log(lessonInfo);
        console.log(dataInfo);
            return (
                <div key={this.state.lesson}>
                    {/*{this.renderRedirect()}*/}
                    <h2>Lesson: {lessonInfo.name}, Grade {lessonInfo.grade} - {lessonInfo.topic}</h2>
                    <h3>Standards</h3>
                    {dataInfo}
                    <h4>Important Vocabulary: {lessonInfo.vocab}</h4>
                    <p>Description: {lessonInfo.description}</p>
                    <p>Activities: {lessonInfo.activities}</p>
                    <p>Accommodations: {lessonInfo.accommodations}</p>
                    <Link to={`/lesson/update/${this.props.match.params.id}`}>
                        <button >Update this Lesson </button>
                    </Link>
                    <Link to={`/lesson/delete/${this.props.match.params.id}`}>
                        <button >Delete this Lesson </button>
                    </Link>
                </div>
            )
    }
}
