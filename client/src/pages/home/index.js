import React, { Component } from 'react';

import './Home.css';
import banner_image from '../../images/books-01.jpg';
import MainHeader from '../header/main-header/';
import MainFooter from '../footer/main-footer/';

class Home extends Component {

    render() {
        return (
        <div id="App">
            <MainHeader />
            
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



            <MainFooter />

        </div>
        );
    }
}

const styles = {
    banner: {
        backgroundImage: `url(${banner_image})`
    }
}

export default Home;