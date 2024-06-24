import React from 'react';
import { useFormContext } from 'react-hook-form';

const DetailsSection = () => {
    const {register, formState: {errors}} = useFormContext();
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-bold text-2xl mb-4'>Add Hotel</h1>
      <label className='font-semibold text-l flex-1'>
        Name
        <input type="text" {...register("name",{
            required: "This Field is required",
        })} className='mt-2 w-full px-2 py-1 rounded font-normal border border-gray-400' />
        {errors.name && <span className='text-red-500 font-semibold'>{errors.name.message}</span>}
      </label>
      <div className='flex flex-row space-x-5'>
        <label className='font-semibold text-l flex-1'>
            City
            <input type="text" {...register("city",{
                required: "This Field is required",
            })} className='mt-2 w-full px-2 py-1 rounded font-normal border border-gray-400' />
            {errors.city && <span className='text-red-500 font-semibold'>{errors.city.message}</span>}
        </label>
        <label className='font-semibold text-l flex-1'>
            Country
            <input type="text" {...register("country",{
                required: "This Field is required",
            })} className='mt-2 w-full px-2 py-1 rounded font-normal border border-gray-400' />
            {errors.country && <span className='text-red-500 font-semibold'>{errors.country.message}</span>}
        </label>
      </div>
      <label className='font-semibold text-l flex-1'>
        Description
        <textarea rows={5} {...register("description",{
            required: "This Field is required",
        })} className='mt-2 w-full px-2 py-1 rounded font-normal border border-gray-400' />
        {errors.description && <span className='text-red-500 font-semibold'>{errors.description.message}</span>}
      </label>
      <label className='font-semibold text-l flex-1'>
        Price Per Night
        <input defaultValue={0.0} type='number' {...register("pricePerNight",{
            validate: (value)=>{
                if(value<=0){
                    return "Price cannot be less than or equal to zero"
                }
                return true
            }
        })} className='mt-2 w-full px-2 py-1 rounded font-normal border border-gray-400' />
        {errors.pricePerNight && <span className='text-red-500 font-semibold'>{errors.pricePerNight.message}</span>}
      </label>
      <label className='font-semibold text-l gap-2 flex-1'>
        Star Rating
        <select {...register("starrating", {
            required: "Please provide a rating for the hotel",
            validate: (value)=>value !== "0" || "Please provide a rating for the hotel"
        })} className='border border-gray-400 rounded ml-2'>
            <option key={0} value={0}>
                Please select a option
            </option>
            <option key={1} value={1}>
                1 Star
            </option>
            <option key={2} value={2}>
                2 Star
            </option>
            <option key={3} value={3}>
                3 Star
            </option>
            <option key={4} value={4}>
                4 Star
            </option>
            <option key={5} value={5}>
                5 Star
            </option>
        </select>
        {errors.starrating && <span className='text-red-500 font-semibold ml-2'>{errors.starrating.message}</span>}
      </label>
    </div>
  )
}

export default DetailsSection
