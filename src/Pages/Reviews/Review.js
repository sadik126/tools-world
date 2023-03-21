import React from 'react';

import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';

const Review = ({ review }) => {

    const star = Array.from({ length: 5 }, (elem, index) => {

        let number = index + 0.5;




        return (
            <span key={index}>
                {
                    review.review > index ? (<FaStar className='star'></FaStar>) :
                        review.review > number ? (<FaStarHalfAlt className='star'></FaStarHalfAlt>) : (<AiOutlineStar className='star'></AiOutlineStar>)

                }
            </span>
        );
    })
    return (


        <div className="card lg:max-w-lg bg-base-100 shadow-xl" style={{ height: '23rem' }}>
            <div className="card-body">
                <h2 className="card-title">{review.reviewer}</h2>
                <p>{review?.message?.length > 240 ? review.message.slice(0, 240) + '...' : review.message}</p>
                <div className="flex items-center gap-6 mt-4">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={review.image} />
                        </div>
                    </div>
                    <div>
                        <h4 className='text-xl'>{review.reviewer}</h4>
                        <div className='flex'>{star}</div>
                        {/* <p>{star}</p> */}

                    </div>

                </div>

            </div>
        </div>





    );
};

export default Review;