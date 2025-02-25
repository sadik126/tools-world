import React from 'react';

const Sectiontitle = ({ title, subtitle, text }) => {
    return (
        <h2 className='text-3xl my-20 text-center uppercase font-mono mt-16 font-bold'>The <span className='text-primary'>{title}</span> </h2>
    );
};

export default Sectiontitle;