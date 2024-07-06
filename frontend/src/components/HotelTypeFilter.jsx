import React from 'react'
import { hotelTypes } from '../config/hotel-booking-types'

const HotelTypeFilter = ({selectedTypes, onChange}) => {
  return (
    <div className='border-b border p-3'>
      <h4 className='text-md font-semibold mb-2'>Hotel Type</h4>
        {hotelTypes.map((type, index)=>(
            <label className='flex items-center space-x-2' key={index}>
                <input type='checkbox'
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={onChange}
                className='rounded'></input>
                <span>{type}</span>
            </label>
        ))}
    </div>
  )
}

export default HotelTypeFilter;
