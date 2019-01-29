import React, { Component } from 'react';

import MainHeader from '../header/main-header/';
import PasswordResetForm from './PasswordResetForm';


class PasswordReset extends Component {
    constructor(props){
        super(props);
        this.state = {
            showForm: true,
        }
      }

    render() {
        return (
        <div className="App">
            <MainHeader />

            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>

                        {this.renderBody()}

                    </div>
                </div>
            </div>

        </div>
        );
    }
    renderBody() {
        if (this.state.showForm) {
            return <PasswordResetForm />
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        // fetch('/api/v1')
        //     .then(data => data.json() )
        //     .then(res => this.setState({text: res.body}))
        //     .catch(err => {
        //         console.error(err);
        //     })
    }
}

// const styles = {
// }

export default PasswordReset;