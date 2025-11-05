import React from 'react'

const ExtraLargeTitle = ({className , text}) => {
  return (
    <h1 className={`text-2xl md:text-3xl lg:text-4xl ${className}`}>{text}</h1>
  )
}

export default ExtraLargeTitle