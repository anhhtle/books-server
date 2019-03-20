import React, { Component } from 'react';
import axios from 'axios';

import PasswordResetForm from './PasswordResetForm';

class PasswordReset extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
            showForm: false,
            formSubmitted: false,
            error: false,

            user: {
                first_name: null
            }
        }

        this.handlePasswordReset = this.handlePasswordReset.bind(this);
      }

    render() {
        return (
            <div id="PasswordReset" className='container'>
                <div className='row'>
                    <div className='col-sm-12' style={{paddingTop: 20}}>

                        {this.renderBody()}

                    </div>
                </div>
            </div>
        );
    }
    renderBody() {
        if (!this.state.dataLoaded) {
            return;
        } else if (this.state.error) {
            return <h3>Service unavailable: please try again at another time.</h3>
        } else if (this.state.formSubmitted) {
            return <h3>Password set!</h3>
        } else if (this.state.showForm) {
            return <PasswordResetForm reset={this.handlePasswordReset} user={this.state.user}/>
        } else {
            return (<h3>Page not found</h3>)
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        axios(`/api/v1/user/password-reset/${this.props.match.params.key}`)
            .then(res => {
                if (res.data) {
                    if (res.data._id) {
                        this.setState({user: res.data, showForm: true, dataLoaded: true});
                    }
                } else {
                    this.setState({dataLoaded: true});
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({dataLoaded: true});
            });
    }
    handlePasswordReset(password) {
        const data = {
            updateObj: {
                email: this.state.user.email,
                password
            }
        }

        axios.put('/api/v1/user/password-reset', data)
            .then(res => {
                if (res.data.success) {
                    this.setState({formSubmitted: true});
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({error: true});
            });
    }
}

export default PasswordReset;