import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Data is loading</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" fill="none" strokeWidth="5" stroke="#1d3f72">
          <animate
            attributeName="stroke-dasharray"
            begin="0s"
            dur="2s"
            values="0 300;300 300;300 0;0 300"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            begin="0s"
            dur="2s"
            values="0 -300;-300 -300;-300 0;0 -300"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
 
  );
};

export default Loading;
