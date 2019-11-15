// resource for building dropdown menu options: https://www.skptricks.com/2018/05/create-dropdown-using-reactjs.html
import React, {Component} from 'react';
import axios from "axios";

export default class DropDown extends Component {
    constructor() {
        super();
        this.state = {
            musicStandards: [],
            displayMenu: false
        };
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
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
        // console.log(this.state.musicStandards);
        // let standardTitle = [];
        // if (this.state.musicStandards.length) {
        let title = this.state.musicStandards.map(title => {
            // standardTitle.push(title.attributes.standard_title)
            return (
                <div>
                    {title.attributes.standard_title}
                </div>
            )
            // standardTitle.push(title);
        });

        console.log(title);
        return (
            <div  className="dropdown">
                {/*<div className="button" onClick={this.showDropdownMenu}> Standard Used </div>*/}

                {/*{ this.state.displayMenu ? (*/}
                    <ul>
                        <li>{title}</li>
                    </ul>
                {/*): null }*/}

            </div>
        );
    }
}

