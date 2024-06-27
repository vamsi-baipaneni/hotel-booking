import React, { useEffect } from 'react'
import {useForm, FormProvider} from 'react-hook-form';
import DetailsSection from './DetailsSection';
import HotelTypes from './HotelTypes';
import HotelFacilities from './HotelFacilities';
import GuestSection from './GuestSection';
import ImageSection from './ImageSection';

const ManageHotelForm = ({onSave,isLoading,hotelData}) => {
  const methods = useForm({
    defaultValues: {
      facilities: [],
      //imageFiles: FileList,
    }
  });

  const {handleSubmit, reset} = methods;

  useEffect(()=>{
    reset(hotelData);
  }, [hotelData,reset]);

  const onSubmit = handleSubmit((formDataJson)=>{
    const formData = new FormData();
    formData.append('name',formDataJson.name);
    formData.append('city',formDataJson.city);
    formData.append('country',formDataJson.country);
    formData.append('description',formDataJson.description);
    formData.append('pricePerNight',formDataJson.pricePerNight.toString());
    formData.append('starrating',formDataJson.starrating.toString());
    formData.append('adults',formDataJson.adults.toString());
    formData.append('children',formDataJson.children.toString());
    formData.append('type',formDataJson.type);

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    formDataJson.imageUrls.forEach((url, index) => {
      formData.append(`imageUrls[${index}]`, url);
    });
    
    for(let i=0;i<formDataJson.imageFiles.length;i++){
      const file = formDataJson.imageFiles[i];
      formData.append(`imageFiles`, file);
    }
    onSave(formData);
  });

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col gap-8' onSubmit={onSubmit}>
        <DetailsSection/>
        <HotelTypes/>
        <HotelFacilities/>
        <GuestSection/>
        <ImageSection/>
        <span className='flex justify-end'>
          <button className='bg-blue-700 font-bold text-xl text-white p-2 hover:bg-blue-500 hover:shadow-md disabled:bg-gray-500' disabled={isLoading}>
            {isLoading? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm
