import React from 'react';
import sony from '../../../assets/sony-transformed.png';
import benq from '../../../assets/benq-transformed.png';
import kodak from '../../../assets/kodak-transformed.png';
import nikon from '../../../assets/nikon.png';
import eos from '../../../assets/eos-transformed.png';
import solo from '../../../assets/solo-transformed.png';

const Display = () => {
    const brands = [
        { img: sony, name: "Sony" },
        { img: benq, name: "BenQ" },
        { img: kodak, name: "Kodak" },
        { img: nikon, name: "Nikon" },
        { img: eos, name: "EOS" },
        { img: solo, name: "Solo" },
    ];
    
    return (
       
        <div className="text-center my-28">
        <h2 className="text-3xl font-mono uppercase font-bold">
            We Also <span className='text-primary'>Manufacture</span> For
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
            {brands.map((brand, index) => (
                <div key={index} className="flex justify-center">
                    <img
                        src={brand.img}
                        alt={brand.name}
                        className="w-32 md:w-40 transform transition-all duration-300 hover:scale-110 hover:opacity-80"
                    />
                </div>
            ))}
        </div>
    </div>
    );
};

export default Display;