import React from 'react';
import moment from 'moment';

export const API_BASE_URL = 'https://books-app-server-dev.herokuapp.com/api/v1';

export function renderRatingStars(ratingNum) {
    let fullStar = Math.floor(ratingNum / 1);
    let halfStar = Math.round(ratingNum % fullStar);
    let emptyStar = 5 - fullStar - halfStar;

    if (ratingNum === 0 ) {
        emptyStar = 5;
    }

    let starTemplate = [];
    for (let i = 1; i <= fullStar ; i++) {
        starTemplate.push(<i className="fa fa-star" key={`full-star-${i}`} style={{color: 'gold', fontSize: 12}}></i>);
    }
    for (let i = 1; i <= halfStar ; i++) {
        starTemplate.push(<i className="fa fa-star-half" key={`star-half-${i}`} style={{color: 'gold', fontSize: 12}}></i>);
    }
    for (let i = 1; i <= emptyStar ; i++) {
        starTemplate.push(<i className="fa fa-star-outline" key={`star-outline-${i}`} style={{color: 'gold', fontSize: 12}}></i>);
    }
    return starTemplate;
}

export function renderLongDate(date) {
    let a = moment(date);
    let b = moment(new Date());
    if (b.diff(a, 'hours') < 1) {
        return b.diff(a, 'minutes') + 'm'
    } else if (b.diff(a, 'days') < 1) {
        return b.diff(a, 'hours') + 'h'
    } else {
        return a.format('MMM DD, YYYY');
    }
}