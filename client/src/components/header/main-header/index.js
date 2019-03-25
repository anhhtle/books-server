import React from 'react';
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserToken, getCurrentUser } from '../../../redux/actions/user'

import logo from '../../../images/logo-bg.png';
import './MainHeader.css';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'anh.ht.le@gmail.com',
            password: 'password',

            loading: false,
            login_error: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        return (
            <div id='MainHeader' className='box-shadow'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-5'>
                            <Link className='logo-container' to='/'>
                                <img id="logo-img" src={logo} alt="The Book's Journey logo" />
                                <h3 className='logo-text'>The <strong>Book's</strong> Journey</h3>
                            </Link>
    
                        </div>
                        <div className='col-sm-7'>
                            <div className='pull-right'>
                                <form id="sign-in-form" className='form-inline'>
                                    <div className='form-group'>
                                        <input className='form-control' type='email' name='email' value={this.state.email} onChange={this.handleInputChange} placeholder='Emai address' />
                                        <input className='form-control' type='password' name='password' value={this.state.password} onChange={this.handleInputChange} placeholder='Password' />
                                        <button className='btn btn-primary' onClick={this.handleLogin}>SIGN IN</button>
                                    </div>
                                </form>

                                <div className="error-container">
                                    <span>{this.state.login_error}</span>
                                    <Link id='forgot-password-link' className='pull-right' to='/forgot-password'>Forgot password?</Link>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        );
    }

    handleInputChange(e) {
        let key = e.target.name;
        this.setState({[key]: e.target.value});
    }
    handleLogin(e) {
        e.preventDefault();

        this.setState({loading: true});

        const loginObj = {
            user: {
                email: this.state.email.toLowerCase(),
                password: this.state.password
            }
        }

        this.props.getUserToken(loginObj)
        .then(() => {
            this.setState({loading: false});
            if (this.props.user.error) {
                this.setState({login_error: this.props.user.error});
            } else {
                this.props.getCurrentUser(this.props.user.token)
                    .then(() => {
                        if (!this.props.user.error) {
                            localStorage.setItem('thebooksjourney-token', this.props.user.token);
                            this.props.history.push(`/dashboard`);
                        }
                    });
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({loading: false});
        });
    }
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getUserToken, getCurrentUser
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)