import React from 'react';
import tool from '../../../assets/laptop.jpg'
import Greadientbutton from '../../../Shared/Gradientbutton/Greadientbutton';
import Typical from 'react-typical';

const Banner = () => {
    return (
        <>
            {/* <div className='banner min-h-full'>
                <div className="hero py-24">
                    <div className="hero-content  flex-col lg:flex-row-reverse">
                        <img className='w-full sm:w-100 md:max-w-md rounded-lg shadow-2xl' src={tool} />
                        <div className='w-full  md:w-1/2'>
                            <h1 className="text-5xl font-bold">Your New Smile Starts</h1>
                            <h1 className="text-5xl font-bold">Here</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary rounded-2xl">Get Started</button>
                        </div>
                    </div>
                </div>
            </div> */}

<div className="relative min-h-screen flex items-center justify-center bg-base-100 text-base-content">
<div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 dark:from-blue-800 dark:via-purple-700 dark:to-pink-600 opacity-50 blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center relative">
      
        {/* Text Content */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="md:text-7xl text-3xl font-extrabold">
            Upgrade Your <span className="text-primary">PC</span> with{" "}
            <span className="text-secondary"> <Typical
        steps={['Tools', 1000, 'Tools world!', 500]}
        loop={Infinity}
        wrapper="p"
      /></span>
          </h1>
          <p className="mt-4 text-lg">
          Discover the ultimate destination for high-performance PC components at Tools World! Whether you're a gamer, content creator, or tech enthusiast, we bring you top-quality processors, graphics cards, motherboards, and more—at unbeatable prices. Upgrade your setup with cutting-edge hardware and experience seamless performance like never before. Don't settle for less—shop now and build your dream PC today!
          </p>
          <div className="mt-5">
      <Greadientbutton text="Shop now" />
    </div>
          

        </div>

        {/* Image with Background Effect */}
        <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0 relative">
          <div className="absolute inset-0 flex justify-center items-center">
            {/* Background Gradient behind the image */}
            <div className="w-80 h-80 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-2xl"></div>
          </div>
          <div className="absolute top-5 left-32 w-48 h-72 rounded-full bg-gradient-to-r from-green-300 via-cyan-300 to-teal-300 dark:from-green-800 dark:via-cyan-700 dark:to-teal-600 opacity-40 blur-3xl"></div>
<div className="absolute bottom-16 right-20 w-80 h-80 rounded-full bg-gradient-to-r from-orange-300 via-yellow-300 to-red-300 dark:from-orange-800 dark:via-yellow-700 dark:to-red-600 opacity-50 blur-3xl"></div>



          <img
            src={tool}
            alt="PC Parts"
            className="relative rounded-lg shadow-2xl w-full max-w-md"
          />
        </div>
      </div>
    </div>


        </>
    );
};

export default Banner;