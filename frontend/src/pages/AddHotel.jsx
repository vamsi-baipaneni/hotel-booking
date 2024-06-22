import React from 'react';
import ManageHotelForm from '../forms/ManageHotelForm';
import { useMutation } from 'react-query';
import * as apiClient from '../fetch/api-client'
import { useAuthContext } from '../context/AuthContext';

const AddHotel = () => {
    const {showToast} = useAuthContext();
    const {mutate,isLoading} = useMutation(apiClient.addHotel,{
        onSuccess: ()=>{
            showToast({message: "Hotel Added Successfully", status: "SUCCESS"});
        },
        onError: (error)=>{
            showToast({message: error.message, status: "ERROR"});
        }
    });
    
    const handleSave = (hotelFormData)=>{
        mutate(hotelFormData);
    }

  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default AddHotel;
