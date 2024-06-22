import React from 'react';
import { useFormContext } from 'react-hook-form';
import { hotelFacilities } from '../config/hotel-booking-types';

const HotelFacilities = () => {
    const { register, formState: { errors }, watch } = useFormContext();

    return (
        <div>
            <h2 className='text-xl font-semibold mb-4'>Facilities</h2>
            <div className='grid grid-cols-5 gap-2'>
                {hotelFacilities.map((facility) => (
                    <label key={facility} className='flex items-center text-sm gap-1'>
                        <input type='checkbox' value={facility} {...register('facilities',{
                            validate: (facilities)=>{
                                if(facilities.length<=0){
                                    return "Please select atleast one facility";
                                }
                                return true;
                            }
                        })}/>
                        <span>{facility}</span>
                    </label>
                ))}
            </div>
            {errors.facilities && <span className='text-red-500 font-semibold'>{errors.facilities.message}</span>}
        </div>
    );
};

export default HotelFacilities;
