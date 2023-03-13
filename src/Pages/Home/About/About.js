import React from 'react';
import tool from '../../../assets/work.jpg'

const About = () => {
    return (
        <div className='banner min-h-full'>
            <div className="hero py-24">
                <div className="hero-content  flex-col lg:flex-row-reverse">
                    <img className='w-full sm:w-100 md:max-w-md rounded-lg shadow-2xl' src={tool} />
                    <div className='w-full  md:w-1/2'>
                        <h1 className="text-5xl font-bold">Computer tools can bring a wide range of  </h1>
                        <h1 className="text-5xl font-bold">benefits to individuals, businesses, and organizations</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-accent">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;