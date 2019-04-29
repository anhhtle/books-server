import React from 'react';
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import FriendRequestCard from '../../notification/FriendRequestCard';
import NewAvatarCard from '../../notification/NewAvatarCard';
import NewFriendCard from '../../notification/NewFriendCard';

// utilities
import logo from '../../../images/logo-bg.png';
import './DashboardHeader.scss';
import {API_BASE_URL} from '../../utility/helperFunctions';


class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: '*',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        let props = this.props;

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

                                    <form className='form-inline my-2 my-lg-0' onSubmit={(e) => this.handleSubmit(e)}>
                                        <input id="search-box" className='form-control mr-sm-2 col-md-6 col-sm-8' type='search' placeholder='Which books do you own?' aria-label='Search' 
                                            onChange={(e) => this.handleSearchInputChange(e) } 
                                        />
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
                                            <li className='nav-item dropdown'>
                                                <a className='nav-link dropdown-toggle' href='/#' id="notificationDropdown" role="button" data-toggle="dropdown"  aria-expanded="false">Notifications</a>
                                                <div className="dropdown-menu dropdown-menu-right notification" aria-labelledby="notificationDropdown">
                                                    {this.renderNotifications()}
                                                </div>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="/#" id="settingDropdown" role="button" data-toggle="dropdown"  aria-expanded="false">
                                                    <img id='user-avatar' src={props.user.avatar.image} alt=''/>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="settingDropdown">
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
    renderNotifications() {
        if (this.props.notifications.notifications.length === 0) {
            return <p className="dropdown-item">No notification</p>
        }
        let arr = this.props.notifications.notifications.map(n => {
            if (n.type === 'Avatar') {
                return <NewAvatarCard className="dropdown-item" key={n._id} notification={n} />
            } else if (n.type === 'Friend request') {
                return <FriendRequestCard className="dropdown-item" key={n._id} notification={n} />
            } else if (n.type === 'New friend') {
                return <NewFriendCard className="dropdown-item" key={n._id} notification={n} />
            }
            return null;
        });
        return arr;
    }
    handleSearchInputChange(e) {
        if (e.target.value) {
            this.setState({search_term: e.target.value});
        } else {
            this.setState({search_term: '*'});
        }
    }
    handleSubmit(e) {
        e.preventDefault();

        fetch(`${API_BASE_URL}/books/search`, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query: this.state.search_term})
        }
        ).then(res => res.json())
        .then(resJson => {
            this.props.history.push({
                pathname: '/book-search',
                state: { data: resJson }
            });
        }).catch(err => {
            console.error(err);
        });
    }
}


const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user,
        notifications: state.notifications
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader)