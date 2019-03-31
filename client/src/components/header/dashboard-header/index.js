import React from 'react';
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

import logo from '../../../images/logo-bg.png';
import './DashboardHeader.scss';

const DashboardHeader = (props) => {
    return (
        <div id='DashboardHeader' className='box-shadow'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>

                        <nav className='navbar navbar-expand-lg navbar-light'>
                            <div id='nav-left-side' className="col-sm-8">
                                <Link className='navbar-brand' to='/'>
                                    <img src={logo} alt="The Book's Journey logo"/>
                                </Link>

                                <form className='form-inline my-2 my-lg-0' onSubmit={(e) => handleSubmit(e, props)}>
                                    <input id="search-box" className='form-control mr-sm-2 col-md-6 col-sm-8' type='search' placeholder='Which books do you own?' aria-label='Search' />
                                    <button id='search-btn' className='btn my-2 my-sm-0' type='submit'><i className='fa fa-search'></i></button>
                                </form>
                            </div>

                            <div id='nav-right-side'>
                                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#main-nav' aria-controls='main-nav' aria-expanded='false' aria-label='Toggle navigation'>
                                    <span className='navbar-toggler-icon'></span>
                                </button>

                                <div className='collapse navbar-collapse' id='main-nav'>
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
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown"  aria-expanded="false">
                                                <img id='user-avatar' src={props.user.avatar.image} alt=''/>
                                            </Link>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="profile">Profile</Link>
                                                <Link className="dropdown-item" to="user-guide">User Guide</Link>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item" to="#">Logout</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
    )
}

function handleSubmit(e, props) {
    e.preventDefault();
    console.log(props.user);
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user
    }
}

export default connect(mapStateToProps)(DashboardHeader)