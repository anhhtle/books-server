import React, { Component } from 'react';
import axios from "axios";

import { getApiUrl } from '../../utility'

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: 'hi'
        }
      }

    render() {
        return (
        <div className="App">
            <h1>Project Home</h1>
            <p>{this.state.text}</p>
        </div>
        );
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        let apiUrl = getApiUrl();

        axios(apiUrl)
            .then(res => {
                this.setState({text: res.data})
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export default Home;