import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../fetch/api-client'
import { useAuthContext } from '../context/AuthContext';
import {BsBuilding, BsMap} from 'react-icons/bs';
import {BiHotel, BiMoney, BiStar} from 'react-icons/bi';


const MyHotels = () => {

    const {showToast} = useAuthContext();

    const {data} = useQuery("findUserHotels",apiClient.myHotels, {
        //refetchOnWindowFocus: true, // Will refetch when the window is refocused
        //refetchOnMount: true,       // Will refetch when the component is mounted
        //refetchOnReconnect: true,   // Will refetch when the network is reconnected
        retry: false,               // No retries on failure
        staleTime: 1000 * 60 * 60 * 24,
        cacheTime: 1000 * 60 * 60 * 24,
        onError: (error)=>{
            showToast({message: error.message, status: "ERROR"});
        }
    })

    if(!data){
        return(
            <h1 className='text-3xl justify-center items-center font-bold'>No Hotels Found...</h1>
        );
    }

    return (
        <div className=' flex flex-col gap-12'>
            <div className=' flex flex-1 items-center justify-between'>
                <h2 className='text-2xl font-bold'>My Hotels</h2>
                <Link className="flex tracking-tight items-center p-2 text-2xl bg-blue-600 text-white font-bold hover:cursor-pointer hover:bg-white hover:text-blue-800" to="/add-hotel">Add Hotel</Link>
            </div>
            <div className='grid grid-cols-1 gap-8'>
                {Object.entries(data).map(([key,hotel])=>(
                    <div key ={key} className='border rounded-lg border-slate-500 flex flex-col gap-4 p-6'>
                        <h2 className='text-2xl font-semibold'>{hotel.name}</h2>
                        <span className='whitespace-pre-line text-xl'>{hotel.description}</span>
                        <div className='grid grid-cols-5 gap-12 justify-between items-center text-sm'>
                            <div className='border rounded-sm border-slate-500 flex flex-col gap-2 items-center p-3 justify-center'>
                                <BsMap className='mr-1'/>
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className='border rounded-sm border-slate-500 flex flex-col gap-2 items-center p-3 justify-center'>
                                <BsBuilding className='mr-1'/>
                                {hotel.type}
                            </div>
                            <div className='border rounded-sm border-slate-500 flex flex-col gap-2 items-center p-3 justify-center'>
                                <BiMoney className='mr-1'/>
                                ${hotel.pricePerNight} Night
                            </div>
                            <div className='border rounded-sm border-slate-500 flex flex-col gap-2 items-center p-3 justify-center text-ellipsis'>
                                <BiHotel className='mr-1'/>
                                {hotel.adults} Adult, {hotel.children} Children
                            </div>
                            <div className='border rounded-sm border-slate-500 flex flex-col gap-2 items-center p-3 justify-center'>
                                <BiStar className='mr-1'/>
                                {parseInt(hotel.starrating,10)} Star Rating
                            </div>
                        </div>
                        <span className='flex justify-end'>
                            <Link to={`/edit-hotel/${hotel._id}`} className='bg-blue-600 text-white font-bold text-xl p-2'>Edit Details</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default MyHotels
