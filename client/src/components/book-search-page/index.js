import React from 'react';

// redux
import { connect } from 'react-redux';

import './BookSearchPage.scss';

class BookSearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: '*',
            data: this.props.location.state.data ? this.props.location.state.data : 'No result',
        }
    }

    render() {
        if (this.state.data === 'No result') {
            return (
                <div id="BookSearchPage" className="page-container">
                    <div className="container">
                        <div className='row'>
                            <div className="col-12">
                                <p>{this.state.data}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
                
        return (
            <div id="BookSearchPage" className="page-container">
                <div className="container">
                    <div className='row'>
                        <div className="col-12">
                            { this.renderResultCards() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderResultCards() {
        console.log(this.state.data);
        let arr = [];
        Array.prototype.forEach.call(this.state.data.items, (item) => {
            arr.push(<p key={item.id}>{item.volumeInfo.title}</p>);
        });
        return arr;
    }
}

const mapStateToProps = (state, props) => {
    return {
        history: props.history,
        user: state.user,
    }
}

export default connect(mapStateToProps)(BookSearchPage)