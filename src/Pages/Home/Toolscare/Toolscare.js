import React from 'react';
import eng from '../../../assets/engineer.jpg'
import image2 from '../../../assets/cat1.jpg'
// React
// import { motion } from "motion/react"
import { motion } from 'framer-motion';
import Sectiontitle from '../../../Shared/Sectiontitle/Sectiontitle';
import Greadientbutton from '../../../Shared/Gradientbutton/Greadientbutton';

// React Server Components
// import * as motion from "motion/react-client"

const Toolscare = () => {
    return (
        <div className='my-52'>
            <Sectiontitle title={'Execptional tools'}></Sectiontitle>
            <div className="hero h-96 " data-aos="fade-right">
        
        <div className="hero-content flex-col lg:flex-row gap-24">
            <div className="lg:w-1/2 relative">

            <motion.img 
src={eng} 
className="w-[87%] rounded-lg shadow-2xl"
whileHover={{ scale: 1.1, rotate: 2 }}
transition={{ type: "spring", stiffness: 300 }}


/>

            <img
              src={image2}
              className="w-3/4 absolute right-2 top-40 rounded-lg shadow-2xl"
            />

            </div>
       


            {/* <img style={{ width: '100%' }} src={eng} className="max-w-sm rounded-lg shadow-2xl" /> */}
            <div className='lg:w-1/2'>
                <h1 className="md:text-7xl text-3xl font-bold">Exceptional <span className='text-accent'>Tools</span> </h1>
                <h1 className="md:text-7xl text-3xl font-bold">Care, on Your Terms</h1>
                <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web pag</p>
                {/* <button className="btn btn-accent rounded-2xl">Get Started</button> */}
                <Greadientbutton text="Get Started" />
                
            </div>
        </div>
    </div>
        
        </div>
      
    );
};

export default Toolscare;