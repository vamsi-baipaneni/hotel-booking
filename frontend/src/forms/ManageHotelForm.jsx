import React from 'react'
import {useForm, FormProvider} from 'react-hook-form';
import DetailsSection from './DetailsSection';
import HotelTypes from './HotelTypes';
import HotelFacilities from './HotelFacilities';
import GuestSection from './GuestSection';
import ImageSection from './ImageSection';

const ManageHotelForm = ({onSave,isLoading}) => {
  const methods = useForm({
    defaultValues: {
      facilities: [],
      imageFiles: FileList,
    }
  });

  const {handleSubmit} = methods;
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

    /*
    formDataJson.facilities.forEach((facility, index)=>{
      formData.append(`facilities[${index}]`,facility);
    });
    */

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
  
    // Append imageFiles with array indices
    /*Array.from(formDataJson.imageFiles).forEach((imageFile, index) => {
      formData.append(`imageFiles`, imageFile);
    });*/
    
    for(let i=0;i<formDataJson.imageFiles.length;i++){
      const file = formDataJson.imageFiles[i];
      formData.append(`imageFiles`, file);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    methods.reset();
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
          <button className='bg-blue-700 font-bold text-xl text-white p-2 hover:bg-blue-500 hover:shadow-md' disabled={isLoading}>
            Add Hotel
          </button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm
