import React from 'react'
import { hotelFacilities } from '../config/hotel-booking-types'

const HotelFacilitiesFilter = ({selectedFacilities, onChange}) => {
  return (
    <div className='border border-b p-3'>
      <h4 className='text-md font-semibold mb-2'>
        Facilities
      </h4>
      {hotelFacilities.map((facility,index)=>(
        <label className='flex items-center space-x-2' key={index}>
            <input type='checkbox' value={facility} onChange={onChange} checked={selectedFacilities.includes(facility)} className='rounded'/>
            <span>{facility}</span>
        </label>
      ))}
    </div>
  )
}

export default HotelFacilitiesFilter
