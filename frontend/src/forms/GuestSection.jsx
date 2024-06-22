import React from 'react';
import { useFormContext } from 'react-hook-form';

const GuestSection = () => {
    const {register, formState: {errors}} = useFormContext();
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-semibold mb-4'>Guests</h2>
      <div className='grid grid-cols-2 pt-5 pb-7 pr-2 pl-2 gap-5 bg-gray-300'>
        <label className='text-sm font-semibold'>
            Adults
            <input className="border rounded w-full py-1 px-2" type="number" {...register('adults',{
                required: "This field is required",
                min: 1
            })}/>
            {errors.adults && <span className='text-red-500 font-semibold'>{errors.adults.message}</span>}
        </label>
        
        <label className='text-sm font-semibold'>
            Children
            <input className="border rounded w-full py-1 px-2" type="number" {...register('children',{
                required: "This field is required",
                min: 0
            })} />
            {errors.children && <span className='text-red-500 font-semibold'>{errors.children.message}</span>}
        </label>
      </div>
    </div>
  )
}

export default GuestSection;
