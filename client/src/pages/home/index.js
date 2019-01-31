import React, { Component } from 'react';

import './Home.css';
import banner_image from '../../images/books-01.jpg';

import MainHeader from '../header/main-header/';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      }

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
            <div id='headline'>
                <p><i className='fa fa-bookmark'></i>Community</p>
                <p><i className='fa fa-bookmark'></i>Sharing</p>
                <p><i className='fa fa-bookmark'></i>Discover</p>
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

export default Home;