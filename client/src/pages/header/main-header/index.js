import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo-bg.png';
import './MainHeader.css';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
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
                                        <input className='form-control' type='text' value={this.state.email} placeholder='Emai address' />
                                        <input className='form-control' type='password' value={this.state.password} placeholder='Password' />
                                        <button className='btn btn-primary'>SIGN IN</button>
                                    </div>
                                </form>

                                <Link id='forgot-password-link' className='pull-right' to='/forgot-password'>Forgot password?</Link>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}

export default MainHeader;