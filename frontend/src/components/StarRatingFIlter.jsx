import React from 'react'

const StarRatingFilter = ({selectedStars, onChange}) => {
  return (
    <div className='border border-b p-3'>
      <h4 className='text-md font-semibold mb-2'>
        Property Rating
      </h4>
      {["5","4","3","2","1"].map((star, index)=>(
        <label className='space-x-2 flex items-center' key={index}>
            <input type='checkbox' value={star} onChange={onChange} className='rounded' checked={selectedStars.includes(star)}></input>
            <span>{star} Stars</span>
        </label>
      ))}
    </div>
  )
}

export default StarRatingFilter;
