import React from 'react'
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'
import ManageHotelForm from '../forms/ManageHotelForm';
import * as apiClient from '../fetch/api-client'
import { useAuthContext } from '../context/AuthContext';

const EditHotel = () => {
  const {hotelId} = useParams();
  const navigate = useNavigate();
  const {data} = useQuery(["findHotelById", hotelId], ()=>apiClient.findHotelById(hotelId),{
    enabled: !!hotelId,
  });

  const {showToast} = useAuthContext();
  const {mutate, isLoading} = useMutation(apiClient.updateHotelById, {
    onSuccess: ()=>{
      showToast({message: "Hotel Updated Successfully", status: "SUCCESS"});
      navigate("/my-hotels");
  },
    onError: (Error)=>{
      showToast({message: Error.message, status: "ERROR"})
    }
  })

  const handleSave = (hotelFormData)=>{
    mutate(hotelFormData);
  }

  return <ManageHotelForm hotelData = {data} onSave={handleSave} isLoading={isLoading}/>
}

export default EditHotel;
