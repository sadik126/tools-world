import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import ReactStars from 'react-stars';
import { Authcontext } from '../../Context/Authprovider';

const Reviews = () => {
    const { user } = useContext(Authcontext);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(false); // ✅ লোডিং স্টেট

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const submitReview = async (e) => {
        e.preventDefault();

        if (loading) return; // ✅ যদি ইতিমধ্যে সাবমিট হয়, তাহলে ব্লক করো

        setLoading(true); // ✅ সাবমিশনের আগে লোডিং true করে দাও

        const message = e.target.message.value;
        const review = {
            review: rating,
            message: message,
            reviewer: user?.displayName,
            image: user?.photoURL,
        };

        try {
            const res = await fetch('http://localhost:4040/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });

            const data = await res.json();

            if (data.acknowledged) {
                toast.success('Thanks for your review!');
                e.target.reset(); // ✅ ফর্ম রিসেট
                setRating(null); // ✅ রেটিং রিসেট
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false); // ✅ সাবমিশনের পর লোডিং false
        }
    };

    return (
        <>
            <h1 className='text-3xl text-center mt-16'>
                Give your review on <span className='text-primary'>Tools World</span>
            </h1>

            <div className='flex justify-center items-center flex-col'>
                <p className='text-2xl text-orange-600'>Your Review:</p>

                <form onSubmit={submitReview} className="w-full flex flex-col items-center">
                    <ReactStars
                        size={30}
                        onChange={ratingChanged}
                        count={5}
                        value={rating}
                        color2={'#ffd700'}
                    />

                    <textarea
                        required
                        name='message'
                        placeholder="Your message"
                        className="textarea textarea-bordered textarea-lg w-[70%]"
                    ></textarea>

                    <button
                        disabled={!rating || loading}
                        className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-5"
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Reviews;
