import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-[#90e0ef] via-[#00b4d8] to-[#0077b6] bg-clip-text text-transparent'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText