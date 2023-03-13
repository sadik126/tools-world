import React, { useState } from 'react';
import ReactStars from 'react-stars';

const Reviews = () => {
    const [rating, setRating] = useState([])
    const ratingChanged = (newRating) => {
        setRating(newRating)
    }
    return (
        <>
            <h1 className='text-3xl text-center'>Give your review on tools world</h1>

            <div className='flex justify-center items-center'>

                <ReactStars size={30}
                    onChange={ratingChanged}
                    count={5}
                    value={rating}
                    color2={'#ffd700'}>

                </ReactStars>
                {
                    rating
                }
            </div>
        </>

    );
};

export default Reviews;