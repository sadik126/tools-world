import React from 'react';
import { Dna } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='flex justify-center my-16'>
            <Dna className='mx-auto'
                visible={true}
                height="280"
                width="280"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default Loading;