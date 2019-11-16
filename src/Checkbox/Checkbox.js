// resource for building dropdown menu options: https://www.skptricks.com/2018/05/create-dropdown-using-reactjs.html
import React, {Component} from 'react';
import axios from "axios";

export default class Checkbox extends Component {
    constructor() {
        super();
        this.state = {
            musicStandards: [],
            standard_title: []
        };
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
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
    // handleInputChange(evt) {
    //     evt.preventDefault();
    //     console.log(evt.target);
    //     let name = evt.target.name;
    //     let target = evt.target;
    //     let value = target.type === 'checkbox' ? target.checked : target.value;
    //     this.setState({
    //         [name]: value
    //     });
    //     console.log(value);
    //     console.log(name);
    // }
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
    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({displayMenu: true}, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({displayMenu: false}, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }
    render() {
        console.log(this.state);
        // console.log(this.state.musicStandards);
        // let standardTitle = [];
        // if (this.state.musicStandards.length) {
        let title = this.state.musicStandards.map(title => {
            // standardTitle.push(title.attributes.standard_title)
            return (
                <div >

                    <label htmlFor='label'>{title.attributes.standard_title}
                    <input value={title.attributes.standard_title} name='label' type='checkbox' onClick={this.addCheckbox} /></label>

                </div>
            )
            // standardTitle.push(title);
        });

        // console.log(title);
        return (
            <div  >
                {/*<div className="button" onClick={this.showDropdownMenu}> Standard Used </div>*/}

                {/*{ this.state.displayMenu ? (*/}

                        {title}

                {/*): null }*/}

            </div>
        );
    }
}

