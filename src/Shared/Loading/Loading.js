import React from 'react';
import { Dna } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full height to center vertically
            width: "100%", // Full width to center horizontally
          }}>
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