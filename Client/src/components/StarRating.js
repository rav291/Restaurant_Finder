import React from 'react'

const StarRating = ({ rating }) => {

    const star = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating)
            star.push(<i key={i} className="fas fa-star text-warning"></i>)
        else if (!Number.isInteger(rating) && i === Math.ceil(rating)) {
            star.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>)
        }
        else {
            star.push(<i key={i} className="far fa-star text-warning"></i>)
        }
    }

    return (
        <>
            {star}
        </>
    )
}

export default StarRating
