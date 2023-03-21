import React from 'react';
import Banner from '../Banner/Banner';
import Business from '../Business/Business';
import Display from '../Display/Display';
import Toolscare from '../Toolscare/Toolscare';
import Contactus from './Contact/Contactus';
import Steps from './Steps/Steps';
import Testimonials from './Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Business></Business>
            <Display></Display>
            <Toolscare></Toolscare>
            <Steps></Steps>
            <Testimonials></Testimonials>
            <Contactus></Contactus>
        </div>
    );
};

export default Home;