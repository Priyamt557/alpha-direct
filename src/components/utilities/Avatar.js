import React, { useState, useEffect } from 'react'







const Avatar = ({ img_src, calledFrom }) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };

  }, [window.innerWidth])

  return (

    <img
      className={`object-cover   inset-0 aspect-square ring-alpha-primary ${width < 1350 ? 'ring-2' : 'ring-4'} rounded-full m-auto ${calledFrom == 'My-Agents' ? "w-[100%] h-[85%]" : "w-16 h-16"} `}
      src={img_src === null || img_src === undefined ? require('../../assets/images/avatar.png') : img_src.includes("https://") ? img_src : "https://d20dgglp0tqnyi.cloudfront.net/" + img_src}
      alt="Avatar"
    />

  );
};

export default Avatar;



