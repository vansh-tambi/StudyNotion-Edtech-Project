import React from 'react';
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineimage from "../../../assets/Images/TimelineImage.png";

const timeline =[
  {
    Logo: logo1,
    heading: "Leadership",
    Description:"Fully committed to the success company",
  },
  {
    Logo: logo2,
    heading: "Required",
    Description:"Students will always be our top priority",
  },
  {
    Logo: logo3,
    heading: "Flexibility",
    Description:"The ability to switch in an important skills",
  },
  {
    Logo: logo4,
    heading: "Solve the problem",
    Description:"Code your way to a solution",
  },

]

const TimeLineSection = () => {
  return (
    <div>
        <div className=" w-full flex flex-row gap-10 items-center justify-center">

          <div className='flex flex-col w-[45%] gap-5'>
        {
          timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-x-6" key={index}>
                {/* Left Section: Logo + Line */}
                <div className="flex flex-col items-center">
                  {/* Logo */}
                  <div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center">
                    <img src={element.Logo} />
                  </div>

                  {/* Dotted Line (Only show if it's NOT the last item) */}
                  {index < timeline.length - 1 && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-1 h-2 bg-puregreys-200"></div>
                      <div className="w-1 h-2 bg-puregreys-200"></div>
                      <div className="w-1 h-2 bg-puregreys-200"></div>
                      <div className="w-1 h-2 bg-puregreys-200"></div>
                      <div className="w-1 h-2 bg-puregreys-200"></div>
                    </div>
                  )}
                </div>

                {/* Right Section: Text */}
                <div className="flex flex-col">
                  <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })
        }

              
          </div>
          
          <div className='relative flex items-center justify-center'>
          <img src={timelineimage} className="shadow-white object-cover h-fit max-w-full" />


          <div className='w-9/12 absolute bg-caribbeangreen-700 right-10 -bottom-15 flex rounded-xl text-white uppercase py-10'>
              <div className='flex items-center gap-5 border-r border-caribbeangreen-300 px-7'>
                <p className='text-3xl font-bold'>10</p>
                <p className='text-caribbeangreen-100 text-sm'>Years of Experience</p>
              </div>

              <div className='flex items-center gap-5 px-7'>
                <p className='text-3xl font-bold'>250</p>
                <p className='text-caribbeangreen-100 text-sm'>Type of courses</p>
              </div>

          </div>
              
          </div>  

          




        </div>
    </div>
  )
}

export default TimeLineSection