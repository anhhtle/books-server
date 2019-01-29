import React, { Component } from 'react';

class PasswordResetForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            password: '',
            password_confirm: '',
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <form className='col-xs-10 col-sm-4' style={styles.form}>
                <h3 style={{marginBottom: 20}}>Password Reset</h3>

                {this.renderError()}

                <div className='form-group'>
                    <label className='form-label'>New password:</label>
                    <input className='form-control' type='password' onChange={(e) => this.setState({password: e.target.value})} />
                </div>
                <div className='form-group'>
                    <label>Confirm password:</label>
                    <input className='form-control' type='password' onChange={(e) => this.setState({password_confirm: e.target.value})} />
                </div>

                <button className='btn btn-primary' style={{width: 100}} onClick={this.handleSubmit}>SAVE</button>
            </form>
        );
    }
    renderError() {
        if (this.state.error) {
            return <p style={{color: 'red'}}>{this.state.error}</p>
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password !== this.state.password_confirm) {
            this.setState({
                error: 'Password does not match'
            });
        } else {
            this.setState({
                error: null
            });
        }
    }
}

const styles = {
    form: {
        marginTop: 20
    }
}

export default PasswordResetForm;