import React from 'react';
import { Link } from 'react-router-dom';

import './MainHeader.css';

const MainHeader = () => {

    return (
        <div id='MainHeader' className='box-shadow'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <Link to='/'>
                            <h3 className='logo-text'>The <strong>Book's</strong> Journey</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MainHeader;