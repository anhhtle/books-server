import React, { Component } from 'react';

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
            <button onClick={this.getData}>get data</button>
        </div>
        );
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        fetch('/api/v1')
            .then(data => data.json() )
            .then(res => this.setState({text: res.body}))
            .catch(err => {
                console.error(err);
            })
    }
}

export default Home;