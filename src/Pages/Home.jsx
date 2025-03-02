import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
const Home = () => {
  return (
    <div>
        {/* section 1 */}
        <div className='relative flex flex-col mx-auto w-11/12 items-center text-white justify-between'>
            <Link to={"/signup"}>

                <div className='mt-16 p-2 mx-auto rounded-full bg-richblack-800 font-bold
                text-richblue-200 transition-all duration-200 hover:scale-95 group'>
                    <div className='flex flex-row items-center justify-center my-auto mx-auto gap-x-2 rounded-full px-5 py-1
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>

            </Link>

            <div className='text-center text-4xl font-bold mt-7'>
                Empower Your future with
                <HighlightText text={"Coding Skills"}/>
            </div>
            <div className='mt-4 w-[55%] text-center text-sm font-bold text-richblack-300'>
                With our online courses, you can learn at your own pace, from anywhere in the world, and get access to wealth of resources, including hands-on Projects, quizzer, and personalized feedback from instructor.
            </div>

            <div className='flex my-12 flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
            </div>

            <div className=' shadow-blue-200 shadow-[0px_-5px_50px_-10px] mb-10 w-[70%] rounded-2xl border-b-10 border-r-10 border-b-white border-r-white'>
                <video muted loop autoPlay className=''>
                    <source src={Banner} />
                </video>

            </div>

        </div>
    </div>
  )
}

export default Home