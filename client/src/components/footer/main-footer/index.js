import React from 'react';

import './MainFooter.css';

const MainFooter = () => {

    return (
        <div id='MainFooter' className='box-shadow'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <p id="contact-us">Contact us:&nbsp;
                            <a href='mailto:thebooksjourney.us@gmail.com'>
                                thebooksjourney.us@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MainFooter;