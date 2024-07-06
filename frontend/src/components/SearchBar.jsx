import React, { useState } from 'react';
import { useSearchProvider } from '../context/SearchContext';
import { MdEditCalendar, MdTravelExplore } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const search = useSearchProvider();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [adultCount, setAdultCount] = useState(search.adultCount);
  const [childCount, setChildCount] = useState(search.childCount);

  const handleSubmit = (event) => {
    event.preventDefault();
    search.handleSearchTask(destination, checkIn, checkOut, adultCount, childCount);
    navigate("/search");
  }

  const handleClear =(event)=>{
    event.preventDefault();
    setDestination("");
    setCheckIn("");
    setCheckOut("");
    setAdultCount(1);
    setChildCount(0);
  }

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form onSubmit={handleSubmit} className="p-2 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 bg-orange-500 shadow-lg rounded items-center gap-4 md:-mt-8">
      <div className="flex items-center p-2 bg-white rounded shadow-sm flex-1">
        <MdTravelExplore size={25} className="mr-2 text-gray-700" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center p-2 bg-white rounded shadow-sm gap-2 lg:gap-4">
        <label className="w-full flex flex-row items-center text-gray-400">
          Adults:
          <input
            type="number"
            value={adultCount}
            onChange={(e) => setAdultCount(e.target.value)}
            min={1}
            max={20}
            className="w-full focus:outline-none"
          />
        </label>
        <label className="w-full flex flex-row items-center text-gray-400">
          Children:
          <input
            type="number"
            value={childCount}
            onChange={(e) => setChildCount(e.target.value)}
            min={0}
            max={20}
            className="w-full focus:outline-none"
          />
        </label>
      </div>
      <div className="flex items-center p-2 bg-white rounded shadow-sm">
        <MdEditCalendar size={25} className="mr-2 text-gray-700" />
        <DatePicker
          selected={checkIn}
          value={checkIn}
          onChange={(date) => {setCheckIn(date)}}
          placeholderText="--Select--"
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          className="w-full focus:outline-none"
        />
        <label className='text-nowrap text-gray-400 mr-2'>Check-In Date</label>
      </div>
      <div className="flex items-center p-2 bg-white rounded-lg shadow-sm">
        <MdEditCalendar size={25} className="mr-2 text-gray-700" />
        <DatePicker
          selected={checkOut}
          value={checkOut}
          onChange={(date) => setCheckOut(date)}
          placeholderText="--Select--"
          selectsEnd
          startDate={checkIn}
          minDate={checkIn}
          maxDate={maxDate}
          className="w-full focus:outline-none"
        />
        <label className='text-nowrap text-gray-400 mr-2'>Check-Out Date</label>
      </div>
      <div className="flex justify-center lg:justify-end col-span-2 lg:col-span-1 gap-2">
        <button type="submit" className="w-2/3 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Search
        </button>
        <button onClick={handleClear} className="w-1/3 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300">
          Clear
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
