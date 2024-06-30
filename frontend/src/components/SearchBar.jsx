import React, {useState} from 'react';
import { useSearchProvider } from '../context/SearchContext';
import {MdEditCalendar, MdTravelExplore} from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
    const search = useSearchProvider();
    const [destination, setDestination] = useState(search.search.destination);
    const [checkIn, setCheckIn] = useState(search.search.checkIn);
    const [checkOut, setCheckOut] = useState(search.search.checkOut);
    const [adultCount, setAdultCount] = useState(search.search.adultCount);
    const [childCount, setChildCount] = useState(search.search.childCount);

    const handleSubmit = (event)=>{
        event.preventDefault();
        search.handleSearchTask(destination, checkIn, checkOut, adultCount, childCount);
    }

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear()+1);
  return (
    <form onSubmit={handleSubmit} className='p-3 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 bg-orange-400 -mt-5 lg:-mt-10 shadow-md rounded items-center gap-4'>
        <div className='flex flex-row flex-1 items-center p-1 bg-white lg:text-2xl'>
            <MdTravelExplore size={25} className='mr-2'/>
            <input
                placeholder='Where are you going'
                className='text-md w-full focus:outline-none'
                value={destination}
                onChange={(e)=>setDestination(e.target.value)}
            />
        </div>
        <div className='flex flex-1 flex-row items-center p-1 bg-white gap-2 lg:text-2xl'>
            <label className='w-full'>
                Adults:
                <input type='number'
                value={adultCount}
                onChange={(e)=>setAdultCount(e.target.value)}
                min={1}
                max={20}
                className='focus:outline-none text-md'/>
            </label>
            <label className='w-full'>
                Children:
                <input type='number'
                value={childCount}
                onChange={(e)=>setChildCount(e.target.value)}
                min={0}
                max={20}
                className='focus:outline-none text-md'/>
            </label>
        </div>
        <div className='flex flex-row flex-1 items-center p-2 bg-white lg:text-2xl'>
            <MdEditCalendar size={25} className='mr-2'/>
            <DatePicker selected={checkIn} onChange={(date)=>setCheckIn(date)} placeholderText='--Select--'
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                className='min-w-full focus:outline-none bg-white'
            />
            <label className='items-center'>Check-In Date</label>
        </div>
        <div className='flex flex-row flex-1 items-center p-2 bg-white lg:text-2xl'>
            <MdEditCalendar size={25} className='mr-2'/>
            <DatePicker selected={checkOut} onChange={(date)=>setCheckOut(date)} placeholderText='--Select--'
                selectsStart
                startDate={checkIn}
                minDate={minDate}
                maxDate={maxDate}
                className='min-w-full focus:outline-none bg-white'
            />
            <label className=''>Check-Out Date</label>
        </div>
    </form>
  )
}

export default SearchBar
