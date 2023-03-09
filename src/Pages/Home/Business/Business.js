import React, { useState } from 'react';
import man from '../../../assets/mans-transformed.png'
import bee from '../../../assets/cartoon-bee-with-money-vector-709370-transformed.png'
import delivery from '../../../assets/fast-delivery-icon-vector-transformed.png'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
const Business = () => {
    const [counterOn, setcounterOn] = useState(false)
    return (
        <>
            <h2 className='text-3xl text-center uppercase font-mono mt-16 font-bold'>The <span className='text-primary'>Bussiness summary</span> </h2>

            <div class="p-20  mb-12 grid items-center justify-around grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                <div class="stat text-center">
                    <div class="stat-figure text-primary">
                        <img src={man} className="w-20" alt="" />
                    </div>
                    <div class="stat-title">Total Customar</div>

                    <ScrollTrigger onEnter={() => setcounterOn(true)} onExit={() => setcounterOn(false)}></ScrollTrigger>

                    <div class="stat-value text-primary">{counterOn && <CountUp delay={0.2} end={15.6} duration={0.5} scrollSpyDelay={1000} scrollSpyOnce={true}></CountUp>} K </div>
                    <div class="stat-desc">22% more than last month</div>
                </div>

                <div class="stat text-center">
                    <div class="stat-figure text-secondary">
                        <img src={delivery} className="w-20" alt="" />
                    </div>
                    <div class="stat-title">Total Deliverd Quantity</div>
                    <div class="stat-value text-secondary">{counterOn && <CountUp delay={0.2} end={2.6} duration={0.5} scrollSpyDelay={1000} scrollSpyOnce={true}></CountUp>}M</div>
                    <div class="stat-desc">30% more than last year</div>
                </div>
                <div class="stat text-center">
                    <div class="stat-figure text-primary">
                        <img src={bee} className="w-20" alt="" />
                    </div>
                    <div class="stat-title">Total Earn</div>
                    <div class="stat-value text-primary">{counterOn && <CountUp delay={0.2} end={25.6} duration={0.5} scrollSpyDelay={1000} scrollSpyOnce={true}></CountUp>}M</div>
                    <div class="stat-desc">15% more than last 6 Month</div>
                </div>


            </div>


        </>
    );
};

export default Business;