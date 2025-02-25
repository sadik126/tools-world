import React from 'react';

const Greadientbutton = ({text}) => {
    return (
        <div>
           {/* <button className="relative px-6 py-3 font-bold text-white rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 animate-gradient transition-all duration-500 ease-in-out hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500 before:via-blue-500 before:to-indigo-500 before:opacity-0 hover:before:opacity-100 hover:before:transition-opacity hover:before:duration-1000">
      {text}
    </button>  */}

<button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">{text}</button>
        </div>
    );
};

export default Greadientbutton;