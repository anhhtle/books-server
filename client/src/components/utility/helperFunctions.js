import React from 'react';

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