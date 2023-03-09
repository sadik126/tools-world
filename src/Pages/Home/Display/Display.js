import React from 'react';
import sony from '../../../assets/sony-transformed.png';
import benq from '../../../assets/benq-transformed.png';
import kodak from '../../../assets/kodak-transformed.png';
import nikon from '../../../assets/nikon.png';
import eos from '../../../assets/eos-transformed.png';
import solo from '../../../assets/solo-transformed.png';

const Display = () => {
    return (
        <>
            <>
                <div className="text-center my-16 text-3xl font-mono uppercase font-bold">We Aslo <span className='text-primary'>Manufacturer</span>  For</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <img
                        src={sony}
                        alt=""
                        className='w-40 mx-auto'
                    />
                    <img
                        src={benq}
                        alt=""
                        className='w-40 mx-auto'
                    />
                    <img
                        src={kodak}
                        alt=""
                        className='w-40 mx-auto'
                    />
                    <img
                        src={nikon}
                        alt=""
                        className='w-40 mx-auto'
                    />
                    <img
                        src={eos}
                        alt=""
                        className='w-40 mx-auto'
                    />
                    <img
                        src={solo}
                        alt=""
                        className='w-40 mx-auto'
                    />
                </div>
            </>

        </>
    );
};

export default Display;