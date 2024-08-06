import React, { useState, useEffect } from "react";

const Promotions = ({ title, commission, image }) => {
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

  const cardData = [
    {
      title: "LEVEL 1: BUFFALO",
      commission: "105% Commission",
      description:
        "You’re a newcomer! Stampede towards success and with grit and determination. Remember, even the mightiest herds start with a single buffalo.",
      requirement: "REQUIREMENT :",
      sales: "30 sales/month.",
      managing: "0 managing agents",
      score: "4.3 compliance score",
      image: require("../../../../assets/images/buffalo.png"),
    },
    {
      title: "LEVEL 2: LEOPARD",
      commission: "115% Commission",
      description:
        "Your skills are sharpening, much like a leopard's claws. You're agile and resourceful, adapting swiftly to the sales landscape to secure your place in the hunt.",
      requirement: "REQUIREMENT :",
      sales: "80 sales/month.",
      managing: "5 managing agents (3 buffalo)",
      score: "4.4 compliance score",
      image: require("../../../../assets/images/leopard.png"),
    },

    {
      title: "LEVEL 3: RHINO",
      commission: "130% Commission",
      description:
        "Like a rhino's sturdy armor, you've built resilience. Your consistent efforts and thick skin protect you from setbacks as you charge forward.",
      requirement: "REQUIREMENT :",
      sales: "100 sales/month",
      managing: "15 managing agents (6 leopards, 9 buffalo)",
      score: "4.5 compliance score",
      image: require("../../../../assets/images/rhino.png"),
    },
    {
      title: "LEVEL 4: ELEPHANT",
      commission: "150% Commission",
      description:
        "Your influence is growing, akin to the majestic presence of an elephant. Your strategic approach sets you apart in the sales jungle.",
      requirement: "REQUIREMENT :",
      sales: "100 sales/month, 120 sales once",
      managing: "20 managing agents (5 rhinos, 5 leopards, 10 buffalos)",
      score: "4.6 compliance score",
      image: require("../../../../assets/images/elephant.png"),
    },
    {
      title: "LEVEL 5: LION",
      commission: "180% Commission",
      description:
        "You've reached the pinnacle, embodying the strength and leadership of a lion. Your roar of success echoes, inspiring others to follow your example.",
      requirement: "REQUIRMENT :",
      sales: "150 sales/month",
      managing: "25 managing agents (4 elephants, 6 rhinos, 15 buffalos)",
      score: "4.6 compliance score",
      image: require("../../../../assets/images/lion.png"),
    },
    {
      title: "LEVEL 6: LION+",
      commission: "200% Commission",
      description:
        "",
      requirement: "REQUIRMENT :",
      sales: "180 sales once",
      managing:
        "50 managing agents (3 lions, 12 elephants, 15 rhinos, 20 buffalos)",
      score: "4.6 compliance score",
      image: require("../../../../assets/images/lion.png"),
    },
  ];


  return (
    <div className="bg-[#F4F6FD]">
      <h1 className="xs-text-[20px] sm:text-[30px] md:text-[40px] p-4 font-['TTNormsProBold'] font-[700] pl-[5%] text-[#212060]">
        Promotions
      </h1>
      <div className="sm:ml-[5%] sm:mr-[10%] w-[85%] sm:w-auto mx-auto pb-[3%] ">
        {cardData.map((card, index) => (
          <div className={`text-[#212060] flex-col sm:flex-row bg-white border rounded-[20px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]  flex mb-[3%] ${width < 475 ? "mb-[10%] p-4" : 'mb-[3%] p-6'}  sm:items-center items-start  sm:px-[15px] h-auto`}>
            <div className=" items-center ">
              <img
                src={card.image}
                alt={title}
                className="w-[110px] h-[150px] xs:w-[56px] xs:h-[80px]  object-contain`"
              />
            </div>
            <div className="sm:mt-[0px] mt-[10px] sm:w-[80%] ml-0 sm:ml-8  flex-col ">
              <h2 className=" xs:text-sm sm:text-base md:text-[20px]  font-[TTNormsProBold]">
                {card.title}
              </h2>
              <p className=" xs:text-xs font-[TTNormsProRegular] font-[400] text-[20px]">
                {card.commission}
              </p>
              <p className=" xs:text-xs md:text-[14px] font-[TTNormsProRegular] font-[400] ">
                {card.description}
              </p>
              <h2 className="xs:text-sm sm:text-base md:text-[18px] mt-[10px] font-[TTNormsProBold]">
                {card.requirement}
              </h2>
              <p className=" xs:text-xs md:text-[14px] font-[TTNormsProRegular] font-[400] ">
                {card.sales}
              </p>
              <p className=" xs:text-xs md:text-[14px] font-[TTNormsProRegular] font-[400] ">
                {card.managing}
              </p>
              <p className="sm:mb-1 md:mb-2 lg:mb-3 xl:mb-3 xs:text-xs md:text-[14px] font-[TTNormsProRegular] font-[400] ">
                {card.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Promotions;
