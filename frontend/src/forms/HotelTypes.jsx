import React from 'react';
import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../config/hotel-booking-types';

const HotelTypes = () => {
    const { register, formState: {errors}, watch } = useFormContext();
    const hotelType = watch('type');

    return (
        <div>
            <h2 className='text-xl font-semibold mb-4'>Type</h2>
            <div className='grid grid-cols-5 gap-2'>
                {hotelTypes.map((type) => (
                    <label key={type} className={hotelType === type ? "cursor-pointer bg-blue-300 font-semibold text-md px-2 py-2 rounded-full text-center" : "cursor-pointer bg-gray-300 font-semibold text-md px-2 py-2 rounded-full text-center"}>
                        <input type='radio' value={type} {...register('type', { required: "This field is required!!" })} className='hidden'/>
                        <span>{type}</span>
                    </label>
                ))}
                {errors.type && <span className='text-red-500 font-semibold'>{errors.type.message}</span>}
            </div>
        </div>
    )
}

export default HotelTypes;
