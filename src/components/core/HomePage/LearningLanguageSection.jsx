import React from 'react';
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAbutton from "./Button";
const LearningLanguageSection = () => {
  return (
    <div >
      <div className='justify-center items-center mt-40 mb-20 flex flex-col gap-5'>
            <div className='text-4xl font-semibold text-center'>
              Your Swiss Knife for <HighlightText text={"Learning any language"} />
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-8/10'>
              Using spin learning multiple language easy. with 20+ languages realistic voiceover process tracking, custom schedule and more.
            </div>

            <div className='flex items-center justify-center mt-5'>
              <img className='translate-x-20 z-0'
                src={know_your_progress}
                alt='know your progress'
              />
              <img className='z-2'
                src={compare_with_others}
                alt='compare with others'
              /> 
              <img className='-translate-x-30 z-3'
                src={plan_your_lesson}
                alt='plan your lessons'
              />
            </div>
            <div>
                <CTAbutton active={true} linkto={"/signup"}>
                    <div>
                      Learn more
                    </div>
                </CTAbutton>
              </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection