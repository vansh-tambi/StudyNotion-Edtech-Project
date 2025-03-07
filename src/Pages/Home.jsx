import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';

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

            <div className='flex flex-col gap-y-10 mt-12'>
                <CodeBlocks 
                    positioning={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-bold'>
                            Unlock your <HighlightText text={"Coding Potential"}/> with our online Courses
                        </div>
                    }

                    subHeading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }

                    ctabtn2={
                        {
                            btnText:"Learn More",
                            active:false,
                            linkto:"/login",
                        }
                    }
                    codeblock={
                        `<!doctype html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Study Notion</title>
                        </head>
                        <body>
                        </body>
                        </html>
                    `}

                    codeColor={"text-yellow-25"}
                />

                <CodeBlocks 
                    positioning={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-bold'>
                            Start <HighlightText text={"coding in seconds"}/>
                        </div>
                    }

                    subHeading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkto:"/signup",
                            active:true
                        }
                    }

                    ctabtn2={
                        {
                            btnText:"Learn More",
                            active:false,
                            linkto:"/login",
                        }
                    }
                    codeblock={
                        `<!doctype html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Study Notion</title>
                        </head>
                        <body>
                        </body>
                        </html>
                    `}

                    codeColor={"text-yellow-25"}
                />
            </div>
        </div>
        
        <div className='bg-puregreys-5  text-richblack-700'>
            <div className='homepage_bg h-[310px] '>
            
                        <div className='w-11/12 my-auto max-w-maxContent flex items-center justify-center gap-5  mx-auto '>
                            <div className='flex flex-row gap-7 text-white mt-33 mb-10' >
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className='flex gap-x-3 items-center font-bold'>Explore full catalog <FaArrowRight/></div>
                                </CTAButton>

                                <CTAButton active={false} linkto={"/login"}>
                                    <div className='flex gap-x-3 items-center font-bold'>Learn more <FaArrowRight/></div>
                                </CTAButton>
                            </div>
                        </div>

                        
            </div>


            <div className="w-11/12 mx-auto mt-10 flex flex-col items-center justify-between">
                <div className="flex flex-row  mb-20  gap-20 justify-center">
                     <div className="text-4xl font-semibold w-1/3">
                        Get the Skills the <HighlightText text={"job that is in demand"} />
                    </div>

                        <div className="flex flex-col gap-y-10 items-start w-1/3">
                            <div className="text-[16px]">
                                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist
                                requires more than professional skills.
                            </div>
                    <CTAButton active={true} linkto={"/signup"}>Learn more</CTAButton>
                </div>
            </div>

    <TimeLineSection />
    <LearningLanguageSection />
    </div>
     </div>
     <div>

     </div>

     
    </div>
  )
}

export default Home