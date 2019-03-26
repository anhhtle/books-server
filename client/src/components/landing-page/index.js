import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '../../redux/actions/user';

import './Landing.css';
import banner_image from '../../images/books-01.jpg';

class Landing extends Component {
    componentDidMount() {
        this.checkUserIsLogin();
        console.log('LandingPage');
    }
    checkUserIsLogin() {
        const token = localStorage.getItem('thebooksjourney-token');
        if (token) {
            this.props.getCurrentUser(token)
            .then(() => {
                if (!this.props.user.error) {
                    this.props.history.push(`/dashboard`);
                } else {
                    localStorage.removeItem('thebooksjourney-token');
                }
            });
        }
    }

    render() {
        return (
            <div>
                {/* banner */}
                <div id='banner' style={styles.banner}>
                    <div className='banner-overlay'></div>
    
                    <div className='slogan-container'>
                        <p className='slogan'>Take a book, leave a book</p>
                    </div>
                </div>
    
                {/* Headline */}
                <div className="container">
                
                    <div className="row">
                        <div id='headline'>
                            <p><i className='fa fa-bookmark'></i>Community</p>
                            <p><i className='fa fa-bookmark'></i>Sharing</p>
                            <p><i className='fa fa-bookmark'></i>Discover</p>
                        </div>
    
                        {/* mission */}
                        <div className="col-md-8 col-md-offset-2" id="mission">
                            <p><strong>The Book's Journey</strong>'s mission is to promote reading by building a sharing community. As part of this community, you are encouraged to request books that you are interested in, and in return, we hope that you will be generous by listing books you own and willing to mail to requesting community members.</p>
                        </div>
    
                        {/* availability */}
                        <div className="col-md-12" id='availability'>
                            <p>Available soon for Android, iOS, and web</p>
                        </div>
    
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    banner: {
        backgroundImage: `url(${banner_image})`
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
        getCurrentUser
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Landing)