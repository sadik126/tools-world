import React, { useContext, useState } from 'react';
import toast, { ToastBar } from 'react-hot-toast';
import ReactStars from 'react-stars';
import { Authcontext } from '../../Context/Authprovider';

const Reviews = () => {
    const { user } = useContext(Authcontext)
    const [rating, setRating] = useState([])
    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    const submitReview = (e) => {
        e.preventDefault()

        const message = e.target.message.value;

        const review = {
            review: rating,
            message: message,
            reviewer: user?.displayName,
            image: user?.photoURL
        }
        // console.log(review)

        fetch('https://tools-server-five.vercel.app/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)

        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                if (data.acknowledged) {
                    toast.success(`Thanks for your review`)
                    // toast(`Thanks for your review`)
                    // window.alert(`thanks for your contribution`)
                    // reset();
                }


            })


        e.target.message.value = ''
        setRating(null)

    }
    return (
        <>
            <h1 className='text-3xl text-center mt-16'>Give your review on <span className='text-primary'>tools world</span> </h1>

            <div className='flex justify-center items-center flex-col'>
                <p className='text-2xl text-orange-600'>Your Review: </p>

                <form onSubmit={submitReview} className="w-full flex flex-col items-center">
                    <ReactStars size={30}
                        onChange={ratingChanged}
                        count={5}
                        value={rating}
                        color2={'#ffd700'}>

                    </ReactStars>

                    <textarea required name='message' placeholder="Your message" className="textarea textarea-bordered textarea-lg w-[70%]" ></textarea>
                    <button disabled={!rating} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-5">Submit</button>


                </form>



            </div>


            {/* {
                rating
            } */}
            {/* <ToastBar></ToastBar> */}
        </>

    );
};

export default Reviews;