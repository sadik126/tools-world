import React from 'react';
import Loading from '../../../../Shared/Loading/Loading';
import quote from '../../../../assets/quote.svg';
import Review from '../../../Reviews/Review';
import { useQuery } from '@tanstack/react-query';
import RightArrow from '../../../../assets/right arrow.png';
import LeftArrow from '../../../../assets/left arrow.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from 'sweetalert2';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Pagination } from "swiper";


const Testimonials = () => {
    const { data: reviews = [], isError, isLoading, refetch } = useQuery({
        queryKey: ['tools'],
        queryFn: async () => {
            const res = await fetch('http://localhost:4040/review')
            const data = await res.json()
            return data
        }
    })


    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} alt="nextArrow" {...props} />
    );

    // const settings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     initialSlide: 0,
    //     prevArrow: <SlickArrowLeft />,
    //     nextArrow: <SlickArrowRight />,
    // };

    const Settings = {

        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        // prevArrow: <SlickArrowLeft />,
        // nextArrow: <SlickArrowRight />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]


    }



    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) {
        return Swal.fire({
            title: "Fetch Error",
            text: "Can Not Fatch Our tools",
            icon: "error",
        })
    }
    return (
        <section className='my-28' data-aos="fade-right">
            <div className='flex justify-between'>
                <div  >
                    <h4 className='text-xl text-primary font-bold' >Testimonials</h4>
                    <h2 className='text-3xl'>whats our <span>Customers</span>  say?</h2>

                </div>
                <div>
                    <img src={quote} className="w-14  lg:w-48" alt="" />
                </div>
            </div>
            <div className='grid grid-cols-1 gap-3 m-8  h-full'>

                <Slider  {...Settings}>

                    {
                        [...reviews].reverse().map(review => <Review key={review._id} review={review}></Review>)
                    }


                </Slider>



                {/* <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div> */}











            </div>

        </section>
    );
};

export default Testimonials;