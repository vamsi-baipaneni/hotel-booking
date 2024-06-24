import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import ManageHotelForm from '../forms/ManageHotelForm';
import * as apiClient from '../fetch/api-client'

const EditHotel = () => {
  const {hotelId} = useParams();
  const {data} = useQuery("findHotelById", ()=>apiClient.findHotelById(hotelId),{
    enabled: !!hotelId,
  })
  return <ManageHotelForm hotelData = {data}/>
}

export default EditHotel;
