import React, {useContext, createContext, useState} from 'react';
import PropTypes from 'prop-types';
const SearchContext = createContext(undefined);

export const SearchContextProvider = ({children}) => {
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [hotelId, setHotelId] = useState('');

    const handleSearchTask = (destination, checkIn, checkOut, adultCount, childCount, hotelId)=>{
      setDestination(destination);
      setCheckIn(checkIn)
      setCheckOut(checkOut)
      setAdultCount(adultCount)
      setChildCount(childCount)
      if(hotelId){
        setHotelId(hotelId)
      }
    };

  return (
    <SearchContext.Provider value={{destination, checkIn, checkOut, adultCount, childCount, hotelId, handleSearchTask}}>
      {children}
    </SearchContext.Provider>
  )
}

SearchContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useSearchProvider = ()=>{
    const context = useContext(SearchContext);
    return context;
}
