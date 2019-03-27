import React from 'react';
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

import logo from '../../../images/logo-bg.png';
import './DashboardHeader.css';

class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div id='DashboardHeader' className='box-shadow'>
                <div className='container'>
                    <div className='row'>
                
                        <nav className='navbar navbar-expand-lg navbar-light'>
                            <div id='nav-left-side' className="col-sm-8">
                                <Link className='navbar-brand logo-container' to='/'>
                                    <img src={logo} alt="The Book's Journey logo" width='30' height='30' alt='' />
                                </Link>

                                <form className='form-inline my-2 my-lg-0'>
                                    <input id="search-box" className='form-control mr-sm-2 col-md-6 col-sm-8' type='search' placeholder='Search available books' aria-label='Search' />
                                    <button id='search-btn' className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
                                </form>
                            </div>

                            <div id='nav-right-side'>
                                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                                    <span className='navbar-toggler-icon'></span>
                                </button>

                                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                                    <ul className='navbar-nav mr-auto'>
                                        <li className='nav-item active'>
                                            <Link className='nav-link' to='/dashboard'>Home <span className='sr-only'>(current)</span></Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/bookcase'>Bookcase</Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/contacts'>Friends</Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/notifications'>Notifications</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user
    }
}

export default connect(mapStateToProps)(DashboardHeader)