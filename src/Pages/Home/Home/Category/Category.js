import React from 'react';
import Sectiontitle from '../../../../Shared/Sectiontitle/Sectiontitle';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import slide1 from '../../../../assets/cat5.jpg'
import slide2 from '../../../../assets/cat2.jpg'
import slide3 from '../../../../assets/cat3.jpg'
import slide4 from '../../../../assets/cat44.jpg'
import slide5 from '../../../../assets/cat56.jpg'


const Category = () => {
    return (
  //       <div className='w-3/4 mx-auto'>
  //         <Sectiontitle title={'Popular Categories'} subtitle={'here is details'}></Sectiontitle>
  //           <Swiper
  //      spaceBetween={30}
  //      loop={true} 
  //      centeredSlides={true}
  //      autoplay={{
  //        delay: 3000,
  //        disableOnInteraction: false,
  //      }}
  //      pagination={{
  //        clickable: true,
  //      }}
  //      navigation={true}
  //      modules={[Autoplay, Pagination, Navigation]}
  //      className="mySwiper"
  //     >
  //       <SwiperSlide className="relative">
  //       <img src={slide1} alt="" className="rounded-lg shadow-lg" />
  // <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //   <h3 className="md:text-4xl text-xl uppercase text-white font-bold transition-all duration-300 hover:scale-110">
  //     Gaming Console
  //   </h3>
  // </div>
  //       </SwiperSlide>
  //       <SwiperSlide className='relative'>
  //       <img src={slide2} alt="" className="rounded-lg shadow-lg" />
  // <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //   <h3 className="md:text-4xl text-xl uppercase text-white font-bold transition-all duration-300 hover:scale-110">
  // RGB
  //   </h3>
  // </div>
  //       </SwiperSlide>
  //       <SwiperSlide>
  //       <img src={slide3} alt="" className="rounded-lg shadow-lg" />
  // <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //   <h3 className="md:text-4xl text-xl uppercase text-white font-bold transition-all duration-300 hover:scale-110">
  //     CPU
  //   </h3>
  // </div>
  //       </SwiperSlide>
  //       <SwiperSlide>
  //       <img src={slide4} alt="" className="rounded-lg shadow-lg" />
  // <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //   <h3 className="md:text-4xl text-xl uppercase text-white font-bold transition-all duration-300 hover:scale-110">
  //     VR Console
  //   </h3>
  // </div>
  //       </SwiperSlide>
  //       <SwiperSlide>
  //       <img src={slide1} alt="" className="rounded-lg shadow-lg" />
  // <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //   <h3 className="md:text-4xl text-xl uppercase text-white font-bold transition-all duration-300 hover:scale-110">
  //     VR Console
  //   </h3>
  // </div>
  //       </SwiperSlide>
  //       <SwiperSlide>
  //       <img src={slide2} alt="" className="rounded-lg shadow-lg" />
  // <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //   <h3 className="md:text-4xl text-xl uppercase text-white font-bold transition-all duration-300 hover:scale-110">
  //     VR Console
  //   </h3>
  // </div>
  //       </SwiperSlide>
  //       {/* <SwiperSlide>
  //         <img src={slide5} alt="" />
  //         <h3 className="md:text-4xl text-xl uppercase text-center -mt-16 text-white">
  //           Motherboard
  //         </h3>
  //       </SwiperSlide> */}
  //       {/* <SwiperSlide>
  //         <img src={slide5} alt="" />
  //         <h3 className="md:text-4xl text-xl uppercase text-center -mt-16 text-white">
  //           Salads
  //         </h3>
  //       </SwiperSlide> */}
  //     </Swiper>
  //       </div>

  <div className='w-full md:w-3/4 mx-auto px-4'>
  <Sectiontitle title={'Popular Categories'} subtitle={'Here are the details'}></Sectiontitle>
  <Swiper
     spaceBetween={20}
     loop={true} 
     loopAdditionalSlides={3} // ✅ Fix: Large screen এ loop ঠিক রাখতে সাহায্য করবে
     watchOverflow={false} // ✅ Fix: যখন slides কম থাকে তখনও loop চালু রাখবে
     autoplay={{
       delay: 3000,
       disableOnInteraction: false,
     }}
     pagination={{ clickable: true }}
     navigation={true}
     modules={[Autoplay, Pagination, Navigation]}
     
     slidesPerView={1} // Default for small screens
     breakpoints={{
       640: { slidesPerView: 2 }, // Tablet
       1024: { slidesPerView: 3, loop: true }, // Large screens → loop on
       1280: { slidesPerView: 4, loop: true }, // Extra large screens → loop on
     }}
  >
    {[slide1, slide2, slide3, slide4, slide5 , slide1 , slide2 , slide3].map((slide, index) => (
      <SwiperSlide key={index} className="relative">
        <img src={slide} alt="" className="rounded-lg shadow-lg w-full h-60 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h3 className="md:text-4xl text-xl uppercase text-white font-bold transition-all duration-300 hover:scale-110">
            {["Gaming Console", "RGB", "CPU", "VR Console", "Motherboard" , "Gaming Console", "RGB", "CPU"][index]}
          </h3>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  
</div>
    );
};

export default Category;