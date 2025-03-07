import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Review = ({ review }) => {
    // ⭐ রেটিং অনুযায়ী স্টার রেন্ডারিং ফাংশন
    const generateStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => {
            const fullStar = index + 1; // পুরো স্টার চেক
            const halfStar = index + 0.5; // অর্ধেক স্টার চেক

            return (
                <span key={index} className="text-yellow-500 text-lg">
                    {rating >= fullStar ? (
                        <FaStar />
                    ) : rating >= halfStar ? (
                        <FaStarHalfAlt />
                    ) : (
                        <AiOutlineStar />
                    )}
                </span>
            );
        });
    };

    return (
        <div className="card bg-base-100 shadow-lg rounded-lg p-5 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="card-body">
                <p className="">
                    {review?.message?.length > 200 ? review.message.slice(0, 200) + "..." : review.message}
                </p>

                <div className="flex items-center gap-4 mt-4">
                    <div className="avatar">
                        <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                            <img src={review.image} alt={review.reviewer} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold">{review.reviewer}</h4>
                        <div className="flex">{generateStars(review.review)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
