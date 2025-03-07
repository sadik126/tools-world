import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import ReactStars from "react-stars"; // ⭐ Import React Stars

const ReviewSlider = () => {
    const { data: reviews = [], isError, isLoading } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await fetch("http://localhost:4040/review");
            const data = await res.json();
            return data;
        },
    });

    return (
        <section className="w-full py-24 px-6 lg:px-20 flex justify-center">
            <div className="max-w-6xl w-full text-center">
                <h2 className="text-4xl font-bold text-center mb-4">Happy Client Works</h2>

                {/* 🔹 Custom Divider Design */}
                <div className="flex justify-center items-center mb-12">
                    <div className="w-20 h-1 bg-blue-500 rounded-lg"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-2"></div>
                    <div className="w-20 h-1 bg-blue-500 rounded-lg"></div>
                </div>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    className="py-12 flex justify-center"
                >
                    {[...reviews].reverse().map((review) => (
                        <SwiperSlide key={review.id} className="flex justify-center">
                            <div className="max-w-lg h-[320px] shadow-lg bg-white/20 backdrop-blur-lg p-8 rounded-xl flex flex-col justify-between relative">
                                <FaQuoteLeft className="text-5xl text-blue-500 absolute top-6 left-6 opacity-20" />
                                <p className="text-lg italic flex-grow">{review.message}</p>

                                {/* ⭐ Rating Stars */}
                                <div className="flex justify-center mt-4">
                                    <ReactStars
                                        count={5}
                                        value={review.review}
                                        size={24}
                                        color2={"#ffd700"}
                                        edit={false}
                                    />
                                </div>

                                <div className="flex flex-col items-center mt-2">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500">
                                        <img src={review.image} alt={review.reviewer} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="text-lg font-semibold mt-2">{review.reviewer}</h4>
                                    <p className="text-gray-500">{review.role}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ReviewSlider;
