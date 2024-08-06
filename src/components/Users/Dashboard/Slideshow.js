import { useEffect, useRef, useState } from 'react';

const colors = ['#0088FE', '#00C49F', '#FFBB28'];

function Slideshow({ dashboardData }) {
  const [colors, setColors] = useState([])
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
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

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors?.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const [sales, setSales] = useState({
    dailysales: 0,
    monthlysales: 0,
    alltimesales: 0
  })
  useEffect(() => {

    setSales({
      dailysales: dashboardData?.todaypolicy?.length ? dashboardData?.todaypolicy?.length : 0,
      monthlysales: dashboardData?.monthlypolicy?.length ? dashboardData?.monthlypolicy?.length : 0,
      alltimesales: dashboardData?.alltimepolicy?.length ? dashboardData?.alltimepolicy?.length : 0
    })
  }, [dashboardData])

  useEffect(() => {
    setColors(dashboardData?.goals?.filter((item, index) => {
      if (sales?.dailysales < 5 && item?.id == 'd1') {
        return item
      } else if (sales?.dailysales >= 5 && sales?.dailysales < 10 && item?.id == 'd2') {
        return item
      } else if (sales?.dailysales >= 10 && sales?.dailysales < 15 && item?.id == 'd3') {
        return item
      } else if (sales?.dailysales >= 15 && sales?.dailysales < 20 && item?.id == 'd4') {
        return item
      } else if (sales?.dailysales >= 20 && item?.id == 'd5') {
        return item
      } else if (sales?.monthlysales < 100 && item?.id == 'm1') {
        return item
      } else if (sales?.monthlysales >= 100 && sales?.monthlysales < 120 && item?.id == 'm2') {
        return item
      } else if (sales?.monthlysales >= 120 && sales?.monthlysales < 150 && item?.id == 'm3') {
        return item
      } else if (sales?.monthlysales >= 150 && sales?.monthlysales < 180 && item?.id == 'm4') {
        return item
      } else if (sales?.monthlysales >= 180 && item?.id == 'm5') {
        return item
      } else if (sales?.alltimesales < 50 && item?.id == 'a1') {
        return item
      } else if (sales?.alltimesales >= 50 && sales?.alltimesales < 100 && item?.id == 'a2') {
        return item
      } else if (sales?.alltimesales >= 100 && sales?.alltimesales < 500 && item?.id == 'a3') {
        return item
      } else if (sales?.alltimesales >= 500 && sales?.alltimesales < 1000 && item?.id == 'a4') {
        return item
      } else if (sales?.alltimesales >= 1000 && item?.id == 'a5') {
        return item
      }
    }))
  }, [sales])

  return (
    <div className={`${width < 1250 ? 'max-w-[160px]' : 'max-w-[200px] '} overflow-hidden mx-auto my-auto`}>
      <div
        className="whitespace-nowrap duration-1000 ease-in-out"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors?.map((item, index) => (
          <div
            className="bg-white border px-1 py-2 border-green-200 shadow-lg inline-block   w-[100%]"
            key={index}
          >
            {/* <div className='flex-wrap w-full text-center items-center justify-center'>
              <p className="text-[13px] leading-4 font-bold text-alpha-primary font-['TTNormsProBold'] whitespace-pre-line py-1 ">
                {item?.type}
              </p>
            </div> */}
            <div className="flex flex-row items-center justify-center pl-2 w-full ">
              <div className="relative ">
                <img
                  className="object-cover inset-0 ring-alpha-primary ring-2 rounded-full m-auto w-16"
                  src={require('../../../assets/images/avatar.png')}
                  alt="Card Image"
                />
              </div>
              <div className='flex-wrap'>
                <p className="text-[12px] leading-4 font-bold text-alpha-primary font-['TTNormsProBold'] whitespace-pre-line py-1 px-2">
                  {item?.name}
                </p>
              </div>
            </div>
            <h3 className="text-[14px] leading-5 font-semibold text-gray-400 p-1 whitespace-pre-line">
              {item?.goal?.substring(0, 70) + '...'}
            </h3>
          </div>
        ))}
      </div>

      <div className="text-center">
        {colors?.map((_, idx) => (
          <div
            key={idx}
            className={`${index === idx ? ' bg-gray-500' : ''
              } inline-block h-2 w-2 rounded-full cursor-pointer bg-gray-300 ms-3 me-0.5  mt-3`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
