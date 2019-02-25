import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../images/logo-bg.png';
import './MainHeader.css';

const MainHeader = () => {

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
                </div>
            </div>
        </div>
    );

}

export default MainHeader;