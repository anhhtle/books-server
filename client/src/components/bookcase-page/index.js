import React from 'react';

import MyBooksSection from './my-books-section/MyBooksSection';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '../../redux/actions/user';
import { getVariants } from '../../redux/actions/variant';

import './BookcasePage.scss'

class BookcasePage extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('thebooksjourney-token');
        this.props.getCurrentUser(token).then(() => {
            this.load();
        });
    }
    load() {
        this.props.getVariants(this.props.user.token).then(() => console.log(this.props.variants.variants));
    }

    render() {
        return (
            <div id="BookSearchPage" className="page-container">
                <div className="container">
                    <div className='row'>
                        
                        <div className="col-sm-9">
                            <MyBooksSection variants={this.props.variants} />
                        </div>

                        <div className="col-sm-3">
                        
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user,
        variants: state.variants
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getCurrentUser, getVariants,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BookcasePage);